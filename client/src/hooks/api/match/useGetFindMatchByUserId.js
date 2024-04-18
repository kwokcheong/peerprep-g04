import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetFindMatchByUserId = (userId) => {
  const queryClient = useQueryClient();

  const getFindMatchByUserId = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_MATCHING_API_URL}/matching/findMatch`,
      { params: { userId } }
    );

    return data;
  };

  return useQuery({
    queryKey: ["getFindMatchByUserId", userId],
    queryFn: getFindMatchByUserId,
    cacheTime: 0,
  });
};
