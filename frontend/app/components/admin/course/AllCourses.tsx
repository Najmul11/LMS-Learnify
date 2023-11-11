"use client";
import { useGetAllCourseQuery } from "../../../redux/api/courses/coursesApi";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { format } from "date-fns";
import DataTable from "../../../utils/DataTable";
import { useState } from "react";
import CustomModal from "../../../utils/CustomModal";
import DeleteUser from "../users/Actons/DeleteUser";
import Link from "next/link";

const AllCourses = () => {
  const { data, isLoading, error } = useGetAllCourseQuery(undefined);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [id, setId] = useState("");

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Link href={`/admin/edit-course/${params.row.id}`}>
            <BsPencil className="dark:text-white text-black" size={20} />
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setId(params.row.id);
              setDeleteOpen(!deleteOpen);
            }}
          >
            <AiOutlineDelete
              className="■dark:text-white text-black"
              size={20}
            />
          </Button>
        );
      },
    },
  ];

  const rows: {}[] = [];

  if (data?.data) {
    data.data.forEach((course: any) => {
      rows.push({
        id: course._id,
        title: course.name,
        purchased: course.purchased,
        createdAt: format(new Date(course.createdAt), "dd MMM yyyy"),
      });
    });
  }

  return (
    <>
      {rows.length > 0 && <DataTable rows={rows} columns={columns} />}
      {deleteOpen && (
        <CustomModal
          open={deleteOpen}
          setOpen={setDeleteOpen}
          component={DeleteUser}
          id={id}
          deletingCourse={true}
        />
      )}
    </>
  );
};

export default AllCourses;
