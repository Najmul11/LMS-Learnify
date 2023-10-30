import { Model } from "mongoose";

export type TBanner = {
  image: {
    publicId: string;
    url: string;
  };
  title: string;
  subTitle: string;
};

// model interfaca
export type TLayout = {
  faq: {
    question: string;
    answer: string;
  }[];
  banner: TBanner;

  categories: {
    categoryTitle: string;
  }[];

  type: "banner" | "faq" | "categories";
};

export type TData = {
  type: string;
  bannerTitle: string;
  bannerSubTitle: string;
  categories: [];
  faq: [];
};

export type LayoutModel = Model<TLayout, Record<string, unknown>>;
