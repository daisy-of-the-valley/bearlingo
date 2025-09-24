import mongoose from "mongoose";

// Have a feature where you can check of goals
const GoalsSchema = new mongoose.Schema(
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
            default: "Untitled Goal"
        },
        // Q1: What is this reflection about?
        goal: { type: String, required: true },
        isCompleted: { type: Boolean, default: false },

    },

    // For date set
    { timestamps: true }
);

export default mongoose.model("GoalEntry", GoalsSchema);