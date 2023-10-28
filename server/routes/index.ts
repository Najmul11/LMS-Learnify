import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { CourseRoutes } from "../modules/course/course.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
