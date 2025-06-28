import { useQuery } from "@tanstack/react-query";
import { RegionData } from "@/types/region";
import { getRegion } from "@/apis/region";

export const useRegionQuery = () => {
  const { data, isLoading } = useQuery<RegionData>({
    queryKey: ["regionList"],
    queryFn: async () => {
      const res = await getRegion();
      return res;
    },
  });

  return {
    data: data?.data?.provinces ?? [],
    isLoading,
  };
};
