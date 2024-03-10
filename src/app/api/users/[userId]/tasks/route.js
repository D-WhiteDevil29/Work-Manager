import { getResponseMessage } from "@/helper/getResponseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";


// get function for fetching tasks corresponding to a particular user
export async function GET(request, { params }) {
    const { userId } = params;
    try {
        let tasks = await Task.find({
            userId: userId
        });
        return NextResponse.json(tasks, {
            message: "All tasks corresponding to the user fetched successfully !!!",
            success: true
        });
    } catch (error) {
        console.log("Error in fetching tasks !!!");
        return getResponseMessage("Error in fetching tasks !!!", 500, false);
    }
}

