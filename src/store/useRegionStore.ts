import { create } from "zustand";
import { RegionState } from "@/types/region";

const useRegionStore = create<RegionState>((set) => ({
  selectedProvince: "",
  selectedCity: "",
  selectedDong: [],
  setRegion: (
    province: string,
    city: string,
    dong: { name: string; dong_code: string }[]
  ) =>
    set({
      selectedProvince: province,
      selectedCity: city,
      selectedDong: dong,
    }),
}));

export default useRegionStore;
