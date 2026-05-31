import localFont from "next/font/local";
import StyledComponentsRegistry from "@/lib/registry";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/GlobalStyle";

const iropkeBatang = localFont({
  src: "./fonts/IropkeBatangM.woff2",
  variable: "--font-iropke",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head></head>
      <body className={iropkeBatang.variable}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
