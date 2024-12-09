import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        full_name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minLenght: 6
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        profile_img: {
            type: String,
            default: ""
        },
        cover_img: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            default: ""
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: []
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: []
            }
        ]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;
