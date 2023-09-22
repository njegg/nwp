import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    cocktailId: { type: Number, required: true },
    reviewerName: { type: String, required: true },
    content: { type: String },
    rating: {
        type: Number,
        min: [1, "Rating must be between 1 and 10, got {VALUE}"],
        max: [10, "Rating must be between 1 and 10, got {VALUE}"],
        required: true,
    },
    upvotes: { type: Number, default: 0 },
});

export type Review = mongoose.InferSchemaType<typeof reviewSchema>;
export const Review = mongoose.model('reviews', reviewSchema);


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 4 }
});

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model('users', userSchema);


const voteSchema = new mongoose.Schema({
    username: { type: String, required: true },
    review_id: { type: String, required: true },
    cocktail_id: { type: Number, required: true },
    amount: { type: Number, required: true, enum: [1, -1, 0] },
});

export type ReviewVote = mongoose.InferSchemaType<typeof voteSchema>;
export const ReviewVote = mongoose.model('votes', voteSchema);

