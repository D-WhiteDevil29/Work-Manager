import { getResponseMessage } from "@/helper/getResponseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";


// get a single task
export async function GET(request, { params }) {
    const { taskId } = params;

    try {
        const task = await Task.findById(taskId);
        return NextResponse.json(task, {
            message: `Task with id { ${taskId} } has been fetched successfully !!! `,
            success: true
        });
    } catch (error) {
        console.log("Error in fetching the task !!!");
        return getResponseMessage("Error in fetching the task !!!", 400, false);
    }
}

// update a task using id
export async function PUT(request, { params }) {
    const { taskId } = params;
    let { title, content, status } = await request.json();
    try {
        let task = await Task.findById(taskId);
        task.title = title;
        task.content = content;
        task.status = status;
        const updatedtask = await task.save();
        return NextResponse.json(updatedtask, {
            message: "Task has been updated successfully !!!",
            success: true
        });
    } catch (error) {
        console.log("Error in updating the task !!!");
        return getResponseMessage("Error in updating the task!!!", 400, false);
    }
}

//delete a task using id
export async function DELETE(request, { params }) {
    const { taskId } = params;

    try {
        await Task.deleteOne({ _id: taskId });
        return NextResponse.json({
            message: `Task with id { ${taskId} } has been deleted successfully !!!`,
            success: true
        });
    } catch (error) {
        console.log("Error while deleting the task !!!");
        return getResponseMessage("Error while deleting the task!!!", 400, false);
    }
}