import { create } from "zustand";
import { RegionState } from "@/types/region";

const useRegionStore = create<RegionState>((set) => ({
  province: "",
  city: "",
  dong: [],
  setRegion: (
    province: string,
    city: string,
    dong: { name: string; dong_code: string }[]
  ) =>
    set({
      province: province,
      city: city,
      dong: dong,
    }),
}));

export default useRegionStore;
