import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutate } from "../lib/api";
import { useNavigate } from "react-router";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logoutMutate,
    onSuccess: () => {
      navigate("/login");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { logoutMutation };
};

export default useLogout;
