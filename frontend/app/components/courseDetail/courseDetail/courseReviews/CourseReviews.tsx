import React from "react";

const CourseReviews = ({ reviews }: any) => {
  return (
    <div>
      {reviews?.reverse().map((review: any, index: number) => (
        <div
          className=" p-4  w-full h-max dark:bg-slate-500 dark:bg-opacity-20 border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg shadow-inner"
          key={index}
        >
          <div className="flex">
            <div className="w-[50px] h-[50px]">
              <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                <h1 className="uppercase text-[18px] text-black dark:text-white">
                  {review.user.name.slice(0, 2)}
                </h1>
              </div>
            </div>
            <div className=" pl-2 ">
              <div className="flex flex-col">
                <p className="text-black dark:text-white">
                  {review?.user?.name}
                </p>
                <h5 className="text-[18px] pr-2 text-red-500 dark:text-white">
                  here comes rating
                </h5>
              </div>
              <p className="text-black dark:text-white">{review?.comment}</p>
              <small className="text-[#000000d1] dark:text-[#ffffff83]">
                {review.createdAt}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseReviews;
