import express from "express";
import auth, { ENUM_USER_ROLE, authorizeRoles } from "../../middleware/auth";
import { LayoutController } from "./layout.controller";
import singleUpload from "../../middleware/multer";

const router = express.Router();

router.post(
  "/create-layout",
  auth,
  authorizeRoles(ENUM_USER_ROLE.ADMIN),
  singleUpload,
  LayoutController.createLayout
);

export const LayoutRoutes = router;
