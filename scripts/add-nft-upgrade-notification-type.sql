-- NFT 업그레이드 알림 타입 추가
-- notifications 테이블의 type 컬럼에 'nft_upgrade_available' 타입 추가

-- 기존 notifications 테이블이 있다면 이 스크립트는 필요 없습니다
-- type 컬럼이 text 타입이므로 자동으로 지원됩니다

-- 알림 타입 확인용 주석:
-- - security_alert: 보안 경고
-- - transaction_complete: 거래 완료
-- - nft_upgrade_available: NFT 업그레이드 가능
-- - trust_score_updated: Trust Score 업데이트
