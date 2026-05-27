# Alchemy API 데모 스크립트

## 실행 방법

### 1. v0에서 직접 실행
v0 UI에서 `scripts/alchemy-demo.js` 파일 옆의 실행 버튼을 클릭하세요.

### 2. 로컬에서 실행 (다운로드 후)

\`\`\`bash
# 프로젝트 다운로드 후
cd scripts

# 환경 변수 설정 (선택사항)
export ALCHEMY_API_KEY="your-api-key-here"

# 스크립트 실행
node alchemy-demo.js
\`\`\`

## 조회하는 토큰
- **ETH** (Ethereum)
- **USDC** (USD Coin)
- **BONK** (Bonk)

## API 엔드포인트
\`\`\`
GET https://api.g.alchemy.com/prices/v1/tokens/by-symbol
\`\`\`

## 보안 주의사항
⚠️ API 키는 환경 변수로 관리하세요. 코드에 직접 하드코딩하지 마세요.

\`\`\`bash
# .env 파일에 추가
ALCHEMY_API_KEY=your-actual-api-key
