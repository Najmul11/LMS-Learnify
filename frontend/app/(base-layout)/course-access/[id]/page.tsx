"use client";
import { useLoadUserQuery } from "../../../redux/api/apiSlice";
import CourseAccess from "../../../components/course-access/CourseAccess";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import Loader from "@/app/components/loader/Loader";

const Page = ({ params }: any) => {
  const { data, isLoading, error } = useLoadUserQuery(undefined);

  useEffect(() => {
    if (data) {
      const isPurchased = data.data.courses.find(
        (course: any) => course?.courseId === params.id
      );

      if (!isPurchased) {
        redirect("/");
      }
    }

    if (error) {
      redirect("/");
    }
  }, [data, params, error]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <CourseAccess id={params?.id} userData={data?.data} />
      )}
    </div>
  );
};

export default Page;
