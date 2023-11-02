"use client";
import React, { useState } from "react";
import Meta from "./utils/Meta";
import Header from "./components/Header";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Verification");
  return (
    <div>
      <Meta
        title="Learnify"
        description="Discover Learnify: Your Key to Convenient and Engaging Online Learning. Explore a Diverse Range of Courses and Empower Your Educational Journey with Our User-Friendly, Modern eLearning Platform."
        keywords="Online Learning, E-Learning, Skill Development, Programming, ReactJs, NodeJs, MERN"
      />
      <Header
        open={open}
        activeItem={activeItem}
        setOpen={setOpen}
        setRoute={setRoute}
        route={route}
      />
    </div>
  );
};

export default Page;
