import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/registration", UserController.userRegistration);
router.post("/activate-user", UserController.activateUser);
router.post("/login", UserController.loginUser);

export const UserRoutes = router;
