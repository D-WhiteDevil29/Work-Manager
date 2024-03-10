import { NextResponse } from "next/server";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { connectDB } from "@/helper/db";

connectDB();
export async function GET(request) {

    const authToken = request.cookies.get("authToken")?.value;
    // console.log(authToken);

    const data = jwt.verify(authToken, process.env.JWT_KEY);

    const user = await User.findOne({
        _id: data._id
    });

    // console.log("User details: ", user);

    return NextResponse.json(user);
}