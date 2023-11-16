import { styles } from "../../../styles/style";
import Image from "next/image";
import React from "react";
import banner from "../../../../public/assets/hero.png";
import ReviewCard from "./ReviewCard";
import { reviews } from "./Review.constant";
import { useTheme } from "next-themes";

const Reviews = () => {
  const { theme } = useTheme();
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto mt-20">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image src={banner} alt="business" width={600} height={600} />
        </div>
        <div className="800px:w-[50%] w-full ">
          <h3 className={`${styles.title} 800px:!text-[40px] dark:text-white`}>
            Journey Through{" "}
            <span
              className={`${
                theme === "dark" ? "text-gradient-dark " : "text-gradient "
              }`}
            >
              Triumph
            </span>{" "}
            <br /> Students Speak, We Listen.
          </h3>
          <br />
          <p className={`${styles.label} dark:text-white`}>
            At Learnify, we take immense pride in the success stories of our
            students. Their journeys with us have been transformative, filled
            with dedication and achievement. Let&lsquo;s hear directly from some
            of our exceptional individuals-
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="columns-1 md:columns-2 lg:columns-2 xl:columns-2 gap-5 space-y-5 px-4 my-10 ">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
