import { styles } from "../../../styles/style";
import Link from "next/link";
import "./Hero.css";
import { useTheme } from "next-themes";

const Hero = () => {
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
      <h1 className="font-[700] text-[25px] leading-[35px] sm:text-3xl lg:text-5xl tracking-tight text-center dark:text-white font-Poppins 800px:!leading-[60px]">
        Unleash your inner <br className="800px:hidden" />{" "}
        <span
          className={`${
            theme === "dark" ? "text-gradient-dark " : "text-gradient "
          } `}
        >
          programming
        </span>{" "}
        <br />
        genius with our community
      </h1>
      <p className="800px:block hidden font-poppins 800px:text-[22px] 800px:leading-[32px] text-[16px] leading-[23px] font-normal text-[#003A55]  dark:text-[#A3b3BC]">
        Amplify your programming journey with Learnify&apos;s <br /> dedicated
        community and comprehensive resources.
      </p>
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
