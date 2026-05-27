# Trust NFT 업그레이드 플로우

## 개요
Trust Score가 상승하면 자동으로 NFT 업그레이드 가능 여부를 확인하고, 사용자에게 알림을 발송합니다.

## 플로우

### 1. Trust Score 자동 업데이트
- 거래 완료 시 Alchemy Webhook이 트리거됨
- `webhook-handler.ts`의 `updateUserTrustScore()` 함수 실행
- Trust Score 재계산 및 DB 업데이트

### 2. NFT 업그레이드 가능 여부 확인
- `canUpgradeNFT()` 함수로 현재 NFT 티어와 새로운 점수 비교
- 티어가 상승했는지 확인:
  - BRONZE (0-39) → SILVER (40-59)
  - SILVER (40-59) → GOLD (60-79)
  - GOLD (60-79) → PLATINUM (80-100)

### 3. 알림 발송
- 업그레이드 가능하면 `sendNFTUpgradeNotification()` 실행
- Supabase `notifications` 테이블에 알림 저장
- 중복 알림 방지 (읽지 않은 같은 알림이 있으면 생성 안 함)

### 4. 사용자 액션
- 알림 벨 아이콘에 빨간 점 표시
- 알림 클릭 시 프로필 페이지로 이동
- "NFT 업그레이드" 버튼 클릭
- NFT 티어 업그레이드 완료

## 알림 타입

### nft_upgrade_available
\`\`\`json
{
  "type": "nft_upgrade_available",
  "title": "Trust NFT 업그레이드 가능",
  "message": "Trust Score가 65점으로 상승했습니다! 프로필 페이지에서 NFT를 업그레이드하세요.",
  "data": {
    "new_score": 65
  }
}
\`\`\`

## 사용자 경험

1. 사용자가 안전한 거래를 완료
2. Trust Score 자동 상승
3. 알림 벨에 빨간 점 표시
4. 알림 확인: "Trust NFT 업그레이드 가능"
5. 프로필 페이지 이동
6. "NFT 업그레이드" 버튼 클릭
7. 새로운 티어 NFT 획득

## 장점

- **자동화**: Trust Score는 자동으로 업데이트
- **사용자 제어**: NFT 발급/업그레이드는 사용자가 직접 결정
- **명확한 피드백**: 알림으로 업그레이드 가능 시점을 명확히 알림
- **중복 방지**: 같은 알림을 여러 번 받지 않음
