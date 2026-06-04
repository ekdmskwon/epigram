import localFont from "next/font/local";
import ClientProvider from "@/components/Provider";

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className={iropkeBatang.variable}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
