import React from "react";
import { register } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRegister = () => {
  const queryClient = useQueryClient();
  const {
    mutate: RegisterMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { RegisterMutate, isPending, error };
};

export default useRegister;
