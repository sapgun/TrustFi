-- Trust NFT 테이블 생성
CREATE TABLE IF NOT EXISTS trust_nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_address TEXT NOT NULL UNIQUE,
  token_id TEXT NOT NULL UNIQUE,
  trust_score INTEGER NOT NULL CHECK (trust_score >= 0 AND trust_score <= 100),
  tier TEXT NOT NULL CHECK (tier IN ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM')),
  minted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_trust_nfts_user_address ON trust_nfts(user_address);
CREATE INDEX IF NOT EXISTS idx_trust_nfts_tier ON trust_nfts(tier);
CREATE INDEX IF NOT EXISTS idx_trust_nfts_trust_score ON trust_nfts(trust_score DESC);

-- RLS 활성화
ALTER TABLE trust_nfts ENABLE ROW LEVEL SECURITY;

-- 정책: 모든 사용자가 읽기 가능
CREATE POLICY "Anyone can view trust NFTs"
  ON trust_nfts
  FOR SELECT
  USING (true);

-- 정책: 서비스 역할만 삽입/업데이트 가능
CREATE POLICY "Service role can insert trust NFTs"
  ON trust_nfts
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update trust NFTs"
  ON trust_nfts
  FOR UPDATE
  USING (auth.role() = 'service_role');
