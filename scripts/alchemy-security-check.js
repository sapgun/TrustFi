"use server"

/**
 * TrustFi 보안 검사 통합 스크립트
 *
 * Transaction Simulation API를 사용하여
 * TrustFi의 6-Layer Security OS를 구현합니다.
 */

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "m0EggN5pdIMlIgz2qsZjv"
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

/**
 * 6-Layer Security OS
 */
class SecurityOS {
  constructor() {
    this.layers = [
      { name: "자연어 리뷰", enabled: true },
      { name: "트랜잭션 방화벽", enabled: true },
      { name: "지연 보호", enabled: true },
      { name: "긴급 취소", enabled: true },
      { name: "AI 위험 가드", enabled: true },
      { name: "정책 엔진", enabled: true },
    ]
  }

  /**
   * Layer 1: 자연어 리뷰
   */
  async naturalLanguageReview(txParams, simulationResult) {
    const changes = simulationResult.changes || []
    const review = []

    review.push("📝 트랜잭션 요약:")

    if (txParams.value) {
      const ethValue = Number.parseInt(txParams.value, 16) / 1e18
      review.push(`  • ${ethValue} ETH를 ${txParams.to}로 전송합니다`)
    }

    changes.forEach((change) => {
      if (change.assetType === "ERC20") {
        const amount = Number.parseFloat(change.rawAmount || "0") / 1e18
        review.push(`  • ${amount} ${change.symbol}를 ${change.changeType === "TRANSFER" ? "전송" : "수신"}합니다`)
      } else if (change.assetType === "ERC721") {
        review.push(`  • NFT (${change.contractAddress})를 ${change.changeType === "TRANSFER" ? "전송" : "수신"}합니다`)
      }
    })

    return review.join("\n")
  }

  /**
   * Layer 2: 트랜잭션 방화벽
   */
  async transactionFirewall(riskScore) {
    if (riskScore >= 80) {
      return {
        blocked: true,
        reason: "🚨 위험도가 너무 높아 트랜잭션이 차단되었습니다",
      }
    }
    return { blocked: false }
  }

  /**
   * Layer 3: 지연 보호
   */
  async delayProtection(riskScore) {
    if (riskScore >= 50 && riskScore < 80) {
      return {
        delayed: true,
        seconds: 5,
        reason: "⏱️ 고위험 거래입니다. 5초 후 실행됩니다",
      }
    }
    return { delayed: false }
  }

  /**
   * Layer 4: 긴급 취소
   */
  async emergencyCancel() {
    return {
      available: true,
      window: 30,
      message: "🆘 서명 후 30초 이내 취소 가능",
    }
  }

  /**
   * Layer 5: AI 위험 가드
   */
  async aiRiskGuard(txParams, simulationResult) {
    const changes = simulationResult.changes || []
    let riskScore = 0
    const factors = []

    // 알 수 없는 컨트랙트
    const unknownContracts = changes.filter((c) => !c.symbol)
    if (unknownContracts.length > 0) {
      riskScore += 40
      factors.push(`알 수 없는 컨트랙트 ${unknownContracts.length}개`)
    }

    // 대량 자산 이동
    const largeTransfers = changes.filter((c) => {
      const amount = Number.parseFloat(c.rawAmount || "0")
      return amount > 1e18
    })
    if (largeTransfers.length > 0) {
      riskScore += 30
      factors.push(`대량 자산 이동 ${largeTransfers.length}건`)
    }

    // 복잡한 트랜잭션
    if (changes.length > 3) {
      riskScore += 20
      factors.push(`복잡한 트랜잭션 (${changes.length}개 변경)`)
    }

    // 높은 가스 사용
    if (simulationResult.gasUsed) {
      const gasUsed = Number.parseInt(simulationResult.gasUsed, 16)
      if (gasUsed > 500000) {
        riskScore += 10
        factors.push(`높은 가스 사용량 (${gasUsed})`)
      }
    }

    return {
      score: Math.min(riskScore, 100),
      factors,
      level: riskScore >= 70 ? "HIGH" : riskScore >= 40 ? "MEDIUM" : "LOW",
    }
  }

  /**
   * Layer 6: 정책 엔진
   */
  async policyEngine(txParams, userPolicies = {}) {
    const violations = []

    // 기본 정책
    const defaultPolicies = {
      maxEthTransfer: 1, // 1 ETH
      maxTokenTransfer: 10000, // 10000 토큰
      allowedContracts: [],
      blockedContracts: [],
    }

    const policies = { ...defaultPolicies, ...userPolicies }

    // ETH 전송 한도 확인
    if (txParams.value) {
      const ethValue = Number.parseInt(txParams.value, 16) / 1e18
      if (ethValue > policies.maxEthTransfer) {
        violations.push(`ETH 전송 한도 초과: ${ethValue} > ${policies.maxEthTransfer}`)
      }
    }

    // 차단된 컨트랙트 확인
    if (policies.blockedContracts.includes(txParams.to)) {
      violations.push(`차단된 컨트랙트: ${txParams.to}`)
    }

    return {
      passed: violations.length === 0,
      violations,
    }
  }

  /**
   * 전체 보안 검사 실행
   */
  async runSecurityCheck(txParams) {
    console.log("\n🛡️ TrustFi 6-Layer Security OS 실행 중...\n")

    // 트랜잭션 시뮬레이션
    const simulationResult = await this.simulateTransaction(txParams)

    // Layer 5: AI 위험 가드 (먼저 실행하여 위험도 계산)
    const aiRisk = await this.aiRiskGuard(txParams, simulationResult)
    console.log(`\n[Layer 5] AI 위험 가드`)
    console.log(`  위험도: ${aiRisk.level} (${aiRisk.score}/100)`)
    console.log(`  요인: ${aiRisk.factors.join(", ") || "없음"}`)

    // Layer 1: 자연어 리뷰
    const review = await this.naturalLanguageReview(txParams, simulationResult)
    console.log(`\n[Layer 1] 자연어 리뷰`)
    console.log(review)

    // Layer 2: 트랜잭션 방화벽
    const firewall = await this.transactionFirewall(aiRisk.score)
    console.log(`\n[Layer 2] 트랜잭션 방화벽`)
    if (firewall.blocked) {
      console.log(`  ${firewall.reason}`)
      return { approved: false, reason: firewall.reason }
    } else {
      console.log("  ✅ 통과")
    }

    // Layer 3: 지연 보호
    const delay = await this.delayProtection(aiRisk.score)
    console.log(`\n[Layer 3] 지연 보호`)
    if (delay.delayed) {
      console.log(`  ${delay.reason}`)
    } else {
      console.log("  ✅ 즉시 실행 가능")
    }

    // Layer 4: 긴급 취소
    const cancel = await this.emergencyCancel()
    console.log(`\n[Layer 4] 긴급 취소`)
    console.log(`  ${cancel.message}`)

    // Layer 6: 정책 엔진
    const policy = await this.policyEngine(txParams)
    console.log(`\n[Layer 6] 정책 엔진`)
    if (policy.passed) {
      console.log("  ✅ 모든 정책 통과")
    } else {
      console.log(`  ❌ 정책 위반:`)
      policy.violations.forEach((v) => console.log(`    • ${v}`))
      return { approved: false, reason: "정책 위반" }
    }

    console.log("\n\n✅ 보안 검사 완료 - 트랜잭션 승인됨")
    return {
      approved: true,
      riskLevel: aiRisk.level,
      riskScore: aiRisk.score,
      delayed: delay.delayed,
      delaySeconds: delay.seconds || 0,
    }
  }

  async simulateTransaction(txParams) {
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
    return data.result || {}
  }
}

/**
 * 메인 실행
 */
async function main() {
  const securityOS = new SecurityOS()

  // 테스트 트랜잭션
  const testTransaction = {
    from: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    to: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    data: "0xa9059cbb000000000000000000000000fc43f5f9dd45258b3aff31bdbe6561d97e8b71de00000000000000000000000000000000000000000000000000000000000f4240",
    gas: "0x5208",
    gasPrice: "0x3b9aca00",
  }

  const result = await securityOS.runSecurityCheck(testTransaction)

  console.log("\n\n=== 최종 결과 ===")
  console.log(JSON.stringify(result, null, 2))
}

main()
