import httpStatus from "http-status";
import ErrorHandler from "../../utils/ErrorHandler";
import { User } from "../user/user.model";
import { TOrder } from "./order.interface";
import { Course } from "../course/courese.model";
import ejs from "ejs";
import path from "path";
import { nodemailerHelper } from "../../utils/sendMail";
import { Notification } from "../notification/notification.model";
import { Order } from "./order.model";
import mongoose from "mongoose";

const createOrder = async (payload: Partial<TOrder>, userId: string) => {
  const { courseId, paymentInfo } = payload;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId);
    if (!user) throw new ErrorHandler(httpStatus.NOT_FOUND, "User not found");

    const courseExist = user?.courses.find(
      (course) => course.courseId.toString() === courseId?.toString()
    );

    if (courseExist)
      throw new ErrorHandler(
        httpStatus.BAD_REQUEST,
        "You have already purchased this course"
      );

    const course = await Course.findById(courseId);
    if (!course)
      throw new ErrorHandler(httpStatus.NOT_FOUND, "Course not found");

    const data = {
      courseId: course._id,
      userId: user._id,
      paymentInfo,
    };

    const order = await Order.create([data], { session });

    if (course) {
      course.purchased = course.purchased + 1;
    }

    await course.save({ session });

    const mailData = {
      order: {
        _id: course._id.toString().slice(0, 6),
        name: course.name,
        price: course.price,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    };

    const html = await ejs.renderFile(
      path.join(__dirname, "../../ejs/orderConfirm.ejs"),
      mailData
    );

    if (user) {
      await nodemailerHelper.sendEmail({
        email: user.email,
        subject: "Order Confirmation",
        data: mailData,
        template: "orderConfirm.ejs",
      });
    }

    user.courses.push({ courseId: course._id.toString() });
    await user.save({ session });

    await Notification.create(
      [
        {
          userId: user._id,
          title: "New Order",
          message: `You have a new Order from ${course?.name}`,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return { order: order[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};

const getAllOrders = async () => {
  const result = await Order.find().sort({ createdAt: -1 });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
