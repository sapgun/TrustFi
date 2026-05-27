# TrustFi 설정 가이드

## 1. 환경 변수 설정

### 필수 환경 변수

\`\`\`env
# Privy (인증)
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id

# Alchemy (블록체인 API)
ALCHEMY_API_KEY=your-alchemy-api-key
ALCHEMY_WEBHOOK_SIGNING_KEY=your-webhook-signing-key

# Supabase (데이터베이스)
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# OpenAI (NL Review)
OPENAI_API_KEY=your-openai-api-key
\`\`\`

### 선택 환경 변수

\`\`\`env
# Gitcoin Passport (Trust Score 향상)
GITCOIN_API_KEY=your-gitcoin-api-key
GITCOIN_SCORER_ID=your-scorer-id
\`\`\`

## 2. 데이터베이스 설정

### Supabase 프로젝트 생성
1. https://supabase.com 에서 새 프로젝트 생성
2. 프로젝트 URL과 anon key 복사

### 테이블 생성
v0 UI에서 SQL 스크립트 실행:
1. `scripts/create-notifications-table.sql`
2. `scripts/create-transactions-table.sql`

## 3. Alchemy Webhook 설정

### Webhook 생성
1. https://dashboard.alchemy.com 에서 프로젝트 선택
2. "Webhooks" 탭 클릭
3. "Create Webhook" 클릭
4. 설정:
   - Type: Address Activity
   - Addresses: 모니터링할 지갑 주소
   - Webhook URL: `https://your-domain.vercel.app/api/webhooks/alchemy`

### Signing Key 복사
Webhook 생성 후 Signing Key를 복사하여 환경 변수에 추가

## 4. OpenAI API 설정

### API Key 발급
1. https://platform.openai.com 에서 API Key 생성
2. 환경 변수에 추가

### 사용량 제한 설정
OpenAI 대시보드에서 월별 사용량 제한을 설정하여 비용 관리

## 5. 배포

### Vercel 배포
1. GitHub 저장소 연결
2. 환경 변수 설정
3. 배포

### 도메인 설정
1. Vercel에서 커스텀 도메인 추가
2. DNS 설정
3. Alchemy Webhook URL 업데이트

## 6. 테스트

### 로컬 테스트
\`\`\`bash
npm run dev
\`\`\`

### 프로덕션 테스트
1. 이메일로 로그인
2. 지갑 생성 확인
3. Trust Score 확인
4. 거래 시뮬레이션 테스트
5. 알림 수신 확인

## 문제 해결

### 지갑이 생성되지 않는 경우
- Privy 설정에서 `embeddedWallets.createOnLogin: "all-users"` 확인
- 브라우저 콘솔에서 에러 메시지 확인

### Trust Score가 표시되지 않는 경우
- Alchemy API 키 확인
- 지갑 주소가 올바른지 확인
- 거래 내역이 있는지 확인

### 알림이 작동하지 않는 경우
- Supabase Realtime 활성화 확인
- Webhook 설정 확인
- 데이터베이스 테이블 확인
