# VAKD Finder

일반 고등학생을 위한 학습 전략 설계 도구

## 개요

VAKD Finder는 일반 고등학생(1학년~3학년)이 자신의 **정보 처리·학습 스타일(VAKD)** 을 이해하고, 과목별·상황별로 **가장 효율적인 공부 전략을 스스로 설계**할 수 있도록 돕는 웹 서비스입니다.

### 핵심 가치

* ❌ 진로 결정 도구
* ❌ 단순 공부 팁 제공
* ✅ **전략 선택 능력 강화**
* ✅ **메타인지 능력 향상**

## 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Image Export**: html-to-image

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 주요 기능

1. **홈 페이지**: 서비스 소개 및 검사 시작
2. **검사 페이지**: 10문항 VAKD 검사 (각 문항에 4/3/2/1 점수 부여)
3. **결과 페이지**: 
   - V/A/K/D 점수 시각화 (Radar Chart)
   - 주/보조 유형 설명 (전략 선택 기준으로 설명)
   - **과목별 적용 가이드** (국어, 수학, 영어, 탐구)
   - **성적 정체 원인 분석** (전략 불일치 관점)
   - **지금 vs 앞으로 전략 구분** (현재 학습 / 고3 대비)
   - **자기조절 학습 팁** (계획, 집중, 복습 주기)
   - 결과 이미지 저장 및 링크 공유

## 프로젝트 구조

```
├── app/
│   ├── page.tsx          # 홈 페이지
│   ├── test/
│   │   └── page.tsx      # 검사 페이지
│   ├── result/
│   │   └── page.tsx      # 결과 페이지
│   ├── privacy/
│   │   └── page.tsx      # 개인정보 처리 안내
│   └── api/
│       └── results/
│           └── route.ts  # 결과 저장 API
├── lib/
│   ├── types.ts          # TypeScript 타입 정의
│   ├── questions.ts      # 검사 문항 데이터
│   ├── scoring.ts        # 채점 로직
│   └── resultContent.ts  # 결과 콘텐츠
└── prd.md                # 제품 요구사항 문서
```

## 배포

### Vercel 배포

이 프로젝트는 Vercel에 최적화되어 있습니다.

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 GitHub 저장소 Import
3. 자동 배포 완료!

자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

## 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

