interface UserMetadata {
  institutionalVerification?: boolean;
  userId?: string;
  kycVerified?: boolean;
}

// 1. Gitcoin Passport 점수 조회
export async function getGitcoinPassportScore(address: string) {
  const response = await fetch(
    `https://api.scorer.gitcoin.co/registry/score/${process.env.GITCOIN_SCORER_ID}/${address}`,
    {
      headers: {
        'X-API-Key': process.env.GITCOIN_API_KEY!,
      },
    }
  );

  const data = await response.json();
  return data.score || 0;
}

// 2. 기관 검증 점수 계산
export async function calculateInstitutionalScore(
  address: string,
  userMetadata?: UserMetadata
): Promise<number> {
  let score = 0;

  // Gitcoin Passport (최대 100점)
  const passportScore = await getGitcoinPassportScore(address);
  if (passportScore >= 20) score += 100;
  else if (passportScore >= 15) score += 75;
  else if (passportScore >= 10) score += 50;

  // 파트너 기관 검증 (최대 150점)
  // 실제로는 자체 DB에서 조회
  if (userMetadata?.institutionalVerification) {
    score += 150;
  }

  return Math.min(score, 250);
}
