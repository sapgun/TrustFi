# 실시간 위험 알림 시스템

TrustFi의 실시간 위험 알림 시스템은 Alchemy Webhook과 Supabase Realtime을 활용하여 사용자의 지갑 활동을 모니터링하고 의심스러운 거래를 즉시 감지합니다.

## 시스템 아키텍처

\`\`\`
Blockchain → Alchemy Webhook → Next.js API → Supabase → Realtime → UI
\`\`\`

### 1. Alchemy Webhook
- 사용자 지갑 주소를 모니터링
- 거래 발생 시 즉시 알림
- `/api/webhooks/alchemy` 엔드포인트로 이벤트 전송

### 2. Webhook 처리
- 거래 내역을 `transactions` 테이블에 저장
- 의심스러운 활동 감지
- `notifications` 테이블에 알림 생성

### 3. Supabase Realtime
- PostgreSQL의 변경 사항을 실시간으로 구독
- 새 알림이 생성되면 즉시 클라이언트에 전송

### 4. UI 업데이트
- `NotificationBell` 컴포넌트가 실시간으로 알림 수신
- 읽지 않은 알림 개수 표시
- 알림 클릭 시 상세 내용 표시

## 데이터베이스 스키마

### notifications 테이블
\`\`\`sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE
);
\`\`\`

### transactions 테이블
\`\`\`sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  hash TEXT UNIQUE NOT NULL,
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  value TEXT NOT NULL,
  asset TEXT,
  category TEXT,
  block_number TEXT,
  network TEXT NOT NULL,
  webhook_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE
);
\`\`\`

## 알림 타입

### 1. security_alert (보안 알림)
의심스러운 거래 감지 시 발송
- 매우 큰 금액 전송
- 알려진 위험 주소로의 전송
- 비정상적인 거래 패턴

### 2. transaction (거래 알림)
일반 거래 완료 시 발송
- 토큰 수신
- 토큰 전송
- NFT 거래

### 3. trust_score (Trust Score 알림)
Trust Score 변경 시 발송
- 점수 상승
- 점수 하락
- 새로운 등급 달성

### 4. system (시스템 알림)
시스템 공지사항
- 새로운 기능 출시
- 보안 업데이트
- 서비스 점검

## 사용 방법

### 1. Alchemy Webhook 설정
1. Alchemy 대시보드에서 "Address Activity" Webhook 생성
2. 모니터링할 지갑 주소 추가
3. Webhook URL: `https://your-domain.vercel.app/api/webhooks/alchemy`

### 2. 데이터베이스 설정
\`\`\`bash
# SQL 스크립트 실행
psql -h your-db-host -U your-user -d your-db -f scripts/create-notifications-table.sql
psql -h your-db-host -U your-user -d your-db -f scripts/create-transactions-table.sql
\`\`\`

### 3. 환경 변수 설정
\`\`\`env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ALCHEMY_WEBHOOK_SIGNING_KEY=your-signing-key
\`\`\`

### 4. UI 통합
\`\`\`tsx
import { NotificationBell } from "@/components/notifications/NotificationBell"

// 네비게이션에 추가
<NotificationBell />
\`\`\`

## 보안 고려사항

### 1. Webhook 서명 검증
모든 Alchemy Webhook 요청은 HMAC SHA-256 서명으로 검증됩니다.

### 2. Row Level Security (RLS)
Supabase RLS 정책으로 사용자는 자신의 알림만 볼 수 있습니다.

### 3. 환경 변수 보호
민감한 API 키는 서버 사이드에서만 사용됩니다.

## 테스트

### 1. 로컬 테스트
\`\`\`bash
# ngrok으로 로컬 서버 노출
ngrok http 3000

# Alchemy Webhook URL에 ngrok URL 설정
https://your-ngrok-url.ngrok.io/api/webhooks/alchemy
\`\`\`

### 2. 테스트 거래 전송
테스트넷에서 소액 거래를 전송하여 알림이 제대로 작동하는지 확인합니다.

### 3. 실시간 구독 확인
브라우저 콘솔에서 Supabase Realtime 연결 상태를 확인합니다.

## 문제 해결

### 알림이 표시되지 않는 경우
1. Supabase Realtime이 활성화되어 있는지 확인
2. 브라우저 콘솔에서 에러 메시지 확인
3. `notifications` 테이블에 데이터가 있는지 확인

### Webhook이 작동하지 않는 경우
1. Alchemy 대시보드에서 Webhook 상태 확인
2. 서버 로그에서 에러 메시지 확인
3. Webhook 서명 검증이 올바른지 확인

## 향후 개선 사항

1. 푸시 알림 지원 (Web Push API)
2. 이메일 알림
3. 텔레그램 봇 통합
4. 알림 필터링 및 설정
5. 알림 우선순위 시스템
