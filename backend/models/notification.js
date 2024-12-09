import mongoose, { mongo } from "mongoose";


const notificationSchema = new mongoose.Schema({
        type: {
            type: String,
            required: true,
            enum: ['follow', 'like']
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        readed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
