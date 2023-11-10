"use client";
import { useGetAllCourseQuery } from "../../../redux/api/courses/coursesApi";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { format } from "date-fns";
import DataTable from "../../../utils/DataTable";

const AllCourses = () => {
  const { data, isLoading, error } = useGetAllCourseQuery(undefined);

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
          <Button>
            <BsPencil className="dark:text-white text-black" size={20} />
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button>
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

  return <>{rows.length > 0 && <DataTable rows={rows} columns={columns} />}</>;
};

export default AllCourses;
