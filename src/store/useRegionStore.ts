import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RegionState } from "@/types/region";
import { getDongListByCity } from "@/utils/regionUtils";

// 초기 상태를 null로 설정
const initialState = {
  province: null as string | null,
  city: null as string | null,
  dong: null as { name: string; dong_code: string }[] | null,
  isDongAllSelected: false,
};

const useRegionStore = create<RegionState>()(
  persist(
    (set, get) => ({
      ...initialState,
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
      // 초기화 함수 추가
      initializeRegion: () => {
        const state = get();
        if (!state.province || !state.city || !state.dong) {
          set({
            province: "서울",
            city: "강남구",
            dong: getDongListByCity("강남구"),
            isDongAllSelected: true,
          });
        }
      },
    }),
    {
      name: "region-storage",
      // 초기값이 없을 때만 기본값 사용
      onRehydrateStorage: () => (state) => {
        if (state && (!state.province || !state.city || !state.dong)) {
          state.province = "서울";
          state.city = "강남구";
          state.dong = getDongListByCity("강남구");
          state.isDongAllSelected = true;
        }
      },
    }
  )
);

export default useRegionStore;
