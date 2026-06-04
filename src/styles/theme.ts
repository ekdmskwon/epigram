import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    // 블랙 계열 시스템
    black950: "#121212",
    black900: "#373737",
    black800: "#373737",
    black700: "#373737",
    black600: "#373737",
    black500: "#454545",
    black400: "#525252",
    black300: "#5E5E5E",
    black200: "#6B6B6B",
    black100: "#F9F9F9",

    // 블루 계열 시스템
    blue950: "#1A212D",
    blue900: "#2D394E",
    blue800: "#40516E",
    blue700: "#52698E",
    blue600: "#6A82A9",
    blue500: "#8B9DBC",
    blue400: "#ABB8CE",
    blue300: "#CBD3E1",
    blue200: "#ECEFF4",
    blue100: "#FFFFFF",

    // 배경 및 상태 컬러
    background: "#F5F7FA",
    state: "#FF6577",

    // 그레이 계열 시스템
    gray400: "#919191",
    gray300: "#ABABAB",
    gray200: "#C4C4C4",
    gray100: "#DEDEDE",

    // 라인/테두리 컬레 시스템
    line200: "#CFDBEA",
    line100: "#F2F2F2",

    // 일러스트 및 이모지 전용 컬러들
    illustration: {
      yellow100: "#FBC85B",
      yellow200: "#E8AA26",
      green: "#48BB98",
      purple: "#8E80E3",
      blue: "#5195EE",
      red: "#E46E80",
      brown: "#9A695E",
      charcol: "#3E3E3E",
      navy: "#3E414D",
      gray: "#494D59",

      chart100: "#C7D1E0",
      chart200: "#E3E9F1",
      chart300: "#EFF3F8",
    },
  },

  // 폰트 종류
  fonts: {
    main: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    point: "var(--font-iropke), Georgia, serif",
  },

  // 타이포그래피 시스템
  fontSizes: {
    main: {
      text3xl: { size: "32px", lineHeight: "42px" },
      text2xl: { size: "24px", lineHeight: "32px" },
      textXl: { size: "20px", lineHeight: "32px" },
      text2lg: { size: "18px", lineHeight: "26px" },
      textLg: { size: "16px", lineHeight: "26px" },
      textMd: { size: "14px", lineHeight: "24px" },
      textSm: { size: "13px", lineHeight: "22px" },
      textXs: { size: "12px", lineHeight: "20px" },
    },

    point: {
      text4xl: { size: "40px", lineHeight: "52px" },
      text3xl: { size: "32px", lineHeight: "48px" },
      text2xl: { size: "24px", lineHeight: "40px" },
      textXl: { size: "20px", lineHeight: "28px" },
      textLg: { size: "16px", lineHeight: "26px" },
      textMd: { size: "14px", lineHeight: "24px" },
      textSm: { size: "13px", lineHeight: "20px" },
      textXs: { size: "12px", lineHeight: "18px" },
    },
  },
};
