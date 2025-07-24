import { create } from "zustand";
import { RegionState } from "@/types/region";
import { getDongListByCity } from "@/utils/regionUtils";
const useRegionStore = create<RegionState>((set) => ({
  province: "서울",
  city: "강남구",
  dong: getDongListByCity("강남구"),
  isDongAllSelected: true,
  setRegion: (
    province: string,
    city: string,
    dong: { name: string; dong_code: string }[],
    isDongAllSelected: boolean
  ) =>
    set({
      province: province,
      city: city,
      dong: dong,
      isDongAllSelected: isDongAllSelected,
    }),
}));

export default useRegionStore;
