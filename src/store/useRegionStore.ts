import { create } from "zustand";
import { RegionState } from "@/types/region";

const useRegionStore = create<RegionState>((set) => ({
  province: "",
  city: "",
  dong: [],
  isDongAllSelected: false,
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
