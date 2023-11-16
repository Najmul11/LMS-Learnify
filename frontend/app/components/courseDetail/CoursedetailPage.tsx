import { useGetCourseDetailsQuery } from "@/app/redux/api/courses/coursesApi";
import { useParams } from "next/navigation";
import React from "react";
import CourseDetails from "./courseDetail/CourseDetails";

const CoursedetailPage = () => {
  const { id }: any = useParams();
  const { data, isLoading } = useGetCourseDetailsQuery(id);

  return (
    <div>
      <CourseDetails data={data?.data} />
    </div>
  );
};

export default CoursedetailPage;