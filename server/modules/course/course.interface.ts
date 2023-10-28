import { Model, Types } from "mongoose";

type TComment = {
  user: object;
  comment: string;
};

type TReview = {
  user: object;
  rating: number;
  comment: string;
  commentReplies: TComment[];
};

type TLink = {
  title: string;
  url: string;
};

type TCourseData = {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: TLink[];
  suggestion: string;
  questions: TComment[];
};

export type TCourse = {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: {
    publicId: string;
    url: string;
  };
  tags: string[];
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: Types.ObjectId[];
  courseData: Types.ObjectId[];
  ratings?: number;
  purchased?: number;
};

export type CourseModel = Model<TCourse, Record<string, unknown>>;
