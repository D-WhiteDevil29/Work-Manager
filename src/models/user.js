import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Email Required...!!!"]
    },
    password: {
        type: String,
        required: [true, "Password Required...!!!"]
    },
    about: String,
    profileURL: String
});

export let User = mongoose.models?.users || mongoose.model("users", userSchema);
