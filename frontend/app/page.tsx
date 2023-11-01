"use client";
import React, { useState } from "react";
import Meta from "./utils/Meta";

const Page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Meta
        title="Learnify"
        description="Discover Learnify: Your Key to Convenient and Engaging Online Learning. Explore a Diverse Range of Courses and Empower Your Educational Journey with Our User-Friendly, Modern eLearning Platform."
        keywords="Online Learning, E-Learning, Skill Development, Programming, ReactJs, NodeJs, MERN"
      />

      <h1 className="text-5xl">Cumilla</h1>
    </div>
  );
};

export default Page;
