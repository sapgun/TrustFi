-- 거래 내역 테이블 생성
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hash TEXT UNIQUE NOT NULL,
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  value TEXT NOT NULL,
  asset TEXT,
  category TEXT,
  block_number TEXT,
  network TEXT NOT NULL,
  webhook_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 인덱스
  INDEX idx_transactions_hash (hash),
  INDEX idx_transactions_from_address (from_address),
  INDEX idx_transactions_to_address (to_address),
  INDEX idx_transactions_created_at (created_at DESC)
);

-- RLS (Row Level Security) 활성화
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 거래 내역을 볼 수 있음 (공개 블록체인 데이터)
CREATE POLICY "Anyone can view transactions"
  ON transactions FOR SELECT
  USING (TRUE);

COMMENT ON TABLE transactions IS '블록체인 거래 내역 테이블';
