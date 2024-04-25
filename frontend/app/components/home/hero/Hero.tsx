import { styles } from "../../../styles/style";
import Link from "next/link";
import "./Hero.css";
import { useTheme } from "next-themes";
import React from "react";

const Hero = ({ data }: any) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-[65vh] 800px:min-h-[87vh] relative ">
      <div
        className={`bg-shape bg-gradient-to-t ${
          theme === "dark"
            ? "from-[#101725] via-[#44f5e6a2] to-[#101725]"
            : "from-white via-[#44f5e6a2] to-white"
        } blur-2xl hidden 800px:block`}
      ></div>
      <h1 className="font-[700] text-[25px] leading-[35px] sm:text-3xl lg:text-5xl tracking-tight text-center dark:text-white font-Poppins 800px:!leading-[60px] text-black">
        {data?.data?.banner?.title
          ?.split("programming")
          .map((part: string, index: number) => (
            <React.Fragment key={index}>
              {index > 0 && <br className="800px:hidden" />}
              {index > 0 && (
                <span
                  className={`${
                    theme === "dark" ? "text-gradient-dark" : "text-gradient"
                  }`}
                >
                  programming
                  <br />
                </span>
              )}
              {part}
            </React.Fragment>
          ))}
      </h1>
      <StyledSubTitle subTitle={data?.data?.banner?.subTitle} />
      <p className="text-center 800px:hidden font-poppins 800px:text-[22px] 800px:leading-[32px] text-[16px] leading-[25px] font-normal text-[#003A55]  dark:text-[#A3b3BC]">
        Amplify your programming journey with <br className="800px:hidden" />{" "}
        Learnify&apos;s dedicated community and <br className="800px:hidden" />
        comprehensive resourcess.
      </p>
      <Link
        href={"/courses"}
        className={`${styles.button} !w-[unset] !bg-[#37a39a] text-white`}
      >
        Explore Courses
      </Link>
    </div>
  );
};

export default Hero;

const StyledSubTitle = ({ subTitle }: any) => {
  const modified = subTitle?.replace("dedicated", "<br />dedicated");
  return (
    <p
      className="800px:block hidden font-poppins 800px:text-[22px] 800px:leading-[32px] text-[16px] leading-[23px] font-normal text-[#003A55] dark:text-[#A3b3BC]"
      dangerouslySetInnerHTML={{ __html: modified }}
    ></p>
  );
};
