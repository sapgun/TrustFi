// lib/trust-score/calculator.ts

import { calculateOnChainScore } from './onchain-analyzer';
import { calculateCommunityScore } from './community-analyzer';
import { calculateInstitutionalScore } from './institutional-verifier';
import { calculateSecurityScore, SecurityEvent } from './security-tracker';

// Define the UserMetadata interface to be used across the module
interface UserMetadata {
  institutionalVerification?: boolean;
  userId?: string;
  kycVerified?: boolean;
}

export interface TrustScoreBreakdown {
  identity: number;      // 0-300
  onchain: number;       // 0-200
  community: number;     // 0-100
  institutional: number; // 0-250
  security: number;      // 0-50
  total: number;         // 0-1000
}

// This is a mock function. In a real application, you would fetch this from your database.
async function getSecurityEvents(userId?: string): Promise<SecurityEvent[]> {
  if (!userId) return [];
  // Mock data for demonstration purposes
  return [
    { type: 'delay_accepted', timestamp: Date.now() - 10 * 24 * 60 * 60 * 1000, points: 5 },
    { type: 'firewall_block', timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, points: 3 },
  ];
}


export async function calculateTrustScore(
  address: string,
  userMetadata?: UserMetadata
): Promise<TrustScoreBreakdown> {

  // 병렬 실행으로 성능 최적화
  const [onchain, community, institutional] = await Promise.all([
    calculateOnChainScore(address),
    calculateCommunityScore(address),
    calculateInstitutionalScore(address, userMetadata),
  ]);

  // 실명 인증 (Privy/PASS 연동)
  const identity = userMetadata?.kycVerified ? 300 : 0;

  // 보안 행동 (자체 DB에서 조회)
  const securityEvents = await getSecurityEvents(userMetadata?.userId);
  const security = await calculateSecurityScore(userMetadata?.userId || '', securityEvents);

  const total = identity + onchain + community + institutional + security;

  return {
    identity,
    onchain,
    community,
    institutional,
    security,
    total: Math.min(total, 1000),
  };
}

// 캐싱으로 성능 최적화
const scoreCache = new Map<string, { score: TrustScoreBreakdown; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1시간

export async function getCachedTrustScore(
  address: string,
  userMetadata?: UserMetadata
): Promise<TrustScoreBreakdown> {
  const cached = scoreCache.get(address);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.score;
  }

  const score = await calculateTrustScore(address, userMetadata);
  scoreCache.set(address, { score, timestamp: Date.now() });

  return score;
}
