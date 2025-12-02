# VAKD Finder 배포 가이드

GitHub와 Vercel을 사용한 배포 프로세스 상세 가이드입니다.

## 📋 목차

1. [사전 준비](#1-사전-준비)
2. [GitHub 저장소 생성 및 푸시](#2-github-저장소-생성-및-푸시)
3. [Vercel 배포](#3-vercel-배포)
4. [배포 후 확인](#4-배포-후-확인)
5. [문제 해결](#5-문제-해결)

---

## 1. 사전 준비

### 필요한 계정
- ✅ GitHub 계정
- ✅ Vercel 계정 (GitHub 계정으로 가입 가능)

### 로컬 환경 확인
```bash
# Git이 설치되어 있는지 확인
git --version

# Node.js가 설치되어 있는지 확인
node --version
npm --version
```

---

## 2. GitHub 저장소 생성 및 푸시

### 2.1. Git 저장소 초기화

프로젝트 폴더에서 다음 명령어를 실행하세요:

```bash
# Git 저장소 초기화
git init

# 현재 상태 확인
git status
```

### 2.2. 모든 파일 추가 및 커밋

```bash
# 모든 파일 스테이징
git add .

# 첫 커밋 생성
git commit -m "Initial commit: VAKD Finder 서비스 구현"
```

### 2.3. GitHub에서 새 저장소 생성

1. **GitHub 웹사이트 접속**: https://github.com
2. **우측 상단의 "+" 버튼 클릭** → "New repository" 선택
3. **저장소 정보 입력**:
   - Repository name: `vakd-finder` (또는 원하는 이름)
   - Description: "수능 이후 고3을 위한 학습·진로 성향 진단 서비스"
   - Visibility: Public 또는 Private 선택
   - **⚠️ 중요**: "Initialize this repository with a README" 체크 해제
4. **"Create repository" 버튼 클릭**

### 2.4. 로컬 저장소와 GitHub 연결

GitHub에서 생성된 저장소의 URL을 복사한 후:

```bash
# 원격 저장소 추가 (YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/vakd-finder.git

# 또는 SSH 사용 시
git remote add origin git@github.com:YOUR_USERNAME/vakd-finder.git

# 원격 저장소 확인
git remote -v
```

### 2.5. 코드 푸시

```bash
# 기본 브랜치를 main으로 설정 (필요한 경우)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

**첫 푸시 시 GitHub 로그인 창이 뜨면 인증하세요.**

---

## 3. Vercel 배포

### 3.1. Vercel 계정 생성/로그인

1. **Vercel 웹사이트 접속**: https://vercel.com
2. **"Sign Up" 또는 "Log In" 클릭**
3. **GitHub 계정으로 로그인** (권장)

### 3.2. 프로젝트 Import

1. **Vercel 대시보드에서 "Add New..." → "Project" 클릭**
2. **GitHub 저장소 선택**:
   - "Import Git Repository" 섹션에서 `vakd-finder` 저장소 찾기
   - 또는 GitHub에서 직접 연결된 저장소 목록에서 선택
3. **프로젝트 설정 확인**:
   - **Framework Preset**: Next.js (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 설정됨)
   - **Output Directory**: `.next` (자동 설정됨)
   - **Install Command**: `npm install` (자동 설정됨)

### 3.3. 환경 변수 설정 (필요한 경우)

현재 프로젝트는 환경 변수가 필요하지 않지만, 향후 DB 연결 등이 필요하면:
- "Environment Variables" 섹션에서 추가 가능

### 3.4. 배포 시작

1. **"Deploy" 버튼 클릭**
2. **빌드 진행 상황 확인** (약 1-3분 소요)
3. **배포 완료 후 URL 확인**

---

## 4. 배포 후 확인

### 4.1. 배포된 사이트 접속

배포가 완료되면 다음과 같은 URL이 생성됩니다:
- `https://vakd-finder-xxxxx.vercel.app` (프로젝트별 고유 URL)
- 또는 커스텀 도메인 설정 시 지정한 도메인

### 4.2. 기능 테스트

다음 기능들을 확인하세요:

- ✅ 홈 페이지 로딩
- ✅ 검사 페이지 접근
- ✅ 검사 진행 (모든 문항 완료)
- ✅ 결과 페이지 표시
- ✅ 결과 이미지 저장 기능
- ✅ 링크 공유 기능

### 4.3. 커스텀 도메인 설정 (선택사항)

1. **Vercel 대시보드 → 프로젝트 → Settings → Domains**
2. **원하는 도메인 입력**
3. **DNS 설정 안내에 따라 도메인 제공업체에서 설정**

---

## 5. 문제 해결

### 5.1. 빌드 에러 발생 시

**에러 확인 방법**:
1. Vercel 대시보드 → 프로젝트 → "Deployments"
2. 실패한 배포 클릭 → "Build Logs" 확인

**일반적인 해결 방법**:
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러가 발생하면 수정 후 다시 푸시
git add .
git commit -m "Fix: 빌드 에러 수정"
git push
```

### 5.2. 환경 변수 설정

만약 환경 변수가 필요하다면:
1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. 변수 추가 후 재배포

### 5.3. 자동 배포 설정 확인

기본적으로 Vercel은 다음 경우에 자동 배포됩니다:
- ✅ `main` 브랜치에 푸시할 때
- ✅ Pull Request 생성 시 (Preview 배포)

설정 변경:
- Settings → Git → Production Branch 설정

---

## 6. 추가 팁

### 6.1. Preview 배포

Pull Request를 생성하면 자동으로 Preview URL이 생성됩니다.
- 각 PR마다 고유한 URL 생성
- 프로덕션에 영향 없이 테스트 가능

### 6.2. 배포 알림 설정

- Settings → Notifications에서 이메일/슬랙 알림 설정 가능

### 6.3. 성능 모니터링

- Vercel 대시보드에서 Analytics 확인 가능
- Web Vitals, 페이지뷰 등 모니터링

---

## 📝 체크리스트

배포 전 확인사항:

- [ ] 모든 파일이 커밋되었는지 확인 (`git status`)
- [ ] 로컬에서 빌드가 성공하는지 확인 (`npm run build`)
- [ ] `.gitignore`에 불필요한 파일이 제외되었는지 확인
- [ ] `README.md`가 최신 상태인지 확인
- [ ] 환경 변수가 필요한 경우 Vercel에 설정했는지 확인

---

## 🎉 완료!

배포가 완료되면 공유 가능한 URL로 서비스를 사용할 수 있습니다!

**문제가 발생하면 Vercel의 Build Logs를 확인하거나, 로컬에서 `npm run build`로 테스트해보세요.**

