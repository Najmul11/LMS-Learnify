import { styles } from "../../../styles/style";
import CoursePlayer from "../../../utils/CoursePlayer";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";

type Props = {
  data: any;
  activeVideo: any;
  setActiveVideo: any;
  id: string;
  user: any;
};

const CourseContentMedia = ({
  data,
  activeVideo,
  setActiveVideo,
  id,
  user,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleNext = () => {
    if (activeVideo < data.length - 1) {
      setActiveVideo(activeVideo + 1);
    }
  };

  return (
    <div className="w-[95%] mx-auto py-4 800px:w-[85%]">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <button
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 ? "cursor-no-drop opacity-[.8]" : ""
          }`}
          onClick={() => setActiveVideo(activeVideo > 0 ? activeVideo - 1 : 0)}
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </button>
        <button
          className={`${styles.button} !w-[unset] min-h-[40px] !py-[unset] ${
            data && data.length - 1 === activeVideo
              ? "cursor-no-drop opacity-[.8]"
              : ""
          }`}
          onClick={handleNext}
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </button>
      </div>
      <h1 className="pt-2 text-[25px] font-[600]">{data[activeVideo].title}</h1>{" "}
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px: text-[20px] cursor-pointer ${
              activeBar === index ? "text-red-500" : ""
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text=[18px] whitespace-pre-line mb-3 dark:text-white">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <>
          {data[activeVideo].links.map((item: any) => (
            <div className="mb-5" key={item._id}>
              <h2 className="800px: text-[20px] 800px:inline-block dark:text-white text-black">
                {item.title && item.title + ":"}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px: text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={
                user.avatar
                  ? user.avatar.url
                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
              }
              width={50}
              height={50}
              alt=""
              className="rounded-full w-[50px] h-[50px]"
            />
            <textarea
              name=""
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border border-slate-400 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <button
              className={`${styles.button} !w-[120px] h-[40px] text-[18px] mt-5 text-white`}
            >
              Submit
            </button>
          </div>
          <br />
          <br />
          <div>{/* {replies} */}</div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          <div className="flex w-full">
            <Image
              src={
                user.avatar
                  ? user.avatar.url
                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px] font-[500] dark:text-white">
                Give a Rating <span className="text-red-500">*</span>
              </h5>
              <div className="flex w-full ml-2 pb-3">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgb(246,186,0)"
                      size={25}
                      onClick={() => setRating(i)}
                    />
                  ) : (
                    <AiOutlineStar
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgb(246,186,0)"
                      size={25}
                      onClick={() => setRating(i)}
                    />
                  )
                )}
              </div>
              <textarea
                name=""
                value={review}
                onChange={(e) => setReview(e.target.value)}
                id=""
                cols={40}
                rows={5}
                placeholder="Write your review..."
                className="outline-none bg-transparent ml-3 border border-slate-400 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
              ></textarea>
              <div className="w-full flex justify-end">
                <button
                  className={`${styles.button} !w-[120px] h-[40px] text-[18px] mt-5 text-white`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;