import httpStatus from "http-status";
import ErrorHandler from "../../utils/ErrorHandler";
import { Notification } from "./notification.model";

const getNotifications = async () => {
  const result = await Notification.find().sort({ createdAt: -1 });
  return result;
};

const updateNotification = async (notificationId: string) => {
  const notification = await Notification.findById(notificationId);
  if (!notification)
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Notification not found");
  notification.status = "read";

  await notification.save();
};

export const NotificationService = {
  getNotifications,
  updateNotification,
};
