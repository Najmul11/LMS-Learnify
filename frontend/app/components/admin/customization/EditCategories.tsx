import { styles } from "../../../styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../redux/api/layout/layoutApi";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CircularProgress } from "@mui/material";

type error = {
  data: {
    message: string;
  };
};

const EditCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);

  const { data } = useGetHeroDataQuery("categories", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    setCategories(data?.data?.categories);
  }, [data]);

  const handleCategoriesAdd = (id: string, value: any) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((i: any) =>
        i._id === id ? { ...i, categoryTitle: value } : i
      )
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1]?.title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory) => [...prevCategory, { categoryTitle: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryEmpty = (categories: any[]) => {
    return categories?.some((c) => c.categoryTitle === "");
  };

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  const handleSave = async () => {
    const data = {
      type: "categories",
      categories: categories,
    };

    await editLayout(data);
  };

  useEffect(() => {
    if (isSuccess) toast.success("Category updated");
    const errorData = error as error;
    if (error) toast.error(errorData.data.message);
  }, [isSuccess, error]);

  return (
    <div className="w-full">
      <div className="mt-[120px] text-center w-full">
        <h1 className={styles.title}>All Categories</h1>
        {categories &&
          categories.map((item: any, index: number) => (
            <div className="p-3" key={item._id}>
              <div className="flex items-center w-full justify-center">
                <input
                  className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                  value={item.categoryTitle}
                  onChange={(e) =>
                    handleCategoriesAdd(item._id, e.target.value)
                  }
                  placeholder="Enter category title..."
                />
                <AiOutlineDelete
                  className="dark:text-white text-black text-[18px] cursor-pointer"
                  onClick={() => {
                    setCategories((prevCategory: any) =>
                      prevCategory.filter((i: any) => i._id !== item._id)
                    );
                  }}
                />
              </div>
            </div>
          ))}
        <br />
        <br />
        <br />
        <div className="w-full flex justify-center">
          <IoMdAddCircleOutline
            className="dark:text-white text-black text-[25px] cursor-pointer"
            onClick={newCategoriesHandler}
          />
        </div>
        <button
          disabled={areCategoriesUnchanged(data?.data?.categories, categories)}
          className={`${
            styles.button
          } !w-[100px] min-h-[40px] h-[40px] dark:text-white text-white
  ${
    areCategoriesUnchanged(data?.data?.categories, categories) ||
    isAnyCategoryEmpty(categories)
      ? "!cursor-not-allowed bg-gray-400 "
      : " !bg-[#37a39a]"
  } 
  rounded-sm absolute bottom-12 right-12 `}
          onClick={
            areCategoriesUnchanged(data?.data?.categories, categories) ||
            isAnyCategoryEmpty(categories)
              ? () => null
              : handleSave
          }
        >
          {isLoading ? (
            <CircularProgress
              sx={{
                color: "#37a39a",
              }}
              size={20}
            />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default EditCategories;
