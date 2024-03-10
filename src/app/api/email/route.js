import { NextResponse } from "next/server";
import { User } from "@/models/user";
import { connectDB } from "@/helper/db";

connectDB();
export async function POST(request, { params }) {

    const { email } = params;
    const user = await User.findOne({
        email: email
    });

    // console.log("User details: ", user);

    return NextResponse.json(user);
}