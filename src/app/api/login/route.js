import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { connectDB } from "@/helper/db";

connectDB();
export async function POST(request) {
    const { email, password } = await request.json();

    try {
        const user = await User.findOne({ email: email, });
        if (user == null) {
            throw new Error("User not found...!!!");
        }
        // console.log(user);

        const matched = bcrypt.compareSync(password, user.password);
        // console.log("matched: ", matched);
        if (!matched) {
            throw new Error("Incorrect Password !!!");
        }

        // generate jwt token 
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
        }, process.env.JWT_KEY);

        // console.log("Token: ", token);

        const response = NextResponse.json({
            message: "User logged in successfully...!!!",
            sucesss: true,
            user: user
        },
            {
                status: 200
            });

        response.cookies.set("authToken", token, {
            expiresIn: "1d",
            httpOnly: true
        });

        return response;

    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false,
        }, {
            status: 500
        });
    }
}