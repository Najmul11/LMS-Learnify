"use client";
import Meta from "../../../utils/Meta";
import AllCourses from "../../../components/admin/course/AllCourses";

const page = () => {
  return (
    <div>
      <Meta title="Courses - Learnify" />
      <AllCourses />
    </div>
  );
};

export default page;
