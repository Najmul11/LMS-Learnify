"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from "../../redux/hook";
import Profile from "../../components/profile/Profile";
import ProtectedRoutes from "../../components/protectedRoutes/ProtectedRoutes";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <ProtectedRoutes>
      <div>
        <Profile user={user} />
      </div>
    </ProtectedRoutes>
  );
};

export default ProfilePage;
