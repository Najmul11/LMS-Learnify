import { useGetUserAllCourseQuery } from "@/app/redux/api/courses/coursesApi";
import React from "react";
import CourseCard from "./CourseCard";

const Courses = () => {
  const { data, isLoading, isSuccess } = useGetUserAllCourseQuery(undefined);

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto">
      <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white font-[700] tracking-tight 800px:!leading-[60px]">
        Expand Your Career
        <span className="text-gradient"> Opportunity</span>
        <br />
        Opportunity With Our Courses
      </h1>
      <br />
      <br />
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
        {data?.data.map((course: any) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
