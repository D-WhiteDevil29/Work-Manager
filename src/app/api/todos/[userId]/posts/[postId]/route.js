import { NextResponse } from "next/server";

export function DELETE(request, { params }) {
    const { postId } = params;
    console.log("postid: ", postId);
    return NextResponse.json({
        message: "post with has been deleted successfully",
        status: "ALL OK"
    });
}





