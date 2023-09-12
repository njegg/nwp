import mongoose from "mongoose";
import { Review } from "./schema";

await mongoose.connect('mongodb://127.0.0.1:27017/nwp');

console.log('connected to mongodb');

const review = new Review({
    coctailId: 11006,
    reviewerName: "bob",
    content: "Very good",
    rating: 9,
});

let saveRes = await review.save();

console.log(`saved?: ${saveRes}`);

let reviews = await Review.find();

console.log(reviews);

await mongoose.disconnect();

