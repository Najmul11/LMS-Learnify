"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from "@/app/redux/hook";
import Profile from "../../components/profile/Profile";
import Meta from "../../utils/Meta";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <Meta
        title="Learnify"
        description="Discover Learnify: Your Key to Convenient and Engaging Online Learning. Explore a Diverse Range of Courses and Empower Your Educational Journey with Our User-Friendly, Modern eLearning Platform."
        keywords="Online Learning, E-Learning, Skill Development, Programming, ReactJs, NodeJs, MERN"
      />
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
