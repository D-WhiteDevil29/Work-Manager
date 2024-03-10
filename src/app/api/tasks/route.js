import { getResponseMessage } from "@/helper/getResponseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// get all tasks
export async function GET(request) {
    let tasks = [];
    try {
        tasks = await Task.find();
        return NextResponse.json(tasks, {
            message: "All tasks fetched successfully !!!",
            success: true
        });
    } catch (error) {
        console.log("Error in fetching the tasks !!!", error);
        return getResponseMessage("Error in fetching the tasks", 500, false);
    }
}

// create a task
export async function POST(request) {

    const authToken = request.cookies.get("authToken")?.value;
    // console.log(authToken);

    const data = jwt.verify(authToken, process.env.JWT_KEY);


    const { title, content, userId, status } = await request.json();

    try {
        const task = new Task({
            title,
            content,
            userId: data._id,
            status
        });
        const createdTask = await task.save();
        return NextResponse.json(createdTask, getResponseMessage("Task Created Successfully !!!", 201, true)
        );
    } catch (error) {
        console.log("Error in creating the task !!! ");
        return getResponseMessage("Error in creating task !!!", 500, false);
    }
}