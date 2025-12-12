'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Result, Dimension } from '@/lib/types';
import {
  dimensionNames,
  dimensionDescriptions,
  studyTips,
  performanceAnalysis,
  strategyTimeline,
} from '@/lib/resultContent';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { toPng } from 'html-to-image';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['primary', 'performance']));
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dataParam = searchParams.get('data');
    const sessionParam = searchParams.get('sessionId');

    if (dataParam) {
      try {
        const parsedResult = JSON.parse(decodeURIComponent(dataParam));
        setResult(parsedResult);
        setSessionId(sessionParam);
        
        // 결과 저장 API 호출
        if (sessionParam) {
          saveResult(parsedResult, sessionParam);
        }
      } catch (error) {
        console.error('Failed to parse result data:', error);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  const saveResult = async (result: Result, sessionId: string) => {
    try {
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scores: result.scores,
          primaryTypes: result.primary,
          secondaryTypes: result.secondary,
          clientType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
          sessionId,
        }),
      });
    } catch (error) {
      console.error('Failed to save result:', error);
    }
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleSaveImage = async () => {
    if (!resultRef.current) return;

    try {
      // 이미지 저장 전 모든 섹션 펼치기
      const allSections = new Set(['primary', 'performance', 'description', 'timeline', 'solution']);
      const originalExpanded = new Set(expandedSections);
      setExpandedSections(allSections);

      // DOM 업데이트를 기다림
      await new Promise(resolve => setTimeout(resolve, 100));

      // 스크롤을 맨 위로 이동하여 전체 내용이 보이도록 함
      resultRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
      
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toPng(resultRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      
      // 원래 상태로 복원
      setExpandedSections(originalExpanded);
      
      const link = document.createElement('a');
      link.download = `vakd-result-${sessionId || Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('이미지 저장에 실패했습니다.');
      // 에러 발생 시에도 원래 상태로 복원
      const originalExpanded = new Set(expandedSections);
      setExpandedSections(originalExpanded);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('링크가 복사되었습니다!');
    });
  };

  if (!result) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">결과를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  const chartData = [
    { dimension: '시각형(V)', value: result.scores.V, fullMark: 40 },
    { dimension: '청각형(A)', value: result.scores.A, fullMark: 40 },
    { dimension: '신체감각형(K)', value: result.scores.K, fullMark: 40 },
    { dimension: '논리형(D)', value: result.scores.D, fullMark: 40 },
  ];

  const getDimensionColor = (dimension: Dimension): string => {
    const colors: Record<Dimension, string> = {
      V: '#9333ea', // purple
      A: '#2563eb', // blue
      K: '#16a34a', // green
      D: '#ea580c', // orange
    };
    return colors[dimension];
  };

  const primaryDim = result.primary[0];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            당신의 학습 전략 설계 결과
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            점수는 성격을 &apos;줄 세우기&apos;가 아니라, <strong>이런 방식으로 공부할 때 성과가 잘 나는 유형</strong>을 보여줘요.
          </p>
        </div>

        {/* 전체 결과 영역 - 캡처 대상 */}
        <div ref={resultRef} className="space-y-6">
        {/* Result Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* 점수 시각화 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">VAKD 점수</h2>
            <div className="h-64 md:h-80 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" />
                  <PolarRadiusAxis angle={90} domain={[0, 40]} />
                  <Radar
                    name="점수"
                    dataKey="value"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(['V', 'A', 'K', 'D'] as Dimension[]).map((dim) => (
                <div
                  key={dim}
                  className="text-center p-3 rounded-lg"
                  style={{ backgroundColor: `${getDimensionColor(dim)}15` }}
                >
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: getDimensionColor(dim) }}
                  >
                    {result.scores[dim]}점
                  </div>
                  <div className="text-sm text-gray-600">{dimensionNames[dim]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 주/보조 유형 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">당신의 유형</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border-2" style={{ borderColor: getDimensionColor(primaryDim) }}>
                <div className="flex items-center mb-2">
                  <span
                    className="text-2xl font-bold mr-2"
                    style={{ color: getDimensionColor(primaryDim) }}
                  >
                    Primary
                  </span>
                  <span className="text-lg font-semibold text-gray-800">
                    {result.primary.map((d) => dimensionNames[d]).join(', ')}
                  </span>
                </div>
                <p className="text-gray-700">
                  {dimensionDescriptions[primaryDim].processing}
                </p>
              </div>
              {result.secondary.length > 0 && (
                <div className="p-4 rounded-lg border-2" style={{ borderColor: getDimensionColor(result.secondary[0]) }}>
                  <div className="flex items-center mb-2">
                    <span
                      className="text-xl font-bold mr-2"
                      style={{ color: getDimensionColor(result.secondary[0]) }}
                    >
                      Secondary
                    </span>
                    <span className="text-lg font-semibold text-gray-800">
                      {result.secondary.map((d) => dimensionNames[d]).join(', ')}
                    </span>
                  </div>
                  <p className="text-gray-700">
                    {dimensionDescriptions[result.secondary[0]].processing}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 유형별 상세 설명 */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">유형별 상세 설명</h2>
          <div className="space-y-6">
            {result.primary.map((dim) => (
              <div key={dim} className="border-l-4 pl-4" style={{ borderColor: getDimensionColor(dim) }}>
                <h3 className="text-lg font-bold mb-2" style={{ color: getDimensionColor(dim) }}>
                  {dimensionNames[dim]}
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="font-semibold mb-1">당신의 정보 처리 방식</p>
                    <p className="text-sm">{dimensionDescriptions[dim].processing}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">효과적인 학습법 추천</p>
                    <p className="text-sm whitespace-pre-line">{dimensionDescriptions[dim].studyMethod}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 성적 정체 원인 분석 */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">🔍 성적이 정체될 때, 이런 이유일 수 있어요</h2>
            <button
              onClick={() => toggleSection('performance')}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              {expandedSections.has('performance') ? '접기' : '펼치기'}
            </button>
          </div>
          {expandedSections.has('performance') && (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border-l-4" style={{ borderColor: getDimensionColor(primaryDim) }}>
                <p className="font-semibold text-gray-900 mb-2">전략 불일치 가능성</p>
                <p className="text-sm text-gray-700 mb-3">{performanceAnalysis[primaryDim].mismatch}</p>
                <div className="mt-3 p-3 bg-white rounded border">
                  <p className="font-semibold text-green-700 mb-1">✅ 해결 방법</p>
                  <p className="text-sm text-gray-700">{performanceAnalysis[primaryDim].solution}</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>📌 포인트:</strong> 노력 부족 ❌ | 지능 문제 ❌ | <strong>전략 불일치 ⭕</strong>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 지금 vs 앞으로 전략 */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⏱ 학습 전략 로드맵</h2>
          <div className="space-y-4">
            {result.primary.map((dim) => (
              <div key={dim} className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4" style={{ borderColor: getDimensionColor(dim) }}>
                  <h3 className="font-semibold text-gray-900 mb-2">📌 지금(내신/기본기)</h3>
                  <p className="text-sm text-gray-700">{strategyTimeline[dim].now}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4" style={{ borderColor: getDimensionColor(dim) }}>
                  <h3 className="font-semibold text-gray-900 mb-2">📈 앞으로(고3 대비/수능)</h3>
                  <p className="text-sm text-gray-700">{strategyTimeline[dim].future}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 맞춤 솔루션 */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">나에게 맞는 솔루션</h2>
          <div className="space-y-4">
            {result.primary.map((dim) => (
              <div key={dim} className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🧠 시험·과제 준비 공부법</h3>
                  <p className="text-sm text-gray-700">{studyTips[dim].exam}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🧭 전공·진로 탐색 시 체크 포인트</h3>
                  <p className="text-sm text-gray-700">{studyTips[dim].career}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">⏰ 당신에게 맞는 하루 루틴 예시</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{studyTips[dim].routine}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* 결과 공유/저장 */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">결과 공유/저장</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSaveImage}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              결과 이미지로 저장하기
            </button>
            <button
              onClick={handleCopyLink}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              링크 복사
            </button>
          </div>
        </div>

        {/* 재검사 안내 */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">나중에 다시 검사해보고 비교해보세요</p>
          <button
            onClick={() => router.push('/test')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            다시 검사하기
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">결과를 불러오는 중...</p>
        </div>
      </main>
    }>
      <ResultContent />
    </Suspense>
  );
}
