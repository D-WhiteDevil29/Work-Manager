import { NextResponse } from "next/server";
import { User } from "@/models/user";


// get user with id function
export async function GET(request, { params }) {

    let { userId } = params;
    try {
        let user = await User.findById(userId);
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({
            message: "User not found",
            success: false
        });
    }
}

// update user with id function
export async function PUT(request, { params }) {
    let { userId } = params;
    const { name, password, about, profileURL } = await request.json();
    // console.log("username: ", name);

    try {
        const user = await User.findById(userId);
        user.name = name;
        user.password = password;
        user.about = about;
        user.profileURL = profileURL;

        const updatedUser = await user.save();
        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({
            message: `Error in updating user !!!`,
            success: false
        })
    }

}

// Delete user with user function
export async function DELETE(request, { params }) {
    const { userId } = params;

    try {
        await User.deleteOne({
            _id: userId
        });
        return NextResponse.json({
            message: `User with id: ${userId} has been deleted successfully.`,
            success: true
        });
    } catch (error) {
        console.log("Error in delete user", error);
        return NextResponse.json({
            message: "An error occurred while deleting the user.",
            success: false
        });
    }
}
