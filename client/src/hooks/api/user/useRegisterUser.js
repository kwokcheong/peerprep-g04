import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  const registerUser = async (req) => {
    await axios.post(`${process.env.REACT_APP_USER_API_URL}/users`, req);
  };

  return useMutation({
    mutationFn: (req) => registerUser(req),
    onSuccess: (_, req) => {
      toast.success("Registration successful!", {
        autoClose: 500,
      });
      queryClient.invalidateQueries(["createUser"]);
    },
  });
};
