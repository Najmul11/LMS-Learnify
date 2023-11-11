"use client";
import { useEffect, useState } from "react";
import CourseInfo from "./CourseInfo";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../../redux/api/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type error = {
  data: {
    message: string;
  };
};

const CreateCourse = () => {
  const [active, setActive] = useState(0);
  const [previewImage, setPreviewImage] = useState("");

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    categories: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);

  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState<any>({});

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };
    setCourseData(data);
  };

  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  const handleCourseCreate = async () => {
    const courseInformation = {
      name: courseData?.name,
      description: courseData?.description,
      price: courseData.price,
      estimatedPrice: courseData.estimatedPrice,
      tags: courseData.tags,
      level: courseData.level,
      demoUrl: courseData.demoUrl,
      benefits: courseData.benefits,
      prerequisites: courseData.prerequisites,
      ratings: 0,
      purchased: 0,
      courseData: courseData.courseData,
    };

    const formData = new FormData();

    // Append each key-value pair to the FormData
    Object.entries(courseInformation).forEach(([key, value]) => {
      // If the value is an array or object, stringify it
      const formattedValue =
        Array.isArray(value) || typeof value === "object"
          ? JSON.stringify(value)
          : value;
      formData.append(key, formattedValue);
    });
    formData.append("file", courseData?.thumbnail);

    await createCourse(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully ");
      redirect("/admin/courses");
    }
    const errorData = error as error;
    if (error) toast.error(errorData.data.message);
  }, [isSuccess, error]);

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInfo
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
        )}
        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefits}
            prerequisites={prerequisites}
            setBenefits={setBenefits}
            setPrerequisites={setPrerequisites}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            courseContentData={courseContentData}
            handleSubmit={handleSubmit}
            setActive={setActive}
            setCourseContentData={setCourseContentData}
          />
        )}
        {active === 3 && (
          <CoursePreview
            setActive={setActive}
            active={active}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isLoading={isLoading}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
