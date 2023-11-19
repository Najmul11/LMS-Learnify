import Image from "next/image";
import Link from "next/link";
import { AiOutlineUnorderedList } from "react-icons/ai";
type Props = {
  course: any;
  isProfile?: boolean;
};
const CourseCard = ({ course, isProfile }: Props) => {
  return (
    <Link
      href={`${
        isProfile ? `/course-access/${course._id}` : `/course/${course._id}`
      }`}
    >
      <div
        className="w-full min-h-[30vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm 
        dark:shadow-inner"
      >
        <Image
          src={course?.thumbnail?.url}
          width={500}
          height={500}
          objectFit="contain"
          className="rounded w-full"
          alt=""
        />
        <br />
        <h1 className="font-Poppins text-black text-[16px] dark:text-[#fff]">
          {course.name}
        </h1>
        <div className={`w-full flex items-center justify-between  pt-3`}>
          {!isProfile && (
            <div className="flex items-center">
              <h3
                className={`text-black ${
                  course.price > 0 ? "" : ""
                } dark:text-[#fff]`}
              >
                {course.price > 0 ? `${course.price}$` : "Free"}
              </h3>
              <h5 className="pl-3 text-[14px]  line-through opacity-80 text-black dark:text-[#fff]">
                {course.estimatedPrice}$
              </h5>
            </div>
          )}
          <div className="flex items-center ">
            <AiOutlineUnorderedList
              size={20}
              className="dark:text-white text-black"
            />
            <h5 className="pl-2 text-black dark:text-[#fff]">
              {course.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
