import { useAppSelector } from "@/app/redux/hook";
import React from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const CourseDetails = ({ data }: any) => {
  const { user }: any = useAppSelector((state) => state.auth);

  const isPurchased = user?.courses?.find(
    (course: any) => course?.courseId === data?._id
  );

  const discountPrice = (
    (data?.estimatedPrice - data?.price) /
    (data?.estimatedPrice * 100)
  ).toFixed(2);

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5 ">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[30px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>
            <br />
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                What you will learn from this course?
              </h1>
              <div>
                {data?.benefits?.map((item: any, index: number) => (
                  <div
                    className="w-full flex 800px:items-center py-2"
                    key={index}
                  >
                    <div className="w-[15px] mr-1">
                      <IoCheckmarkDoneOutline
                        size={20}
                        className="text-black dark:text-white"
                      />
                    </div>
                    <p className="pl-2 text-black dark:text-white">
                      {item?.title}
                    </p>
                  </div>
                ))}
                <br />
                <br />
              </div>
            </div>
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                What are the prerequisites for starting this course?
              </h1>
              <div>
                {data?.prerequisites?.map((item: any, index: number) => (
                  <div
                    className="w-full flex 800px:items-center py-2"
                    key={index}
                  >
                    <div className="w-[15px] mr-1">
                      <IoCheckmarkDoneOutline
                        size={20}
                        className="text-black dark:text-white"
                      />
                    </div>
                    <p className="pl-2 text-black dark:text-white">
                      {item?.title}
                    </p>
                  </div>
                ))}
                <br />
                <br />
              </div>
            </div>
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Overview
              </h1>
              <div>
                {data?.prerequisites?.map((item: any, index: number) => (
                  <div
                    className="w-full flex 800px:items-center py-2"
                    key={index}
                  >
                    <div className="w-[15px] mr-1">
                      <IoCheckmarkDoneOutline
                        size={20}
                        className="text-black dark:text-white"
                      />
                    </div>
                    <p className="pl-2 text-black dark:text-white">
                      {item?.title}
                    </p>
                  </div>
                ))}
                <br />
                <br />
              </div>
            </div>
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Desciption
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data?.description}
              </p>
              <br />
              <br />
            </div>
            <div className=" ">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Reviews
              </h1>
              <div className="mt-[20px] grid grid-cols-1 gap-y-5">
                {data?.reviews?.reverse().map((review: any, index: number) => (
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
                        <p className="text-black dark:text-white">
                          {review?.comment}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {review.createdAt}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
