import mongoose from "mongoose";

export interface Category {
    _id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: any;
}
const categorySchema = new mongoose.Schema({    
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

export const CategoryModel = mongoose.model("category", categorySchema);