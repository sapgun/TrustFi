# Alchemy Webhook 설정 가이드

TrustFi의 실시간 알림 및 Trust Score 자동 업데이트를 위한 Alchemy Webhook 설정 방법입니다.

## 1. Webhook 엔드포인트 배포

### 로컬 개발 (Ngrok 사용)

\`\`\`bash
# Ngrok 설치 (macOS)
brew install ngrok

# Ngrok 인증
ngrok authtoken YOUR_AUTH_TOKEN

# 로컬 서버 터널링
ngrok http 3000
\`\`\`

Ngrok URL 예시: `https://abc123.ngrok.io`

### 프로덕션 배포

Vercel에 배포 후 자동으로 생성되는 URL 사용:
- `https://your-app.vercel.app/api/webhooks/alchemy`

## 2. Alchemy 대시보드 설정

### Address Activity Webhook 생성

1. [Alchemy Dashboard](https://dashboard.alchemy.com/webhooks) 접속
2. "Create Webhook" 클릭
3. Webhook 타입 선택: **Address Activity**
4. 설정:
   - **Webhook URL**: `https://your-app.vercel.app/api/webhooks/alchemy`
   - **Network**: Ethereum Mainnet (또는 원하는 네트워크)
   - **Addresses to track**: 모니터링할 지갑 주소 추가
   - **Activity types**: 
     - ✅ External transfers
     - ✅ Internal transfers
     - ✅ ERC-20 transfers
     - ✅ ERC-721 transfers
     - ✅ ERC-1155 transfers

5. "Create Webhook" 클릭

### Signing Key 복사

1. 생성된 Webhook 상세 페이지에서 **Signing Key** 복사
2. 환경 변수에 추가:

\`\`\`env
ALCHEMY_WEBHOOK_SIGNING_KEY=whsec_your_signing_key_here
\`\`\`

## 3. Webhook 테스트

### Alchemy 대시보드에서 테스트

1. Webhook 상세 페이지에서 "Test Webhook" 버튼 클릭
2. 테스트 이벤트가 전송됨
3. 응답 확인: `200 OK`

### 로컬에서 확인 (Ngrok 사용 시)

1. Ngrok 인스펙터 열기: `http://localhost:4040`
2. 수신된 요청 확인

### 로그 확인

\`\`\`bash
# Vercel 로그 확인
vercel logs

# 또는 v0 디버그 로그 확인
# 브라우저 콘솔에서 [v0] 로그 검색
\`\`\`

## 4. 데이터베이스 스키마

Webhook 이벤트를 저장하기 위한 Supabase 테이블:

\`\`\`sql
-- transactions 테이블
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hash TEXT NOT NULL UNIQUE,
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  value TEXT NOT NULL,
  asset TEXT,
  category TEXT,
  block_number TEXT,
  network TEXT,
  webhook_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- notifications 테이블
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_transactions_from ON transactions(from_address);
CREATE INDEX idx_transactions_to ON transactions(to_address);
CREATE INDEX idx_transactions_hash ON transactions(hash);
CREATE INDEX idx_notifications_user ON notifications(user_id);
\`\`\`

## 5. 사용 예시

### 사용자 지갑 모니터링 시작

\`\`\`typescript
// 사용자가 로그인하면 자동으로 지갑 주소를 Webhook에 추가
import { addAddressToWebhook } from '@/lib/alchemy/webhook-management'

await addAddressToWebhook(userWalletAddress)
\`\`\`

### 실시간 알림 수신

\`\`\`typescript
// 클라이언트에서 실시간 알림 구독
import { useEffect } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'

function NotificationListener() {
  useEffect(() => {
    const supabase = createBrowserClient()
    
    const channel = supabase
      .channel('notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      }, (payload) => {
        console.log('New notification:', payload.new)
        // 알림 표시
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])
}
\`\`\`

## 6. 보안 고려사항

- ✅ 서명 검증 필수 (HMAC SHA-256)
- ✅ IP 화이트리스트 (선택사항)
  - `54.236.136.17`
  - `34.237.24.169`
- ✅ HTTPS 필수
- ✅ Rate limiting 구현 권장
- ✅ 환경 변수로 Signing Key 관리

## 7. 문제 해결

### Webhook이 수신되지 않음

1. Webhook URL이 올바른지 확인
2. 서명 검증 로직 확인
3. Alchemy 대시보드에서 Webhook 상태 확인
4. 로그에서 에러 메시지 확인

### 서명 검증 실패

1. Signing Key가 올바른지 확인
2. 요청 본문을 raw string으로 읽었는지 확인
3. JSON 파싱 전에 서명 검증했는지 확인

### Trust Score가 업데이트되지 않음

1. 사용자 지갑 주소가 Webhook에 등록되었는지 확인
2. 데이터베이스 연결 확인
3. `updateUserTrustScore` 함수 로그 확인
