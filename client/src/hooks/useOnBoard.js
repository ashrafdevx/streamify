import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { OnboardMutation } from "../lib/api";
import toast from "react-hot-toast";

const useOnBoard = () => {
  const queryClient = useQueryClient();
  const {
    mutate: OnSubmitForm,
    isPending,
    error,
  } = useMutation({
    mutationFn: OnboardMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("User onboarded!!.");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(error.response.data.message);
    },
  });

  return { OnSubmitForm, isPending, error };
};

export default useOnBoard;
