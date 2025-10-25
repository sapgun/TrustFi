// 보안 행동 추적 (자체 DB 또는 온체인)
export interface SecurityEvent {
  type: 'delay_accepted' | 'panic_revoke' | 'firewall_block' | 'nl_review';
  timestamp: number;
  points: number;
}

export async function calculateSecurityScore(
  userId: string,
  events: SecurityEvent[]
): Promise<number> {
  let score = 0;

  // 최근 30일 이벤트만 계산
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentEvents = events.filter(e => e.timestamp > thirtyDaysAgo);

  // Delay Protection 수락 (각 5점, 최대 20점)
  const delayAccepted = recentEvents.filter(e => e.type === 'delay_accepted');
  score += Math.min(delayAccepted.length * 5, 20);

  // Firewall 차단 확인 (각 3점, 최대 15점)
  const firewallBlocks = recentEvents.filter(e => e.type === 'firewall_block');
  score += Math.min(firewallBlocks.length * 3, 15);

  // Panic Revoke 미사용 보너스 (15점)
  const panicRevokes = recentEvents.filter(e => e.type === 'panic_revoke');
  if (panicRevokes.length === 0 && recentEvents.length > 0) {
    score += 15;
  }

  return Math.min(score, 50);
}
