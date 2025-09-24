import mongoose from "mongoose";

// Have a feature where you can check 
const NotesSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
            maxLength: 100,
            default: "New Note"
        },
        // Q1: What is this reflection about?
        thoughts: { type: String, required: true },
    },

    // For date set
    { timestamps: true }
);

export default mongoose.model("NoteEntry", NotesSchema);