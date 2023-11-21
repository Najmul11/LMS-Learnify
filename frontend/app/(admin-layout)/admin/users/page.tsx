"use client";
import Meta from "../../../utils/Meta";
import AllUsers from "../../../components/admin/users/AllUsers";

const page = () => {
  return (
    <div>
      <Meta title="Users - Learnify" />
      <AllUsers />
    </div>
  );
};

export default page;
