"use server"

export interface SecurityLayer {
  id: string
  name: string
  icon: string
  status: "pass" | "warning" | "blocked"
  message: string
  action?: string
}

export interface SecurityCheckResult {
  layers: SecurityLayer[]
  overallStatus: "safe" | "warning" | "blocked"
  canProceed: boolean
  delaySeconds?: number
}

export async function runSecurityLayers(
  transaction: {
    to: string
    value: string
    data?: string
    from: string
  },
  nlReview?: any,
  simulationResult?: any,
): Promise<SecurityCheckResult> {
  const layers: SecurityLayer[] = []

  // Layer 1: NL Review
  const nlLayer = await checkNLReview(transaction, nlReview)
  layers.push(nlLayer)

  // Layer 2: Transaction Firewall
  const firewallLayer = await checkFirewall(transaction)
  layers.push(firewallLayer)

  // Layer 3: Delay Protection
  const delayLayer = await checkDelayProtection(transaction, simulationResult)
  layers.push(delayLayer)

  // Layer 4: Emergency Cancel
  const emergencyLayer = checkEmergencyCancel()
  layers.push(emergencyLayer)

  // Layer 5: AI Risk Guard
  const aiLayer = await checkAIRiskGuard(transaction, simulationResult)
  layers.push(aiLayer)

  // Layer 6: Policy Engine
  const policyLayer = await checkPolicyEngine(transaction)
  layers.push(policyLayer)

  // 전체 상태 결정
  const hasBlocked = layers.some((l) => l.status === "blocked")
  const hasWarning = layers.some((l) => l.status === "warning")

  const overallStatus = hasBlocked ? "blocked" : hasWarning ? "warning" : "safe"
  const canProceed = !hasBlocked

  // 지연 시간 계산
  const delaySeconds = delayLayer.status === "warning" ? 10 : delayLayer.status === "pass" ? 5 : 0

  return {
    layers,
    overallStatus,
    canProceed,
    delaySeconds,
  }
}

async function checkNLReview(transaction: any, nlReview?: any): Promise<SecurityLayer> {
  if (!nlReview) {
    return {
      id: "nl-review",
      name: "NL Review",
      icon: "📖",
      status: "pass",
      message: "자연어 리뷰가 생성되지 않았습니다.",
    }
  }

  const riskCount = nlReview.risks?.length || 0
  const confidence = nlReview.confidence || 0

  if (confidence < 50 || riskCount > 3) {
    return {
      id: "nl-review",
      name: "NL Review",
      icon: "📖",
      status: "warning",
      message: `${riskCount}개의 위험 요소가 발견되었습니다. (신뢰도: ${confidence}%)`,
    }
  }

  return {
    id: "nl-review",
    name: "NL Review",
    icon: "📖",
    status: "pass",
    message: nlReview.summary || "트랜잭션이 안전합니다.",
  }
}

async function checkFirewall(transaction: any): Promise<SecurityLayer> {
  const value = Number.parseFloat(transaction.value)
  const blacklistedAddresses = ["0x0000000000000000000000000000000000000000"]

  if (blacklistedAddresses.includes(transaction.to.toLowerCase())) {
    return {
      id: "firewall",
      name: "Transaction Firewall",
      icon: "🔥",
      status: "blocked",
      message: "블랙리스트에 등록된 주소입니다.",
    }
  }

  if (value > 10) {
    return {
      id: "firewall",
      name: "Transaction Firewall",
      icon: "🔥",
      status: "warning",
      message: "매우 높은 금액의 거래입니다.",
    }
  }

  return {
    id: "firewall",
    name: "Transaction Firewall",
    icon: "🔥",
    status: "pass",
    message: "방화벽 검사 통과",
  }
}

async function checkDelayProtection(transaction: any, simulationResult?: any): Promise<SecurityLayer> {
  const value = Number.parseFloat(transaction.value)
  const hasComplexData = transaction.data && transaction.data.length > 100

  if (value > 1 || hasComplexData) {
    return {
      id: "delay",
      name: "Delay Protection",
      icon: "⏱️",
      status: "warning",
      message: "10초 지연 후 실행됩니다.",
      action: "delay:10",
    }
  }

  if (value > 0.1) {
    return {
      id: "delay",
      name: "Delay Protection",
      icon: "⏱️",
      status: "pass",
      message: "5초 지연 후 실행됩니다.",
      action: "delay:5",
    }
  }

  return {
    id: "delay",
    name: "Delay Protection",
    icon: "⏱️",
    status: "pass",
    message: "즉시 실행 가능",
  }
}

function checkEmergencyCancel(): SecurityLayer {
  return {
    id: "emergency",
    name: "Emergency Cancel",
    icon: "🚨",
    status: "pass",
    message: "실행 후 30초 내 긴급 취소 가능",
  }
}

async function checkAIRiskGuard(transaction: any, simulationResult?: any): Promise<SecurityLayer> {
  // AI 기반 위험 분석 (간단한 휴리스틱)
  const value = Number.parseFloat(transaction.value)
  const hasData = transaction.data && transaction.data !== "0x"

  let riskScore = 0

  if (value > 5) riskScore += 30
  else if (value > 1) riskScore += 15
  else if (value > 0.1) riskScore += 5

  if (hasData) riskScore += 20

  if (simulationResult?.changes) {
    const changeCount = simulationResult.changes.length
    if (changeCount > 5) riskScore += 25
    else if (changeCount > 2) riskScore += 10
  }

  if (riskScore > 50) {
    return {
      id: "ai-guard",
      name: "AI Risk Guard",
      icon: "🤖",
      status: "warning",
      message: `AI 위험 점수: ${riskScore}/100`,
    }
  }

  return {
    id: "ai-guard",
    name: "AI Risk Guard",
    icon: "🤖",
    status: "pass",
    message: `AI 위험 점수: ${riskScore}/100 - 안전`,
  }
}

async function checkPolicyEngine(transaction: any): Promise<SecurityLayer> {
  const value = Number.parseFloat(transaction.value)

  // 정책 검사
  const policies = [
    { name: "일일 한도", limit: 10, current: value },
    { name: "단일 거래 한도", limit: 5, current: value },
  ]

  for (const policy of policies) {
    if (policy.current > policy.limit) {
      return {
        id: "policy",
        name: "Policy Engine",
        icon: "📋",
        status: "blocked",
        message: `${policy.name} 초과 (${policy.current}/${policy.limit} ETH)`,
      }
    }
  }

  return {
    id: "policy",
    name: "Policy Engine",
    icon: "📋",
    status: "pass",
    message: "모든 정책 준수",
  }
}
