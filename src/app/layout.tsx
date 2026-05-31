import localFont from "next/font/local";
import ClientProvider from "@/components/Provider";
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
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
