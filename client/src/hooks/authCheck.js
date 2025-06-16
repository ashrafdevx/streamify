import { useQuery } from "@tanstack/react-query";
import React from "react";
import { authCheck } from "../lib/api";

const useAuthCheck = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: authCheck,
    retry: false,
  });
  return { authUser: data?.user, isLoading, error };
};

export default useAuthCheck;
