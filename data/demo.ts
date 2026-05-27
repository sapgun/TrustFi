// @/data/demo.ts

/**
 * Security Layer Status
 * - pass: The check was successful without any issues.
 * - warn: Potential risks detected, user should proceed with caution.
 * - fail: High-risk threat detected, transaction is blocked.
 * - info: Informational message for the user.
 */
export type LayerStatus = 'pass' | 'warn' | 'fail' | 'info';

/**
 * Defines the structure for a single security layer's check result.
 */
export interface SecurityLayerResult {
  id: string;
  name: 'NL Review' | 'Transaction Firewall' | 'Delay Protection' | 'Panic Revoke' | 'AI Risk Guard' | 'Policy Engine';
  status: LayerStatus;
  message: string;
  details: string;
}

/**
 * Defines the structure for a single transaction scenario.
 */
export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  layers: SecurityLayerResult[];
}

// --- Demo Data ---

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'safe-transfer',
    name: '안전한 토큰 전송',
    description: '검증된 주소로 소량의 ETH를 전송합니다. 가장 일반적이고 안전한 거래입니다.',
    layers: [
      { id: 'nl-review', name: 'NL Review', status: 'pass', message: '0.05 ETH 전송', details: '이 거래는 검증된 주소(0x123...abc)로 0.05 ETH를 전송합니다. 특이사항이 발견되지 않았습니다.' },
      { id: 'firewall', name: 'Transaction Firewall', status: 'pass', message: '안전한 주소', details: '수신 주소는 알려진 피싱 또는 사기 주소 목록에 포함되어 있지 않습니다.' },
      { id: 'delay', name: 'Delay Protection', status: 'pass', message: '위험도 낮음', details: '거래의 위험도가 낮아 즉시 실행이 가능합니다.' },
      { id: 'panic', name: 'Panic Revoke', status: 'info', message: '30초 내 취소 가능', details: '거래가 실행된 후 30초 안에 긴급 취소할 수 있는 옵션이 제공됩니다.' },
      { id: 'ai-guard', name: 'AI Risk Guard', status: 'pass', message: '위험도: 12/100', details: 'AI 분석 결과, 이 거래는 매우 낮은 위험도를 가집니다.' },
      { id: 'policy', name: 'Policy Engine', status: 'pass', message: '정책 준수', details: '설정된 개인 보안 정책(예: 일일 전송 한도)을 위반하지 않습니다.' },
    ],
  },
  {
    id: 'stable-defi',
    name: '안정적인 DeFi 예치',
    description: 'Aave, Compound와 같은 검증된 DeFi 프로토콜에 자산을 예치합니다.',
    layers: [
      { id: 'nl-review', name: 'NL Review', status: 'pass', message: 'Aave에 100 USDC 예치', details: '이 거래는 Aave v3 프로토콜에 100 USDC를 예치하는 것입니다. 일반적인 DeFi 활동입니다.' },
      { id: 'firewall', name: 'Transaction Firewall', status: 'pass', message: '검증된 프로토콜', details: 'Aave는 널리 사용되고 감사받은 안전한 프로토콜입니다.' },
      { id: 'delay', name: 'Delay Protection', status: 'pass', message: '위험도 낮음', details: '거래의 위험도가 낮아 즉시 실행이 가능합니다.' },
      { id: 'panic', name: 'Panic Revoke', status: 'info', message: '30초 내 취소 가능', details: '거래가 실행된 후 30초 안에 긴급 취소할 수 있는 옵션이 제공됩니다.' },
      { id: 'ai-guard', name: 'AI Risk Guard', status: 'pass', message: '위험도: 18/100', details: 'AI 분석 결과, 이 거래는 매우 낮은 위험도를 가집니다.' },
      { id: 'policy', name: 'Policy Engine', status: 'pass', message: '정책 준수', details: '설정된 개인 보안 정책을 위반하지 않습니다.' },
    ],
  },
  {
    id: 'new-token',
    name: '미확인 신규 토큰',
    description: '최근에 생성되어 아직 검증되지 않은 토큰 컨트랙트와 상호작용합니다.',
    layers: [
      { id: 'nl-review', name: 'NL Review', status: 'warn', message: '미검증 토큰 전송', details: '이 거래는 생성된 지 7일 미만인 미확인 토큰(0xabc...123)과 상호작용합니다. 주의가 필요합니다.' },
      { id: 'firewall', name: 'Transaction Firewall', status: 'warn', message: '주의 필요한 주소', details: '이 주소는 블랙리스트에 없지만, 충분한 거래 기록이 없어 잠재적 위험이 있습니다.' },
      { id: 'delay', name: 'Delay Protection', status: 'warn', message: '5초 지연 실행', details: '거래의 잠재적 위험으로 인해, 실행 전 5초의 숙려 시간이 적용됩니다.' },
      { id: 'panic', name: 'Panic Revoke', status: 'info', message: '30초 내 취소 가능', details: '거래가 실행된 후 30초 안에 긴급 취소할 수 있는 옵션이 제공됩니다.' },
      { id: 'ai-guard', name: 'AI Risk Guard', status: 'warn', message: '위험도: 75/100', details: 'AI 분석 결과, 컨트랙트의 투명성 부족 및 짧은 생성 이력으로 인해 높은 위험도가 산출되었습니다.' },
      { id: 'policy', name: 'Policy Engine', status: 'warn', message: '정책: 미승인 토큰', details: '개인 보안 정책에 따라, 승인되지 않은 신규 토큰과의 거래 시 경고가 발생합니다.' },
    ],
  },
  {
    id: 'phishing-contract',
    name: '피싱 의심 컨트랙트',
    description: '최근 피싱 사례로 보고된 악성 주소로 거래를 시도합니다.',
    layers: [
      { id: 'nl-review', name: 'NL Review', status: 'warn', message: '악성 주소로 0.1 ETH 전송', details: '이 거래는 알려진 피싱 주소(0xdef...456)로 0.1 ETH를 전송하려고 시도합니다.' },
      { id: 'firewall', name: 'Transaction Firewall', status: 'fail', message: '거래 차단됨', details: '이 주소는 TrustFi의 피싱 및 사기 데이터베이스에 등록되어 있어 거래가 즉시 차단되었습니다.' },
      { id: 'delay', name: 'Delay Protection', status: 'fail', message: '실행 불가', details: 'Firewall에 의해 차단되어 거래를 진행할 수 없습니다.' },
      { id: 'panic', name: 'Panic Revoke', status: 'fail', message: '실행 불가', details: 'Firewall에 의해 차단되어 거래를 진행할 수 없습니다.' },
      { id: 'ai-guard', name: 'AI Risk Guard', status: 'fail', message: '위험도: 99/100', details: 'AI 분석 결과, 알려진 악성 패턴과 일치하여 최고 수준의 위험도가 산출되었습니다.' },
      { id: 'policy', name: 'Policy Engine', status: 'fail', message: '정책: 차단된 주소', details: '이 주소는 차단 목록에 포함되어 있어 정책에 따라 거래가 금지됩니다.' },
    ],
  },
  {
    id: 'large-drain',
    name: '대량 송금 / 드레인',
    description: '비정상적으로 큰 금액의 자산을 한 번에 외부 주소로 전송합니다.',
    layers: [
      { id: 'nl-review', name: 'NL Review', status: 'warn', message: '대량의 자산(10 ETH) 전송', details: '이 거래는 단일 거래로 많은 양의 자산(10 ETH)을 외부 주소로 전송합니다.' },
      { id: 'firewall', name: 'Transaction Firewall', status: 'pass', message: '안전한 주소', details: '수신 주소 자체는 블랙리스트에 등록되어 있지 않습니다.' },
      { id: 'delay', name: 'Delay Protection', status: 'warn', message: '10초 지연 실행', details: '대량의 자산 이동으로 인해, 자금 탈취(Drain) 위험 방지를 위해 10초의 숙려 시간이 적용됩니다.' },
      { id: 'panic', name: 'Panic Revoke', status: 'info', message: '30초 내 취소 가능', details: '거래가 실행된 후 30초 안에 긴급 취소할 수 있는 옵션이 제공됩니다.' },
      { id: 'ai-guard', name: 'AI Risk Guard', status: 'warn', message: '위험도: 88/100', details: 'AI 분석 결과, 일반적인 거래 패턴을 벗어난 대규모 자산 이동으로 인해 높은 위험도가 산출되었습니다.' },
      { id: 'policy', name: 'Policy Engine', status: 'warn', message: '정책: 일일 한도 초과', details: '개인 보안 정책에 설정된 일일 전송 한도(5 ETH)를 초과하는 거래입니다.' },
    ],
  },
  {
    id: 'dao-vote',
    name: 'DAO 투표 및 거버넌스',
    description: '주요 거버넌스 제안에 대해 투표하거나 상호작용합니다.',
    layers: [
      { id: 'nl-review', name: 'NL Review', status: 'info', message: 'DAO 제안 #123에 투표', details: '이 거래는 Uniswap DAO의 제안 #123 "커뮤니티 재무 기금 확장"에 "찬성"으로 투표하는 것입니다.' },
      { id: 'firewall', name: 'Transaction Firewall', status: 'pass', message: '검증된 거버넌스', details: 'Uniswap 거버넌스 컨트랙트는 검증되었으며 안전합니다.' },
      { id: 'delay', name: 'Delay Protection', status: 'pass', message: '위험도 낮음', details: '일반적인 거버넌스 활동으로, 즉시 실행이 가능합니다.' },
      { id: 'panic', name: 'Panic Revoke', status: 'info', message: '30초 내 취소 가능', details: '거래가 실행된 후 30초 안에 긴급 취소할 수 있는 옵션이 제공됩니다.' },
      { id: 'ai-guard', name: 'AI Risk Guard', status: 'info', message: '위험도: 35/100', details: 'AI 분석 결과, 제안 내용의 복잡성을 고려하여 보통 수준의 주의가 필요합니다. 제안 내용을 직접 확인하는 것을 권장합니다.' },
      { id: 'policy', name: 'Policy Engine', status: 'pass', message: '정책 준수', details: '거버넌스 관련 활동은 개인 보안 정책에 위배되지 않습니다.' },
    ],
  },
];
