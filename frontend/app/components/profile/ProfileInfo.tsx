import { styles } from "../../styles/style";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import { useState } from "react";
import avatarIcon from "../../../public/assets/avatar.png";
import { useUpdateAvatarMutation } from "@/app/redux/api/user/userApi";
import { CircularProgress } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo = ({ user, avatar }: Props) => {
  const [name, setName] = useState((user && user.name) || "");

  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      await updateAvatar(formData);
    }
  };

  const handleSubmit = () => {};

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative rounded-full w-[120px] h-[120px]">
          <Image
            src={user.avatar?.url || avatar || avatarIcon}
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a]   rounded-full"
          />

          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={(e) => imageHandler(e)}
            accept="image/png, image/jpg, image/jpeg, image/webp"
            disabled={isLoading}
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-600 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer text-white">
              {isLoading ? (
                <CircularProgress
                  sx={{
                    color: "#ffffff",
                  }}
                  size={22}
                />
              ) : (
                <AiOutlineCamera size={20} className="z-10" />
              )}
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.email || ""}
              />
            </div>
            <input
              className="w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer"
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
