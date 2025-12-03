import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-16">
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            나를 알아가는 여정,
            <br />
            지금 시작해보세요.
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            VAKD 진단으로 <span className="font-semibold text-blue-600">나만의 학습·업무 스타일</span>을 알아보세요.
          </p>
        </div>

        {/* VAKD 설명 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600 mb-2">V</div>
            <div className="text-sm font-semibold text-gray-800 mb-1">시각형</div>
            <div className="text-xs text-gray-600">Visual</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-2">A</div>
            <div className="text-sm font-semibold text-gray-800 mb-1">청각형</div>
            <div className="text-xs text-gray-600">Auditory</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600 mb-2">K</div>
            <div className="text-sm font-semibold text-gray-800 mb-1">신체감각형</div>
            <div className="text-xs text-gray-600">Kinesthetic</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-orange-600 mb-2">D</div>
            <div className="text-sm font-semibold text-gray-800 mb-1">논리형</div>
            <div className="text-xs text-gray-600">Digital/Logical</div>
          </div>
        </div>

        {/* 간단 설명 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            VAKD 검사는 당신이 정보를 어떻게 처리하는지 알아보는 진단 도구입니다.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>당신의 학습 스타일에 맞는 공부법을 찾아보세요</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>일상생활과 업무에 도움이 되는 맞춤형 가이드를 받아보세요</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>나에게 맞는 직업과 진로 방향을 탐색해보세요</span>
            </li>
          </ul>
        </div>

        {/* CTA 버튼 */}
        <div className="text-center mb-8">
          <Link
            href="/test"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg transition-colors duration-200"
          >
            검사 시작하기
          </Link>
        </div>

        {/* 하단 안내 */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>⏱️ 약 5~7분 소요</p>
          <p>🔒 개인 정보는 저장하지 않습니다. (결과 통계만 익명 수집)</p>
          <p>
            <Link href="/privacy" className="text-blue-600 hover:underline">
              개인정보 처리 안내 보기
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

