import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black950: string;
      black900: string;
      black800: string;
      black700: string;
      black600: string;
      black500: string;
      black400: string;
      black300: string;
      black200: string;
      black100: string;

      blue950: string;
      blue900: string;
      blue800: string;
      blue700: string;
      blue600: string;
      blue500: string;
      blue400: string;
      blue300: string;
      blue200: string;
      blue100: string;

      background: string;
      state: string;

      inputBg: string;
      inputBorder: string;
      inputBorderFocus: string;
      buttonFillDefault: string;
      buttonFillHover: string;
      buttonFillActive: string;
      buttonFillDisabled: string;
      buttonFillDisabledText: string;

      gray400: string;
      gray300: string;
      gray200: string;
      gray100: string;

      line200: string;
      line100: string;

      illustration: {
        yellow100: string;
        yellow200: string;
        green: string;
        purple: string;
        blue: string;
        red: string;
        brown: string;
        charcol: string;
        navy: string;
        gray: string;
        chart100: string;
        chart200: string;
        chart300: string;
      };
    };
    fonts: {
      main: string;
      point: string;
    };
    fontSizes: {
      main: {
        [key: string]: { size: string; lineHeight: string };
      };
      point: {
        [key: string]: { size: string; lineHeight: string };
      };
    };
  }
}