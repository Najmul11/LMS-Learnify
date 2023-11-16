import { styles } from "../../../styles/style";
import CoursePlayer from "../../../utils/CoursePlayer";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";

type Props = {
  data: any;
  activeVideo: any;
  setActiveVideo: any;
  id: string;
};

const CourseContentMedia = ({
  data,
  activeVideo,
  setActiveVideo,
  id,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);

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
          <div>
            {data[activeVideo]?.questions.map((question: any) => (
              <div key={question._id}>
                <p>{question.question}</p>
                <p>{question.answer}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {activeBar === 3 && (
        <p className="text=[18px] whitespace-pre-line mb-3 dark:text-white">
          {data[activeVideo]?.questions.map((question: any) => (
            <div key={question._id}>
              <p>{question.question}</p>
              <p>{question.answer}</p>
            </div>
          ))}
        </p>
      )}
    </div>
  );
};

export default CourseContentMedia;
