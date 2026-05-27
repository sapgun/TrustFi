/**
 * Trust Score Calculator using Alchemy APIs
 *
 * Alchemy의 Transfers API와 Token API를 사용하여
 * 사용자의 Trust Score를 계산합니다.
 */

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "m0EggN5pdIMlIgz2qsZjv"
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

/**
 * 거래 내역 조회
 */
async function getTransfers(address, direction = "to", maxCount = 100) {
  const params = {
    fromBlock: "0x0",
    toBlock: "latest",
    withMetadata: true,
    excludeZeroValue: true,
    maxCount: `0x${maxCount.toString(16)}`,
    category: ["external", "erc20", "erc721"],
  }

  if (direction === "to") {
    params.toAddress = address
  } else {
    params.fromAddress = address
  }

  const response = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getAssetTransfers",
      params: [params],
    }),
  })

  const data = await response.json()
  return data.result?.transfers || []
}

/**
 * 토큰 잔액 조회
 */
async function getTokenBalances(address) {
  const response = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [address, "erc20"],
    }),
  })

  const data = await response.json()
  return data.result?.tokenBalances || []
}

/**
 * Trust Score 계산
 */
function calculateTrustScore(incoming, outgoing, tokenBalances) {
  let score = 0
  const factors = {}

  // 1. 거래 활동 점수 (최대 30점)
  const totalTransactions = incoming.length + outgoing.length
  factors.transactionActivity = Math.min(totalTransactions * 0.3, 30)
  score += factors.transactionActivity

  // 2. 거래 다양성 점수 (최대 20점)
  const uniqueAddresses = new Set([...incoming.map((t) => t.from), ...outgoing.map((t) => t.to)]).size
  factors.transactionDiversity = Math.min(uniqueAddresses * 0.5, 20)
  score += factors.transactionDiversity

  // 3. 토큰 보유 점수 (최대 25점)
  const nonZeroBalances = tokenBalances.filter((t) => t.tokenBalance && t.tokenBalance !== "0x0").length
  factors.tokenHoldings = Math.min(nonZeroBalances * 2.5, 25)
  score += factors.tokenHoldings

  // 4. 수신/발신 균형 점수 (최대 15점)
  const ratio = outgoing.length > 0 ? incoming.length / outgoing.length : incoming.length
  const balanceScore = ratio >= 0.5 && ratio <= 2 ? 15 : 10
  factors.transactionBalance = balanceScore
  score += balanceScore

  // 5. NFT 보유 점수 (최대 10점)
  const nftTransfers = [...incoming, ...outgoing].filter((t) => t.category === "erc721").length
  factors.nftActivity = Math.min(nftTransfers * 2, 10)
  score += factors.nftActivity

  return {
    totalScore: Math.round(score),
    maxScore: 100,
    factors,
    grade: getGrade(score),
  }
}

/**
 * 등급 계산
 */
function getGrade(score) {
  if (score >= 80) return "Platinum"
  if (score >= 60) return "Gold"
  if (score >= 40) return "Silver"
  return "Bronze"
}

/**
 * 메인 실행
 */
async function main() {
  const testAddress = "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1"

  console.log("🎯 Trust Score Calculator\n")
  console.log(`주소: ${testAddress}\n`)
  console.log("데이터 수집 중...\n")

  try {
    // 데이터 수집
    const [incoming, outgoing, tokenBalances] = await Promise.all([
      getTransfers(testAddress, "to", 100),
      getTransfers(testAddress, "from", 100),
      getTokenBalances(testAddress),
    ])

    console.log("📊 수집된 데이터:")
    console.log(`   수신 거래: ${incoming.length}개`)
    console.log(`   발신 거래: ${outgoing.length}개`)
    console.log(`   토큰 보유: ${tokenBalances.length}개`)

    // Trust Score 계산
    const result = calculateTrustScore(incoming, outgoing, tokenBalances)

    console.log("\n\n🏆 Trust Score 결과:")
    console.log(`   총점: ${result.totalScore}/${result.maxScore}`)
    console.log(`   등급: ${result.grade}`)

    console.log("\n📈 점수 구성:")
    console.log(`   거래 활동: +${result.factors.transactionActivity.toFixed(1)}점`)
    console.log(`   거래 다양성: +${result.factors.transactionDiversity.toFixed(1)}점`)
    console.log(`   토큰 보유: +${result.factors.tokenHoldings.toFixed(1)}점`)
    console.log(`   거래 균형: +${result.factors.transactionBalance.toFixed(1)}점`)
    console.log(`   NFT 활동: +${result.factors.nftActivity.toFixed(1)}점`)
  } catch (error) {
    console.error("❌ 에러 발생:", error.message)
  }
}

main()
