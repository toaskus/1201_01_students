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
            <Link href="/" className="flex items-center justify-center gap-3 hover:opacity-80 transition-opacity">
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                <Image
                  src="/Askus.png"
                  alt="Ask us"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-blue-500">Ask us</span>
                <span className="text-xs md:text-sm text-gray-600">질문하는 인간, 애스커스</span>
              </div>
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

