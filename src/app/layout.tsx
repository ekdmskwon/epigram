import localFont from "next/font/local";
import ClientProvider from "@/components/Provider";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "100 900",
});

const iropkeBatang = localFont({
  src: "./fonts/IropkeBatangM.woff",
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
      <body className={`${pretendard.variable} ${iropkeBatang.variable}`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
