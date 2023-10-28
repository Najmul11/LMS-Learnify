import { Model, Types } from "mongoose";

type TComment = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  question: string;
  questionsReplies: {
    user: Types.ObjectId;
    answer: string;
  }[];
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
  _id: Types.ObjectId;
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
  reviews: TReview[];
  courseData: TCourseData[];
  ratings?: number;
  purchased?: number;
};

export type TQuestion = {
  courseId: string;
  contentId: string;
  question: string;
};
export type TAnswer = {
  courseId: string;
  contentId: string;
  questionId: string;
  answer: string;
};

export type CourseModel = Model<TCourse, Record<string, unknown>>;
