import { Schema, model } from "mongoose";
import { CourseModel, TCourse } from "./course.interface";

const CourseSchema = new Schema<TCourse, Record<string, unknown>>({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  estimatedPrice: {
    type: Number,
  },

  thumbnail: {
    publicId: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },

  tags: [
    {
      type: String,
      required: true,
    },
  ],

  level: {
    type: String,
    required: true,
  },

  demoUrl: {
    type: String,
    required: true,
  },

  benefits: [
    {
      title: String,
    },
  ],

  prerequisites: [
    {
      title: String,
    },
  ],

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  courseData: [
    {
      type: Schema.Types.ObjectId,
      ref: "CourseData",
    },
  ],

  ratings: {
    type: Number,
    default: 0,
  },

  purchased: {
    type: Number,
    default: 0,
  },
});

export const Course = model<TCourse, CourseModel>("Course", CourseSchema);
