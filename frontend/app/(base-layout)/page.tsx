"use client";
import Hero from "../components/home/hero/Hero";
import Courses from "../components/home/course/Courses";
import Meta from "../utils/Meta";
import Reviews from "../components/home/reviews/Reviews";
import FAQ from "../components/home/faq/FAQ";
import GetCreative from "../components/home/getCreative/GetCreative";

const Page = () => {
  return (
    <div>
      <Meta
        title="Learnify"
        description="Discover Learnify: Your Key to Convenient and Engaging Online Learning. Explore a Diverse Range of Courses and Empower Your Educational Journey with Our User-Friendly, Modern eLearning Platform."
        keywords="Online Learning, E-Learning, Skill Development, Programming, ReactJs, NodeJs, MERN"
      />
      <Hero />
      <GetCreative />
      <Courses />
      <Reviews />
      <FAQ />
    </div>
  );
};

export default Page;
