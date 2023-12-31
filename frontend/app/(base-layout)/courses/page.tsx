"use client";
import CourseCard from "../../components/home/course/CourseCard";
import { useGetUserAllCourseQuery } from "../../redux/api/courses/coursesApi";
import Loader from "../../components/loader/Loader";
import Meta from "../../utils/Meta";

const Page = () => {
  const { data, isLoading, isSuccess } = useGetUserAllCourseQuery(undefined);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Meta title="Courses - Learnify" />
          <div
            className="w-[90%] 800px:w-[80%]  mx-auto mt-12 min-h-[70vh]"
            id="faq"
          >
            <h1 className="capitalize 800px:text-[45px] text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-2">
              All Courses
            </h1>
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {data?.data?.map((course: any) => (
                <CourseCard key={course?._id} course={course} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
