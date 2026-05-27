interface UserMetadata {
  institutionalVerification?: boolean
  userId?: string
  kycVerified?: boolean
}

// 1. Gitcoin Passport 점수 조회
export async function getGitcoinPassportScore(address: string) {
  // Gitcoin Passport 없이 진행
  // 나중에 Scorer ID를 받으면 다시 활성화 가능
  console.log("[v0] Gitcoin Passport 비활성화됨 - 기본값 0 반환")
  return 0
}

// 2. 기관 검증 점수 계산
export async function calculateInstitutionalScore(address: string, userMetadata?: UserMetadata): Promise<number> {
  let score = 0

  // 환경 변수가 설정되면 자동으로 활성화됨
  if (process.env.GITCOIN_SCORER_ID && process.env.GITCOIN_API_KEY) {
    try {
      const passportScore = await getGitcoinPassportScore(address)
      if (passportScore >= 20) score += 100
      else if (passportScore >= 15) score += 75
      else if (passportScore >= 10) score += 50
    } catch (error) {
      console.error("[v0] Gitcoin Passport 조회 실패:", error)
      // 에러 발생 시 계속 진행
    }
  }

  // 파트너 기관 검증 (최대 150점)
  // 실제로는 자체 DB에서 조회
  if (userMetadata?.institutionalVerification) {
    score += 150
  }

  return Math.min(score, 250)
}
