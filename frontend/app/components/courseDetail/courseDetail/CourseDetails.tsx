import { useAppSelector } from "../../../redux/hook";
import CourseOverview from "./courseOverview/CourseOverview";
import Prerequisites from "./prerequisites/Prerequisites";
import CourseBenefits from "./courseBenefits/CourseBenefits";
import CourseReviews from "./courseReviews/CourseReviews";
import CourseAction from "./courseAction/CourseAction";

const CourseDetails = ({ data }: any) => {
  const { user }: any = useAppSelector((state) => state.auth);

  const isPurchased = user?.courses?.find(
    (course: any) => course?.courseId === data?._id
  );

  const discountPercentage = (
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) *
    100
  ).toFixed(2);

  const handleOrder = () => {};

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5 ">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] 800px:text-[30px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>
            <br />
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Overview
              </h1>
              <div>
                <CourseOverview courseData={data?.courseData} />
                <br />
                <br />
              </div>
            </div>

            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                What you will learn from this course?
              </h1>
              <div>
                <CourseBenefits benefits={data?.benefits} />
                <br />
                <br />
              </div>
            </div>

            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                What are the prerequisites for starting this course?
              </h1>
              <div>
                <Prerequisites prerequisites={data?.prerequisites} />
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
                Course Reviews ({data?.reviews?.length})
              </h1>
              <div className="mt-[20px] grid grid-cols-1 gap-y-5">
                <CourseReviews reviews={data?.reviews} />
              </div>
            </div>
          </div>
          <CourseAction
            data={data}
            discountPercentage={discountPercentage}
            isPurchased={isPurchased}
            handleOrder={handleOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
