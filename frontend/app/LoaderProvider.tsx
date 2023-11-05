import dynamic from "next/dynamic";
import Loader from "./components/loader/Loader";
import { useLoadUserQuery } from "./redux/api/apiSlice";
import { ReactNode } from "react";

const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useLoadUserQuery({});

  return <>{isLoading ? <Loader /> : children}</>;
};

export default dynamic(() => Promise.resolve(LoaderProvider), { ssr: false });
