# Trust Score NFT 시스템

## 개요

TrustFi의 Trust Score NFT는 사용자의 신뢰도를 블록체인에 기록하고, 거래 시 상대방에게 신뢰도를 표시하는 시스템입니다.

## 주요 기능

### 1. NFT 민팅

**조건:**
- Trust Score 20 이상
- 지갑 연결 필수
- 사용자당 1개의 NFT만 발급 가능

**티어 시스템:**
- **BRONZE** (20-39점): 기본 티어
- **SILVER** (40-59점): 중급 티어
- **GOLD** (60-79점): 고급 티어
- **PLATINUM** (80-100점): 최고 티어

### 2. 자동 업데이트

Trust Score가 변경되면 NFT의 티어와 점수가 자동으로 업데이트됩니다.

**업데이트 시점:**
- 거래 완료 후
- Trust Score 재계산 시
- 보안 이벤트 발생 시

### 3. 거래 시 티어 표시

**송금 페이지:**
- 수신자 주소 입력 시 자동으로 Trust NFT 조회
- 수신자의 티어와 점수를 배지로 표시
- NFT가 없는 경우 경고 메시지 표시

**혜택:**
- 신뢰할 수 있는 상대방 확인
- 사기 방지
- 안전한 거래 환경

### 4. Soulbound NFT

Trust Score NFT는 **Soulbound** 토큰으로 전송이 불가능합니다.

**이유:**
- 개인의 신뢰도는 양도할 수 없음
- NFT 거래 방지
- 신뢰도 조작 방지

## 데이터베이스 스키마

\`\`\`sql
CREATE TABLE trust_nfts (
  id UUID PRIMARY KEY,
  user_address TEXT UNIQUE NOT NULL,
  token_id TEXT UNIQUE NOT NULL,
  trust_score INTEGER NOT NULL,
  tier TEXT NOT NULL,
  minted_at TIMESTAMPTZ NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL
);
\`\`\`

## API

### mintTrustNFT(address, trustScore)

Trust Score NFT를 발급합니다.

**Parameters:**
- `address`: 사용자 지갑 주소
- `trustScore`: 현재 Trust Score (20-100)

**Returns:**
- `TrustNFTData` 또는 `null`

### updateTrustNFT(address, newScore)

기존 NFT의 점수와 티어를 업데이트합니다.

**Parameters:**
- `address`: 사용자 지갑 주소
- `newScore`: 새로운 Trust Score

**Returns:**
- `boolean` (성공 여부)

### getTrustNFT(address)

사용자의 Trust NFT 정보를 조회합니다.

**Parameters:**
- `address`: 사용자 지갑 주소

**Returns:**
- `TrustNFTData` 또는 `null`

## 사용 예시

### 1. NFT 발급

\`\`\`typescript
import { mintTrustNFT } from "@/lib/nft/trust-nft"

const nft = await mintTrustNFT(userAddress, 45)
// { tokenId: "...", trustScore: 45, tier: "SILVER", ... }
\`\`\`

### 2. 거래 시 상대방 확인

\`\`\`typescript
import { getTrustNFT } from "@/lib/nft/trust-nft"

const recipientNFT = await getTrustNFT(recipientAddress)
if (recipientNFT) {
  console.log(`수신자 티어: ${recipientNFT.tier}`)
  console.log(`수신자 점수: ${recipientNFT.trustScore}`)
}
\`\`\`

### 3. 점수 업데이트

\`\`\`typescript
import { updateTrustNFT } from "@/lib/nft/trust-nft"

await updateTrustNFT(userAddress, 65)
// 티어가 SILVER에서 GOLD로 자동 업그레이드
\`\`\`

## 스마트 컨트랙트 (향후 구현)

현재는 Supabase 데이터베이스를 사용하지만, 향후 실제 온체인 NFT로 마이그레이션할 수 있습니다.

**컨트랙트 파일:** `contracts/TrustScoreNFT.sol`

**주요 기능:**
- ERC-721 기반
- Soulbound (전송 불가)
- 티어 자동 계산
- 메타데이터 URI 지원

## 보안 고려사항

1. **RLS (Row Level Security)**: Supabase에서 읽기는 모두 허용, 쓰기는 서비스 역할만 가능
2. **서버 액션**: 모든 NFT 관련 작업은 서버 사이드에서만 실행
3. **검증**: Trust Score 20 미만은 NFT 발급 불가
4. **중복 방지**: 사용자당 1개의 NFT만 발급

## 다음 단계

1. 실제 온체인 NFT 배포
2. NFT 메타데이터 이미지 생성
3. OpenSea 등 마켓플레이스 연동 (조회만 가능)
4. 티어별 추가 혜택 구현
