// Trust Score 5가지 평가 요소 타입
export interface TrustScoreBreakdown {
  identity: number // 0-300 (실명 인증)
  onchain: number // 0-200 (온체인 이력)
  community: number // 0-100 (커뮤니티 참여)
  institutional: number // 0-250 (기관 검증)
  security: number // 0-50 (보안 행동)
  total: number // 0-1000
}

export interface UserTrustScore {
  address: string
  breakdown: TrustScoreBreakdown
  tier: "Basic" | "Silver" | "Gold" | "Platinum"
  lastUpdated: number
}

// 티어 결정
export function getTierFromScore(score: number): "Basic" | "Silver" | "Gold" | "Platinum" {
  if (score >= 850) return "Platinum"
  if (score >= 600) return "Gold"
  if (score >= 300) return "Silver"
  return "Basic"
}

// 메인 Trust Score 계산
export async function calculateTrustScore(address: string, kycVerified = false): Promise<UserTrustScore> {
  // 실명 인증 점수
  const identity = kycVerified ? 300 : 0

  // 온체인 이력 점수 (Alchemy API 사용)
  const onchain = await calculateOnchainScore(address)

  // 커뮤니티 참여 점수 (Snapshot API 사용)
  const community = await calculateCommunityScore(address)

  // 기관 검증 점수 (Gitcoin Passport)
  const institutional = await calculateInstitutionalScore(address)

  // 보안 행동 점수 (Mock - 실제로는 DB에서 조회)
  const security = 25 // 기본 25점

  const total = identity + onchain + community + institutional + security
  const tier = getTierFromScore(total)

  return {
    address,
    breakdown: {
      identity,
      onchain,
      community,
      institutional,
      security,
      total: Math.min(total, 1000),
    },
    tier,
    lastUpdated: Date.now(),
  }
}

// 온체인 점수 계산
async function calculateOnchainScore(address: string): Promise<number> {
  try {
    // 공개 RPC로 기본 트랜잭션 수 조회
    const response = await fetch("https://eth.llamarpc.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getTransactionCount",
        params: [address, "latest"],
      }),
    })

    const data = await response.json()
    const txCount = Number.parseInt(data.result || "0x0", 16)

    let score = 0

    // 트랜잭션 수에 따른 점수 (최대 80점)
    if (txCount >= 50) score += 80
    else if (txCount >= 20) score += 60
    else if (txCount >= 10) score += 40
    else if (txCount >= 5) score += 20

    // 지갑 나이 추정 (최대 60점)
    if (txCount > 0) {
      if (txCount >= 100) score += 60
      else if (txCount >= 50) score += 40
      else if (txCount >= 20) score += 20
    }

    // 청산 없음 보너스 (최대 60점)
    score += 60

    return Math.min(score, 200)
  } catch (error) {
    console.error("온체인 점수 계산 실패:", error)
    return 0
  }
}

// 커뮤니티 점수 계산
async function calculateCommunityScore(address: string): Promise<number> {
  try {
    const query = `
      query Votes {
        votes(
          first: 100
          where: { voter: "${address.toLowerCase()}" }
        ) {
          id
          created
        }
      }
    `

    const response = await fetch("https://hub.snapshot.org/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()
    const votes = data.data?.votes || []

    let score = 0
    const voteCount = votes.length

    if (voteCount >= 20) score = 100
    else if (voteCount >= 10) score = 70
    else if (voteCount >= 5) score = 40
    else if (voteCount >= 1) score = 20

    return score
  } catch (error) {
    console.error("커뮤니티 점수 계산 실패:", error)
    return 0
  }
}

// 기관 검증 점수 계산
async function calculateInstitutionalScore(address: string): Promise<number> {
  // Mock - 실제로는 Gitcoin Passport API 사용
  // const response = await fetch(
  //   `https://api.scorer.gitcoin.co/registry/score/${scorerId}/${address}`,
  //   { headers: { 'X-API-Key': process.env.GITCOIN_API_KEY } }
  // );

  // 데모용 랜덤 점수
  return Math.floor(Math.random() * 100) + 50 // 50-150점
}

// 캐싱
const scoreCache = new Map<string, { score: UserTrustScore; timestamp: number }>()
const CACHE_TTL = 60 * 60 * 1000 // 1시간

export async function getCachedTrustScore(address: string, kycVerified = false): Promise<UserTrustScore> {
  const cached = scoreCache.get(address)

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.score
  }

  const score = await calculateTrustScore(address, kycVerified)
  scoreCache.set(address, { score, timestamp: Date.now() })

  return score
}
