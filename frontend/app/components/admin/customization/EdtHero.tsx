/* eslint-disable @next/next/no-img-element */
import { CircularProgress } from "@mui/material";
import {
  useEditBannerMutation,
  useGetHeroDataQuery,
} from "../../../redux/api/layout/layoutApi";
import React, { FC, useState, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import toast from "react-hot-toast";

type error = {
  data: {
    message: string;
  };
};

const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const [isEdited, setIsEdited] = useState(false);

  const { data } = useGetHeroDataQuery("banner", {
    refetchOnMountOrArgChange: true,
  });
  const originalTitle = data?.data?.banner.title;
  const originalSubTitle = data?.data?.banner?.subTitle;

  useEffect(() => {
    if (data) {
      setTitle(data.data.banner.title);
      setSubTitle(data.data.banner.subTitle);
      setImage(data.data.banner.image.url);
    }
  }, [data]);

  const [editBanner, { isLoading, error, isSuccess }] = useEditBannerMutation();

  useEffect(() => {
    if (isSuccess) setIsEdited(false);
    const errorData = error as error;
    if (error) toast.error(errorData.data.message);
  }, [isSuccess, setIsEdited, error]);

  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("type", "banner");
    await editBanner(formdata);
  };
  const handleSave = async () => {
    const data = {
      type: "banner",
      bannerTitle: title,
      bannerSubTitle: subTitle,
    };
    const response = (await editBanner(data)) as any;
    if (response.data) toast.success("Bannner details updated");
  };

  return (
    <>
      <div className="w-full  800px:mt-[120px]">
        <div className=" flex items-center">
          <div className="relative w-1/2  flex justify-center">
            <div className="relative">
              {isLoading ? (
                <div className="800px:h-[500px] 800px:w-[500px] 1100px:h-[700px] 1100px:w-[700px] rounded-full flex items-center justify-center">
                  <CircularProgress
                    sx={{
                      color: "#37a39a",
                    }}
                    size={30}
                  />
                </div>
              ) : (
                <img
                  src={image}
                  alt=""
                  className="800px:h-[500px] 800px:w-[500px] 1100px:h-[700px] 1100px:w-[700px] rounded-full"
                />
              )}
              <input
                disabled={isLoading}
                type="file"
                name=""
                id="banner"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
              <label
                htmlFor="banner"
                className="absolute bottom-0 right-32 z-20"
              >
                <AiOutlineCamera className="dark:text-white text-black text-3xl cursor-pointer" />
              </label>
            </div>
          </div>
          <div className="w-[45%] flex flex-col item-center ">
            <textarea
              className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-Poppins bg-transparent capitalize"
              placeholder="Improve Your Online Learning Experience Better Instantly"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsEdited(e.target.value !== originalTitle ? true : false);
              }}
              rows={3}
            ></textarea>
            <textarea
              value={subTitle}
              onChange={(e) => {
                setSubTitle(e.target.value);
                setIsEdited(e.target.value !== originalSubTitle ? true : false);
              }}
              placeholder="We have 40k+ Online courses & 500K+ Online registered students. Find your desired courses from them."
              className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[65%] 1100px:!w-[74%] bg-transparent px-4 resize-none "
            ></textarea>
          </div>
        </div>
        <div className={`  w-[75%] flex justify-end mx-auto duration-500`}>
          <button
            disabled={!isEdited}
            onClick={handleSave}
            className={`${
              isEdited
                ? "bg-[#37a39a] cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            } w-full 800px:w-[180px] h-[40px]  text-center text-[#fff] rounded mt-8 flex items-center justify-center`}
          >
            {isLoading ? (
              <CircularProgress
                sx={{
                  color: "#ffffff",
                }}
                size={20}
              />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditHero;
