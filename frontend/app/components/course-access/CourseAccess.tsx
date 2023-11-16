import { useGetCourseContentQuery } from "@/app/redux/api/courses/coursesApi";
import CourseContentMedia from "./courseContentMedia/CourseContentMedia";

import { useState, useEffect } from "react";
import Loader from "../loader/Loader";
import CourseContentList from "./courseContentList/CourseContentList";
import CourseOverview from "../courseDetail/courseDetail/courseOverview/CourseOverview";

const CourseAccess = ({ id }: any) => {
  const { data, isLoading, error } = useGetCourseContentQuery(id);
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full grid 800px:grid-cols-10 ">
          <div className="col-span-7">
            <CourseContentMedia
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              data={data?.data?.courseData}
              id={id}
            />
          </div>
          <div className="col-span-3">
            <CourseOverview
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              courseData={data?.data?.courseData}
              courseAccessPage={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAccess;
