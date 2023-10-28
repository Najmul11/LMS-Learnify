import express from "express";
import { UserController } from "./user.controller";
import { ENUM_USER_ROLE, auth, authorizeRoles } from "../../middleware/auth";
import singleUpload from "../../middleware/multer";

const router = express.Router();

router.post("/registration", UserController.userRegistration);
router.post("/social-auth", UserController.socialAuth);
router.post("/activate-user", UserController.activateUser);

router.post("/login", UserController.loginUser);
router.get("/logout", auth, UserController.logoutUser);

router.get("/refresh", UserController.updateAccessToken);

router.get("/me", auth, UserController.getUserInfo);

router.put("/update-userinfo", auth, UserController.updateUserInfo);

router.patch("/update-user-password", auth, UserController.updatePassword);

router.patch(
  "/update-avatar",
  auth,
  singleUpload,
  UserController.updateProfilePicture
);

export const UserRoutes = router;
