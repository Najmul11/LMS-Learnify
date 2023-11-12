import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import hero from "../../../public/assets/hero.png";
import { Box, Typography } from "@mui/material";

const Hero = () => {
  const decorative = "All-in-One";
  const title = "The Developer's Toolkit";
  const subtitle =
    "A terminal, editor, screenshot tool, file explorer, and database GUI, all—of course—powered by artificial intelligence.";
  return (
    // <div className="w-full lg:flex items-center">
    //   <div className="absolute top-[100px] lg:top-[unset] xl:h-[700px] xl:w-[700px] lg:h-[600px] lg:w-[600px] h-[50vh] w-[50vh] hero_animation flex">
    //     <div className="lg:w-[40%] flex lg:min-h-screen items-center justify-end pt-[70px] lg:pt-[0] z-10">
    //       <Image
    //         src={hero}
    //         alt=""
    //         className="object-contain lg:max-w-[90%] w-[90%] xl:max-w-[85%] h-[auto] z-10"
    //       />
    //     </div>
    //     <div className="lg:w-[60%] flex flex-col items-center lg:mt-[0px] text-center lg:text-left mt-[150px]">
    //       <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full lg:text-[70px] font-[600] font-Josefin py-2 leading-[75px] xl:w-[60%]">
    //         Improve Your Online Learning Experience Instantly
    //       </h2>
    //       <br />
    //       <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] xl:w-[55%] lg:w-[78%]">
    //         We have 40k+ online courses & 500k+ registered students. Find your
    //         desired courses from them.
    //       </p>
    //       <br />
    //       <br />
    //       <div className="xl:w-[55%] lg:w-[78%] w-[90%] h-[50px] bg-transparent relative">
    //         <input
    //           type="search"
    //           placeholder="Search Courses..."
    //           className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder-text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-josfin"
    //         />
    //         <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
    //           <BiSearch className="text-white" size={30} />
    //         </div>
    //       </div>
    //       <br />
    //       <br />
    //       <div className="xl:w-[55%] lg:w-[78%] w-[90%] flex items-center">
    //         <Image
    //           src={require("../../../public/assets/client-1.png")}
    //           alt=""
    //           className="rounded-full"
    //         />
    //         <Image
    //           src={require("../../../public/assets/client-1.png")}
    //           alt=""
    //           className="rounded-full ml-[-20px]"
    //         />
    //         <Image
    //           src={require("../../../public/assets/client-1.png")}
    //           alt=""
    //           className="rounded-full ml-[-20px]"
    //         />
    //         <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] xl:pl-3 text-[18px] font-[600]">
    //           500K+ people already trust us.{" "}
    //           <Link
    //             href="/courses"
    //             className="dark:text-[#46e256] text-crimson"
    //           >
    //             View Courses
    //           </Link>
    //         </p>
    //       </div>
    //       <br />
    //     </div>
    //   </div>
    // </div>
    <Box
      sx={{
        flex: 1,
        height: "60vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        my: 6,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          color: "green",
          fontWeight: 600,
          fontSize: "sm",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {decorative}
      </Box>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "4xl", sm: "5xl", md: "6xl" },
          fontWeight: 800,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "lg",
          color: "gray.500",
          maxWidth: "54ch",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Hero;

// export default function HeroCenter({}: {
//   decorative?: React.ReactNode;
//   title?: React.ReactNode;
//   subtitle?: React.ReactNode;
// }) {
//   return (
//     <Box
//       sx={{
//         flex: 1,
//         height: "60vh",
//         display: "flex",
//         alignItems: "center",
//         flexDirection: "column",
//         gap: 2,
//         my: 6,
//         textAlign: "center",
//       }}
//     >
//       <Box
//         sx={{
//           color: "primary.500",
//           fontWeight: 600,
//           fontSize: "sm",
//           textTransform: "uppercase",
//           letterSpacing: 0.5,
//         }}
//       >
//         {decorative}
//       </Box>
//       <Typography
//         variant="h1"
//         sx={{
//           fontSize: { xs: "4xl", sm: "5xl", md: "6xl" },
//           fontWeight: 800,
//         }}
//       >
//         {title}
//       </Typography>
//       <Typography
//         sx={{
//           fontSize: "lg",
//           color: "gray.500",
//           maxWidth: "54ch",
//         }}
//       >
//         {subtitle}
//       </Typography>
//     </Box>
//   );
// }
