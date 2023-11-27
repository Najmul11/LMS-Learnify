import Image from "next/image";

const ReviewCard = ({ review }: any) => {
  return (
    <div className="w-full h-max dark:bg-slate-500 dark:bg-opacity-20 border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg shadow-inner p-3 break-inside-avoid-column">
      <div className="flex w-full ">
        <Image
          src={review?.avatar}
          alt=""
          width={50}
          height={50}
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="800px:block w-full hidden ">
          <div className="pl-4 flex flex-col gap-3">
            <div>
              <h5 className="text-[20px] text-black dark:text-white ">
                {review?.name}
              </h5>
              <h6 className="text-[16px] text-gray-700 dark:text-[#ffffffab] font-semibold">
                {review.profession}
              </h6>
            </div>
            <h6 className="text-[16px] text-[#000] dark:text-[#ffffffab] ">
              {review?.comment}
            </h6>
          </div>
        </div>

        {/* mobile */}
        <div className="800px:hidden justify-between w-full flex flex-col">
          {" "}
          <div className="pl-4">
            <h5 className="text-[20px] text-black dark:text-white">
              {review?.name}
            </h5>
            <h6 className="text-[16px] text-[#000] dark:text-[#ffffffab]">
              {review?.profession}
            </h6>
            <h6 className="text-[16px] text-[#000] dark:text-[#ffffffab]">
              {review?.comment}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
