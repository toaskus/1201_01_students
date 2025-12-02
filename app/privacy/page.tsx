export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">개인정보 처리 안내</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. 수집하는 정보</h2>
            <p className="mb-2">
              본 서비스는 개인을 식별할 수 있는 정보를 수집하지 않습니다.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>검사 결과 점수 (V/A/K/D 점수)</li>
              <li>검사 완료 시간</li>
              <li>디바이스 타입 (모바일/데스크톱)</li>
              <li>익명 세션 ID</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. 정보 사용 목적</h2>
            <p>
              수집된 정보는 서비스 개선 및 통계 분석 목적으로만 사용됩니다.
              개인을 식별할 수 있는 정보는 포함되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. 쿠키 사용</h2>
            <p>
              본 서비스는 최소한의 쿠키만 사용하며, 서비스 기능 제공을 위해 필요합니다.
              분석 목적의 쿠키는 선택적으로 사용될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. 정보 보관 기간</h2>
            <p>
              검사 결과는 통계 분석 목적으로 보관되며, 개인 식별이 불가능한 형태로 저장됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. 문의</h2>
            <p>
              개인정보 처리에 대한 문의사항이 있으시면 서비스 제공자에게 연락해주세요.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            최종 업데이트: 2025년 12월
          </p>
        </div>
      </div>
    </main>
  );
}

