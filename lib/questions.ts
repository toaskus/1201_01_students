import { Question } from './types';

// PRD의 채점 매핑 테이블에 따른 문항 데이터
export const questions: Question[] = [
  {
    id: 1,
    title: "1. 내가 중요한 결정을 할 때",
    options: [
      { id: 1, text: "직접 경험해보고 느껴본다", dimension: 'K' },
      { id: 2, text: "다른 사람의 조언을 듣는다", dimension: 'A' },
      { id: 3, text: "그림이나 도표로 정리해본다", dimension: 'V' },
      { id: 4, text: "논리적으로 분석하고 비교한다", dimension: 'D' },
    ],
  },
  {
    id: 2,
    title: "2. 새로운 정보를 배울 때",
    options: [
      { id: 1, text: "설명을 듣는 것이 가장 이해가 잘 된다", dimension: 'A' },
      { id: 2, text: "시각적 자료를 보면 금방 이해한다", dimension: 'V' },
      { id: 3, text: "체계적으로 정리된 자료가 좋다", dimension: 'D' },
      { id: 4, text: "직접 해보면서 배우는 것이 좋다", dimension: 'K' },
    ],
  },
  {
    id: 3,
    title: "3. 스트레스를 받을 때",
    options: [
      { id: 1, text: "편안한 장소를 떠올린다", dimension: 'V' },
      { id: 2, text: "운동이나 활동을 한다", dimension: 'K' },
      { id: 3, text: "원인을 분석하고 해결책을 찾는다", dimension: 'D' },
      { id: 4, text: "음악을 들거나 조용한 곳에 간다", dimension: 'A' },
    ],
  },
  {
    id: 4,
    title: "4. 다른 사람과 대화할 때",
    options: [
      { id: 1, text: "목소리 톤과 말투에 집중한다", dimension: 'A' },
      { id: 2, text: "논리적 흐름을 따라간다", dimension: 'D' },
      { id: 3, text: "상대방의 표정과 몸짓을 본다", dimension: 'K' },
      { id: 4, text: "대화 내용을 머릿속으로 그려본다", dimension: 'V' },
    ],
  },
  {
    id: 5,
    title: "5. 공부할 때",
    options: [
      { id: 1, text: "소리 내어 읽거나 설명을 듣는다", dimension: 'A' },
      { id: 2, text: "개념을 구조화하고 분류한다", dimension: 'D' },
      { id: 3, text: "필기하거나 손으로 써본다", dimension: 'K' },
      { id: 4, text: "마인드맵이나 그림으로 정리한다", dimension: 'V' },
    ],
  },
  {
    id: 6,
    title: "6. 기억할 때",
    options: [
      { id: 1, text: "그때의 감각과 느낌을 떠올린다", dimension: 'K' },
      { id: 2, text: "그때의 장면을 머릿속으로 그려본다", dimension: 'V' },
      { id: 3, text: "그때 들었던 소리나 말을 기억한다", dimension: 'A' },
      { id: 4, text: "논리적 순서나 패턴으로 기억한다", dimension: 'D' },
    ],
  },
  {
    id: 7,
    title: "7. 문제를 해결할 때",
    options: [
      { id: 1, text: "다른 사람과 이야기하며 해결책을 찾는다", dimension: 'A' },
      { id: 2, text: "문제를 시각적으로 표현해본다", dimension: 'V' },
      { id: 3, text: "단계별로 분석하고 체계적으로 접근한다", dimension: 'D' },
      { id: 4, text: "직접 시도해보고 결과를 확인한다", dimension: 'K' },
    ],
  },
  {
    id: 8,
    title: "8. 새로운 사람을 만날 때",
    options: [
      { id: 1, text: "외모와 옷차림을 먼저 본다", dimension: 'V' },
      { id: 2, text: "목소리와 말투에 주목한다", dimension: 'A' },
      { id: 3, text: "악수나 인사할 때의 느낌을 중요시한다", dimension: 'K' },
      { id: 4, text: "대화 내용의 논리성을 평가한다", dimension: 'D' },
    ],
  },
  {
    id: 9,
    title: "9. 휴식을 취할 때",
    options: [
      { id: 1, text: "음악이나 팟캐스트를 듣는다", dimension: 'A' },
      { id: 2, text: "책을 읽거나 글을 쓴다", dimension: 'D' },
      { id: 3, text: "산책이나 운동을 한다", dimension: 'K' },
      { id: 4, text: "영화나 드라마를 본다", dimension: 'V' },
    ],
  },
  {
    id: 10,
    title: "10. 목표를 세울 때",
    options: [
      { id: 1, text: "목표를 달성한 모습을 상상한다", dimension: 'V' },
      { id: 2, text: "목표에 대해 말하거나 들을 수 있게 한다", dimension: 'A' },
      { id: 3, text: "목표 달성을 위한 구체적 행동을 계획한다", dimension: 'K' },
      { id: 4, text: "목표를 단계별로 나누고 분석한다", dimension: 'D' },
    ],
  },
];

