import { useQuery } from "@tanstack/react-query";
import { RegionData } from "@/types/region";
import { API } from "@/apis";

export const useRegionQuery = () => {
  const { data, isLoading } = useQuery<RegionData>({
    queryKey: ["regionList"],
    queryFn: async () => {
      const res = await API.get("http://34.47.100.231:8080/regions");
      return res;
    },
  });

  return {
    data: data?.data?.provinces ?? [],
    isLoading,
  };
};
