import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
      <body>
        {/* Header with Logo */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/" className="flex items-center justify-center gap-4 hover:opacity-80 transition-opacity">
              {/* Logo */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <Image
                  src="/Askus.png"
                  alt="Ask us"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              {/* Text */}
              <div className="flex flex-col justify-center">
                <span className="text-base md:text-lg font-semibold text-gray-800 leading-tight">
                  질문하는 인간, 애스커스
                </span>
                <span className="text-xs md:text-sm text-gray-500 leading-tight mt-1">
                  삶의 질문에 대한 답을 찾아가는 여정
                </span>
              </div>
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

