import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server";
import { User } from '../../../models/user';
import bcrypt from "bcryptjs";


connectDB();

// get all users function
export async function GET() {

    let users = [];
    try {
        users = await User.find().select('-password');
    } catch (error) {
        console.log("Error while fetching users..!!!");
        return NextResponse.json({
            message: "Error in fetching users",
            success: false
        });
    }
    return NextResponse.json(users);
};


// create user function
export async function POST(request) {
    const { name, email, password, about, profileURL } = await request.json();

    const user = new User({
        name,
        email,
        password,
        about,
        profileURL
    });

    try {
        user.password = bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT));
        const createdUser = await user.save();

        const response = NextResponse.json(createdUser, {
            status: 201
        });
        return response;

    } catch (error) {

        console.log("Error in creating user...!!!");
        return NextResponse.json({
            message: "Failed to create user",
            status: false
        });
    }
};

