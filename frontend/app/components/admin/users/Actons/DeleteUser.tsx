import React, { useEffect, useState } from "react";
import { styles } from "../../../../styles/style";

import { useDeleteUserMutation } from "../../../../redux/api/user/userApi";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const DeleteUser = ({
  setOpen,
  userId,
}: {
  setOpen: (state: boolean) => void;
  userId: string;
}) => {
  const [deleteUser, { isLoading, isSuccess, error }] = useDeleteUserMutation();

  const handleDelete = async () => {
    await deleteUser(userId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User deleted");
      setOpen(false);
    }
    if (error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [isSuccess, error, setOpen]);

  return (
    <div className="w-full">
      <h1 className={`${styles.title} !text-left dark:text-white`}>
        Are you sure delte this user?
      </h1>
      <div className="mt-5 flex gap-5 justify-end">
        <button
          onClick={() => setOpen(false)}
          className={`${styles.button} !mb-0 z-[1000] !bg-transparent  !rounded-sm dark:text-white text-black !py-1`}
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className={`${styles.button} !mb-0 z-[1000] !bg-red-800 !rounded-sm text-white !py-1`}
        >
          {isLoading ? (
            <CircularProgress
              sx={{
                color: "#37a39a",
              }}
              size={20}
            />
          ) : (
            " Yes"
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
