import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useLoadUserQuery } from "../redux/api/apiSlice";
import Loader from "../components/loader/Loader";

interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const { data, isLoading } = useLoadUserQuery({});
  if (isLoading) return <Loader />;

  if (!data?.data) return redirect("/");

  return children;
};
export default Protected;
