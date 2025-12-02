# Vercel 배포 문제 해결 가이드

## DEPLOYMENT_NOT_FOUND 에러 해결 방법

### 1. Vercel 대시보드 확인

1. **Vercel 대시보드 접속**: https://vercel.com/dashboard
2. **프로젝트 목록 확인**
   - 프로젝트가 있는지 확인
   - 프로젝트 이름 확인 (예: `1202_01` 또는 `vakd-finder`)

### 2. 프로젝트 재배포

#### 방법 A: Vercel 대시보드에서 재배포

1. Vercel 대시보드 → 프로젝트 선택
2. "Deployments" 탭 클릭
3. 최신 배포 옆 "..." 메뉴 → "Redeploy" 클릭

#### 방법 B: GitHub에서 재배포 트리거

```bash
# 빈 커밋으로 재배포 트리거
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

### 3. 프로젝트 재연결

만약 프로젝트가 보이지 않는다면:

1. **Vercel 대시보드 → "Add New..." → "Project"**
2. **GitHub 저장소 다시 선택**
3. **프로젝트 설정 확인**:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
4. **"Deploy" 클릭**

### 4. 올바른 URL 확인

배포가 완료되면:
- Vercel 대시보드 → 프로젝트 → "Domains" 탭에서 올바른 URL 확인
- 형식: `https://프로젝트명-xxxxx.vercel.app`

### 5. 빌드 로그 확인

1. Vercel 대시보드 → 프로젝트 → "Deployments"
2. 배포 클릭 → "Build Logs" 확인
3. 에러가 있다면 수정 후 재배포

### 6. 환경 변수 확인 (필요한 경우)

현재 프로젝트는 환경 변수가 필요하지 않지만, 향후 필요하면:
- Settings → Environment Variables에서 확인

### 7. Git 저장소 확인

```bash
# 원격 저장소 확인
git remote -v

# 최신 커밋 확인
git log --oneline -5

# GitHub에 푸시 확인
git push origin main
```

## 빠른 해결 체크리스트

- [ ] Vercel 대시보드에서 프로젝트가 보이는지 확인
- [ ] 최신 배포가 성공했는지 확인 (초록색 체크 표시)
- [ ] 올바른 URL로 접근하고 있는지 확인
- [ ] GitHub 저장소가 올바르게 연결되어 있는지 확인
- [ ] 빌드 로그에 에러가 없는지 확인

## 여전히 문제가 있다면

1. **Vercel 지원팀에 문의**: https://vercel.com/support
2. **프로젝트 삭제 후 재생성**:
   - Vercel 대시보드 → 프로젝트 → Settings → Delete Project
   - 새로 프로젝트 Import

