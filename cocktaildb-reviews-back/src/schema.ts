import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    cocktailId: { type: Number, required: true },
    reviewerName: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
  }
);

export type Review = mongoose.InferSchemaType<typeof reviewSchema>;
export const Review = mongoose.model('reviews', reviewSchema);

