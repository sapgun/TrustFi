"use server"

/**
 * Alchemy Transaction Simulation API Demo
 *
 * 트랜잭션을 실행하기 전에 자산 변경 사항을 시뮬레이션합니다.
 * TrustFi의 보안 OS (6-Layer Security)의 핵심 기능입니다.
 */

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "m0EggN5pdIMlIgz2qsZjv"
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

/**
 * 트랜잭션 시뮬레이션 실행
 */
async function simulateTransaction(txParams) {
  const response = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_simulateAssetChanges",
      params: [txParams],
    }),
  })

  const data = await response.json()
  return data.result
}

/**
 * 위험도 분석
 */
function analyzeRisk(changes) {
  let riskScore = 0
  const warnings = []

  if (!changes || changes.error) {
    return {
      level: "HIGH",
      score: 100,
      warnings: ["시뮬레이션 실패 - 트랜잭션이 실패할 가능성이 높습니다"],
    }
  }

  // 자산 변경 분석
  const assetChanges = changes.changes || []

  assetChanges.forEach((change) => {
    // 토큰 전송 분석
    if (change.assetType === "ERC20") {
      const amount = Number.parseFloat(change.rawAmount || "0")
      if (amount > 1000000000000000000) {
        // 1 ETH 이상
        riskScore += 30
        warnings.push(`⚠️ 대량 토큰 전송: ${change.symbol} ${amount / 1e18}`)
      }
    }

    // NFT 전송 분석
    if (change.assetType === "ERC721" || change.assetType === "ERC1155") {
      riskScore += 20
      warnings.push(`⚠️ NFT 전송: ${change.contractAddress}`)
    }

    // 알 수 없는 컨트랙트
    if (!change.symbol) {
      riskScore += 40
      warnings.push(`🚨 알 수 없는 컨트랙트: ${change.contractAddress}`)
    }
  })

  // 가스 비용 분석
  if (changes.gasUsed) {
    const gasUsed = Number.parseInt(changes.gasUsed, 16)
    if (gasUsed > 500000) {
      riskScore += 10
      warnings.push(`⚠️ 높은 가스 사용량: ${gasUsed}`)
    }
  }

  // 위험도 레벨 결정
  let level = "LOW"
  if (riskScore >= 70) level = "HIGH"
  else if (riskScore >= 40) level = "MEDIUM"

  return {
    level,
    score: Math.min(riskScore, 100),
    warnings,
  }
}

/**
 * 결과 포맷팅
 */
function formatSimulationResult(result, risk) {
  console.log("\n=== 트랜잭션 시뮬레이션 결과 ===\n")

  if (result.error) {
    console.log("❌ 시뮬레이션 실패:", result.error.message)
    return
  }

  console.log(`위험도: ${risk.level} (${risk.score}/100)`)
  console.log("\n경고 사항:")
  if (risk.warnings.length === 0) {
    console.log("✅ 안전한 트랜잭션입니다")
  } else {
    risk.warnings.forEach((warning) => console.log(`  ${warning}`))
  }

  console.log("\n예상 자산 변경:")
  const changes = result.changes || []
  if (changes.length === 0) {
    console.log("  변경 사항 없음")
  } else {
    changes.forEach((change, index) => {
      console.log(`\n  [${index + 1}] ${change.assetType}`)
      console.log(`      컨트랙트: ${change.contractAddress}`)
      console.log(`      심볼: ${change.symbol || "Unknown"}`)
      console.log(`      변경량: ${change.rawAmount || "0"}`)
      console.log(`      방향: ${change.changeType}`)
    })
  }

  if (result.gasUsed) {
    console.log(`\n예상 가스 사용량: ${Number.parseInt(result.gasUsed, 16)}`)
  }
}

/**
 * 메인 실행
 */
async function main() {
  console.log("Alchemy Transaction Simulation API 데모\n")

  // 예제 1: USDC 전송 시뮬레이션
  console.log("=== 예제 1: USDC 전송 (1 USDC) ===")
  const usdcTransfer = {
    from: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    to: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC 컨트랙트
    data: "0xa9059cbb000000000000000000000000fc43f5f9dd45258b3aff31bdbe6561d97e8b71de00000000000000000000000000000000000000000000000000000000000f4240", // transfer(address,uint256)
    gas: "0x5208",
    gasPrice: "0x3b9aca00",
  }

  try {
    const result1 = await simulateTransaction(usdcTransfer)
    const risk1 = analyzeRisk(result1)
    formatSimulationResult(result1, risk1)
  } catch (error) {
    console.error("시뮬레이션 에러:", error.message)
  }

  // 예제 2: ETH 전송 시뮬레이션
  console.log("\n\n=== 예제 2: ETH 전송 (0.1 ETH) ===")
  const ethTransfer = {
    from: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    to: "0xfc43f5f9dd45258b3aff31bdbe6561d97e8b71de",
    value: "0x16345785d8a0000", // 0.1 ETH
    gas: "0x5208",
    gasPrice: "0x3b9aca00",
  }

  try {
    const result2 = await simulateTransaction(ethTransfer)
    const risk2 = analyzeRisk(result2)
    formatSimulationResult(result2, risk2)
  } catch (error) {
    console.error("시뮬레이션 에러:", error.message)
  }

  console.log("\n\n=== TrustFi 보안 OS 통합 ===")
  console.log("이 시뮬레이션 결과를 사용하여:")
  console.log("1. 트랜잭션 방화벽 - 위험 기준 충족 시 즉시 차단")
  console.log("2. 지연 보호 - 고위험 거래에 5초 타이머")
  console.log("3. 자연어 리뷰 - 복잡한 트랜잭션을 이해하기 쉽게 번역")
  console.log("4. AI 위험 가드 - 실시간 위험 점수 분석")
}

main()
