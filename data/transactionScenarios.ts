export interface SecurityLayer {
  id: string;
  name: string;
  icon: string;
  status: 'pass' | 'warning' | 'blocked';
  message: string;
  action?: string;
}

export interface TransactionScenario {
  id: string;
  name: string;
  description: string;
  to: string;
  value: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  nlReview: string;
  securityLayers: SecurityLayer[];
  counterpartyTrustScore?: number;
  counterpartyTier?: string;
}

export const transactionScenarios: TransactionScenario[] = [
  {
    id: 'safe-transfer',
    name: '안전한 전송',
    description: 'Trust Score가 높은 검증된 지갑으로 소액 전송',
    to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    value: '0.001',
    riskLevel: 'low',
    riskScore: 15,
    nlReview: '검증된 지갑(Trust Score: 850, Gold 티어)으로 0.001 ETH를 전송합니다. 이 거래는 안전합니다.',
    counterpartyTrustScore: 850,
    counterpartyTier: 'Gold',
    securityLayers: [
      {
        id: 'nl-review',
        name: 'Natural Language Review',
        icon: '📖',
        status: 'pass',
        message: '거래 내용이 명확하고 안전합니다',
      },
      {
        id: 'firewall',
        name: 'Transaction Firewall',
        icon: '🔥',
        status: 'pass',
        message: '알려진 위험 주소가 아닙니다',
      },
      {
        id: 'delay',
        name: 'Delay Protection',
        icon: '⏱️',
        status: 'pass',
        message: '저위험 거래 - 지연 없음',
      },
      {
        id: 'panic-revoke',
        name: 'Panic Revoke',
        icon: '🚨',
        status: 'pass',
        message: '서명 후 30초 내 취소 가능',
      },
      {
        id: 'ai-risk',
        name: 'AI Risk Guard',
        icon: '🤖',
        status: 'pass',
        message: `위험도: ${15}/100 (매우 낮음)`,
      },
      {
        id: 'policy',
        name: 'Policy Engine',
        icon: '⚙️',
        status: 'pass',
        message: '사용자 정책 준수',
      },
    ],
  },
  {
    id: 'risky-swap',
    name: '위험한 스왑',
    description: '의심스러운 토큰 컨트랙트와 상호작용',
    to: '0x1234567890123456789012345678901234567890',
    value: '0.5',
    riskLevel: 'high',
    riskScore: 85,
    nlReview: '⚠️ 경고: 알려지지 않은 토큰 컨트랙트로 0.5 ETH를 전송하려고 합니다. 이 컨트랙트는 최근 의심스러운 활동이 보고되었습니다.',
    securityLayers: [
      {
        id: 'nl-review',
        name: 'Natural Language Review',
        icon: '📖',
        status: 'warning',
        message: '⚠️ 알려지지 않은 컨트랙트 감지',
      },
      {
        id: 'firewall',
        name: 'Transaction Firewall',
        icon: '🔥',
        status: 'blocked',
        message: '🛑 피싱 의심 주소로 차단됨',
        action: 'BLOCKED',
      },
      {
        id: 'delay',
        name: 'Delay Protection',
        icon: '⏱️',
        status: 'warning',
        message: '고위험 거래 - 10초 대기 필요',
      },
      {
        id: 'panic-revoke',
        name: 'Panic Revoke',
        icon: '🚨',
        status: 'warning',
        message: '서명 후 30초 내 긴급 취소 가능',
      },
      {
        id: 'ai-risk',
        name: 'AI Risk Guard',
        icon: '🤖',
        status: 'blocked',
        message: `위험도: ${85}/100 (매우 높음) - 차단 권장`,
      },
      {
        id: 'policy',
        name: 'Policy Engine',
        icon: '⚙️',
        status: 'warning',
        message: '일일 한도 초과 위험',
      },
    ],
  },
  {
    id: 'medium-defi',
    name: '중간 위험 DeFi',
    description: '알려진 DeFi 프로토콜에서 예치',
    to: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
    value: '0.1',
    riskLevel: 'medium',
    riskScore: 45,
    nlReview: 'Aave V2 프로토콜에 0.1 ETH를 예치합니다. 알려진 프로토콜이지만 스마트 컨트랙트 위험은 항상 존재합니다.',
    securityLayers: [
      {
        id: 'nl-review',
        name: 'Natural Language Review',
        icon: '📖',
        status: 'pass',
        message: '알려진 DeFi 프로토콜 (Aave V2)',
      },
      {
        id: 'firewall',
        name: 'Transaction Firewall',
        icon: '🔥',
        status: 'pass',
        message: '검증된 컨트랙트 주소',
      },
      {
        id: 'delay',
        name: 'Delay Protection',
        icon: '⏱️',
        status: 'warning',
        message: '중위험 거래 - 5초 대기',
      },
      {
        id: 'panic-revoke',
        name: 'Panic Revoke',
        icon: '🚨',
        status: 'pass',
        message: '서명 후 30초 내 취소 가능',
      },
      {
        id: 'ai-risk',
        name: 'AI Risk Guard',
        icon: '🤖',
        status: 'warning',
        message: `위험도: ${45}/100 (중간) - 주의 필요`,
      },
      {
        id: 'policy',
        name: 'Policy Engine',
        icon: '⚙️',
        status: 'pass',
        message: '사용자 정책 준수',
      },
    ],
  },
];
