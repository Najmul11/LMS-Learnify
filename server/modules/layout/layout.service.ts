import httpStatus from "http-status";
import { cloudinaryHelper } from "../../cloudinary/cloudinaryHelper";
import ErrorHandler from "../../utils/ErrorHandler";
import { TBanner, TData, TLayout } from "./layout.interface";
import { Layout } from "./layout.model";

const createLayout = async (
  payload: TData,
  layoutImage: Express.Multer.File | undefined
) => {
  const { type, bannerSubTitle, bannerTitle, faq, categories } = payload;

  const typeExist = await Layout.findOne({ type });
  if (typeExist)
    throw new ErrorHandler(httpStatus.BAD_REQUEST, `${type} already exist`);

  let result = null;

  if (type === "banner") {
    if (!bannerSubTitle || !bannerTitle || !layoutImage)
      throw new ErrorHandler(
        httpStatus.BAD_REQUEST,
        `Please provide all information`
      );

    const uploadedLayout = await cloudinaryHelper.uploadToCloudinary(
      layoutImage,
      "layout"
    );

    if (uploadedLayout) {
      result = await Layout.create({
        type: type,
        banner: {
          image: uploadedLayout,
          title: bannerTitle,
          subTitle: bannerSubTitle,
        },
      });
    }
  }

  if (type === "faq") {
    result = await Layout.create({
      type: type,
      faq,
    });
  }
  if (type === "categories") {
    result = await Layout.create({
      type: type,
      categories,
    });
  }

  return result;
};

export const LayoutService = {
  createLayout,
};
