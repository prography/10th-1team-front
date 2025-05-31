export interface DongInfo {
  name: string;
  dong_code: string;
}

export interface City {
  name: string;
  city_code: string;
  is_searchable: boolean;
  dong_list: DongInfo[];
}

export interface Province {
  name: string;
  code: string;
  city_list: City[];
}

export interface RegionState {
  selectedProvince: string;
  selectedCity: string;
  selectedDong: DongInfo[];
  setRegion: (province: string, city: string, dong: DongInfo[]) => void;
}

export interface Region {
  name: string;
  fillPath: string;
  strokePath: string | null;
  label: {
    text: string;
    x: number;
    y: number;
    fontSize: number;
  };
}

export type RegionData = {
  data: {
    provinces: Province[];
  };
};
