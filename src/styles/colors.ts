const grayscale = {
  Black: "#1a1a1a",
  White: "#ffffff",
  "900": "#1e293b",
  "800": "#303d53",
  "700": "#404f68",
  "600": "#50627f",
  "500": "#5e7090",
  "400": "#7585a2",
  "300": "#8c9ab5",
  "200": "#abb7cd",
  "100": "#cfd8e7",
  "50": "#e8edfc",
} as const;

const blue = {
  "900": "#000e33",
  "800": "#001d66",
  "700": "#002b99",
  "600": "#003acc",
  "500": "#0048ff",
  "400": "#336dff",
  "300": "#6691ff",
  "200": "#99b6ff",
  "100": "#ccdaff",
  "50": "#f5f8ff",
} as const;

const red = {
  Main: "#ff4d4f",
  Light: "#ffecec",
  Deep: "#d9363e",
  Star: "#ff0000",
} as const;

const green = {
  Main: "#2bc771",
  Deep: "#1aa958",
  Light: "#d2f5e6",
} as const;

const mint = {
  Main: "#00c2a8",
  Deep: "#009c89",
  Light: "#a3f7ee",
} as const;

const background = {
  Bg01: "#ffffff",
  Bg02: "#f5f5f5",
  Bg03: "#ffffff00",
  Bg04: "#f7f7f9",
  Bg06: "#00000080",
  Bg10: "#F7F7F9",
} as const;

const status = {
  Success: {
    Main: green.Main,
    Deep: green.Deep,
    Light: green.Light,
  },
  Error: {
    Main: red.Main,
    Deep: red.Deep,
    Light: red.Light,
  },
  Accent: {
    Main: mint.Main,
    Deep: mint.Deep,
    Light: mint.Light,
  },
  Disabled: grayscale["100"],
} as const;

const social = {
  KaKao: {
    Main: "#fee500",
    Deep: "#ffa435",
    Light: "#fffcdc",
  },
  Naver: {
    Main: "#03c75a",
    Deep: "#029c47",
    Light: "#e9fff3",
  },
} as const;

export const colors = {
  TextIcon: {
    OnNormal: {
      HighestEmp: grayscale["900"],
      HighEmp: grayscale["800"],
      MidEmp: grayscale["600"],
      LowEmp: grayscale["400"],
      LowestEmp: grayscale["200"],
      White: grayscale.White,
      Black: grayscale.Black,
      "Main 500": blue["500"],
      "Main 300": blue["300"],
      "Main 600": blue["600"],
      "Main 601": blue["100"],
    },
  },
  Status: status,
  Brand: {
    Primary: {
      Deep: blue["900"],
      Main: blue["500"],
      Light: blue["200"],
      Surface: blue["50"],
    },
    KaKao: social.KaKao,
    Naver: social.Naver,
  },
  Button: {
    Primary: {
      BG_Main: blue["500"],
      BG_Pressed: blue["600"],
      BG_Disabled: blue["50"],
      Text_Default: grayscale.White,
      Text_Disabled: blue["100"],
    },
    Neutral: {
      BG_Default: grayscale.White,
      BG_Pressed: grayscale["100"],
      BG_Disabled: background.Bg04,
      Text_Default: grayscale.Black,
      Text_Pressed: grayscale["400"],
      Text_Disabled: grayscale["200"],
      Border: grayscale["100"],
    },
    Secondary: {
      BG_Default: blue["50"],
      BG_Pressed: blue["100"],
      BG_Disabled: background.Bg04,
      Text_Default: blue["500"],
      Text_Pressed: blue["600"],
      Text_Disabled: grayscale["200"],
      Border_Default: blue["500"],
    },
  },
  Surface: {
    Normal: {
      Bg01: background.Bg01,
      Bg02: background.Bg02,
      Bg06: background.Bg06,
      Bg10: background.Bg10,
      Container0: background.Bg01,
      Container10: background.Bg02,
      ContainerB10: background.Bg04,
      ContainerB50: blue["50"],
      None: background.Bg03,
    },
  },
  Border: {
    Normal: {
      LowEmp: grayscale["100"],
      MidEmp: grayscale["200"],
      HighEmp: grayscale["400"],
    },
    Primary: {
      "300": blue["300"],
      "500": blue["500"],
    },
  },
  Etc: {
    Location: {
      TabButton: grayscale["50"],
    },
    Checkbox: {
      BG_Default: background.Bg01,
      BG_Accent: blue["200"],
      Border: grayscale["200"],
      AccentChecked: grayscale.White,
    },
    Icon: {
      "Star-filled": red.Star,
      "Star-empty": grayscale["200"],
    },
  },
} as const;

export type IconColorKey =
  | keyof typeof colors.TextIcon.OnNormal
  | keyof typeof colors.Status
  | keyof typeof colors.Brand
  | keyof typeof colors.Button.Primary
  | keyof typeof colors.Button.Neutral
  | keyof typeof colors.Button.Secondary
  | keyof typeof colors.Surface.Normal
  | keyof typeof colors.Border.Normal
  | keyof typeof colors.Border.Primary
  | keyof typeof colors.Etc.Location
  | keyof typeof colors.Etc.Checkbox
  | keyof typeof colors.Etc.Icon;
