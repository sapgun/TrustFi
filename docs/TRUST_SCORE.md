# TrustFi Trust Score 시스템

## 개요

TrustFi Trust Score는 사용자의 온체인 신뢰도를 0-1000점 사이로 평가하는 종합 점수 시스템입니다.

## 점수 구성 (총 1000점)

### 1. 실명 인증 (0-300점)
- PASS 본인 인증 또는 KYC 완료
- 완료 시 300점 부여

### 2. 온체인 이력 (0-200점)
- 거래 활동 분석 (Alchemy Transfers API)
- 토큰 보유 다양성 (Alchemy Token API)
- NFT 보유 현황
- 거래 균형 (받은 거래 vs 보낸 거래)
- 계정 나이

### 3. 커뮤니티 참여 (0-100점)
- DAO 투표 참여
- 거버넌스 활동
- 커뮤니티 기여도

### 4. 기관 검증 (0-250점)
- 파트너 기관 인증 (최대 150점)
- Gitcoin Passport (최대 100점, 선택사항)
  - 환경 변수 설정 시 자동 활성화
  - `GITCOIN_SCORER_ID`, `GITCOIN_API_KEY`

### 5. 보안 행동 (0-50점)
- 안전한 거래 습관
- 보안 설정 활성화
- 지연 보호 사용

## Tier 시스템

- **Basic**: 0-249점
- **Silver**: 250-499점
- **Gold**: 500-749점
- **Platinum**: 750-1000점

## Gitcoin Passport 통합 (선택사항)

Gitcoin Passport는 선택적 기능입니다. 환경 변수가 설정되지 않아도 Trust Score 시스템은 정상 작동합니다.

### 활성화 방법

1. Gitcoin Passport Developer Portal에서 Scorer 생성
2. 환경 변수 추가:
   \`\`\`
   GITCOIN_SCORER_ID=your_scorer_id
   GITCOIN_API_KEY=your_api_key
   \`\`\`
3. 자동으로 활성화됨

### 비활성화 시

- 기관 검증 점수는 파트너 기관 인증만으로 계산됨
- 최대 150점 (Gitcoin 없이도 충분한 점수)
- 다른 모든 기능은 정상 작동
