'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';
import { Answer } from '@/lib/types';
import { validateAnswers } from '@/lib/scoring';

export default function TestPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [startTime] = useState(Date.now());

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id);

  useEffect(() => {
    // 초기화: 모든 문항에 대한 빈 답변 생성
    if (answers.length === 0) {
      setAnswers(
        questions.map((q) => ({
          questionId: q.id,
          scores: [],
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScoreChange = (optionId: number, score: number) => {
    const questionId = currentQuestion.id;
    const answerIndex = answers.findIndex((a) => a.questionId === questionId);
    const answer = answers[answerIndex];

    // 현재 옵션의 기존 점수 확인
    const currentOptionScore = answer.scores.find((s) => s.optionId === optionId)?.score;
    
    // 같은 점수를 가진 다른 옵션 찾기
    const sameScoreOption = answer.scores.find((s) => s.score === score && s.optionId !== optionId);

    let newScores = [...answer.scores];

    // 현재 옵션의 기존 점수 제거
    newScores = newScores.filter((s) => s.optionId !== optionId);

    // 같은 점수를 가진 다른 옵션이 있으면 제거
    if (sameScoreOption) {
      newScores = newScores.filter((s) => s.optionId !== sameScoreOption.optionId);
    }

    // 새 점수 추가
    newScores.push({ optionId, score });

    // 답변 업데이트
    const newAnswers = [...answers];
    newAnswers[answerIndex] = {
      questionId,
      scores: newScores,
    };
    setAnswers(newAnswers);
  };

  const getScoreForOption = (optionId: number): number | null => {
    const score = currentAnswer?.scores.find((s) => s.optionId === optionId);
    return score ? score.score : null;
  };

  const isCurrentQuestionComplete = (): boolean => {
    if (!currentAnswer) return false;
    const scores = currentAnswer.scores.map((s) => s.score).sort((a, b) => b - a);
    return JSON.stringify(scores) === JSON.stringify([4, 3, 2, 1]);
  };

  const isAllComplete = (): boolean => {
    return answers.every((answer) => {
      const scores = answer.scores.map((s) => s.score).sort((a, b) => b - a);
      return JSON.stringify(scores) === JSON.stringify([4, 3, 2, 1]);
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (!validateAnswers(answers)) {
      alert('모든 문항을 완료해주세요.');
      return;
    }

    // 결과 계산 및 전달
    const { calculateScores, determineTypes } = require('@/lib/scoring');
    const scores = calculateScores(answers);
    const result = determineTypes(scores);

    // 세션 ID 생성
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 결과를 URL state로 전달
    const resultData = encodeURIComponent(JSON.stringify(result));
    router.push(`/result?data=${resultData}&sessionId=${sessionId}`);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              문항 {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            {currentQuestion.title}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => {
              const selectedScore = getScoreForOption(option.id);
              return (
                <div
                  key={option.id}
                  className="border-2 rounded-lg p-4 transition-all"
                  style={{
                    borderColor: selectedScore
                      ? selectedScore === 4
                        ? '#2563eb'
                        : selectedScore === 3
                        ? '#3b82f6'
                        : selectedScore === 2
                        ? '#60a5fa'
                        : '#93c5fd'
                      : '#e5e7eb',
                    backgroundColor: selectedScore
                      ? selectedScore === 4
                        ? '#eff6ff'
                        : selectedScore === 3
                        ? '#dbeafe'
                        : selectedScore === 2
                        ? '#e0f2fe'
                        : '#f0f9ff'
                      : 'white',
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="text-gray-800 flex-1">{option.text}</p>
                    <div className="flex gap-2 flex-shrink-0">
                      {[4, 3, 2, 1].map((score) => {
                        const isSelected = selectedScore === score;

                        return (
                          <button
                            key={score}
                            onClick={() => handleScoreChange(option.id, score)}
                            className={`
                              w-12 h-12 rounded-lg font-semibold transition-all
                              ${isSelected
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }
                            `}
                          >
                            {score}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 각 문항에서 4개의 점수(4, 3, 2, 1)를 모두 사용해주세요.
              <br />
              가장 나와 비슷한 것에 4점, 가장 덜 비슷한 것에 1점을 부여하세요.
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`
              px-6 py-3 rounded-lg font-medium transition-colors
              ${currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            이전
          </button>

          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isCurrentQuestionComplete()}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors
                ${isCurrentQuestionComplete()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              다음
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isAllComplete()}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors
                ${isAllComplete()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              제출하기
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

