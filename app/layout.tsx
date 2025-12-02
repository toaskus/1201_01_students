import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VAKD Finder - 학습·진로 성향 진단",
  description: "수능 이후 고3을 위한 학습·진로 성향 진단 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

