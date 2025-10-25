"use server"

export interface NLReviewResult {
  summary: string
  risks: string[]
  recommendations: string[]
  confidence: number
}

export async function generateNLReview(
  transaction: {
    to: string
    value: string
    data?: string
    from: string
  },
  simulationResult?: any,
): Promise<NLReviewResult> {
  const prompt = `
당신은 블록체인 보안 전문가입니다. 다음 트랜잭션을 분석하고 일반 사용자가 이해할 수 있도록 자연어로 설명해주세요.

트랜잭션 정보:
- 발신자: ${transaction.from}
- 수신자: ${transaction.to}
- 금액: ${transaction.value} ETH
${transaction.data ? `- 데이터: ${transaction.data.slice(0, 100)}...` : ""}

${
  simulationResult
    ? `시뮬레이션 결과:
- 자산 변경: ${JSON.stringify(simulationResult.changes, null, 2)}
`
    : ""
}

다음 형식으로 응답해주세요:
1. 요약: 이 거래가 무엇을 하는지 한 문장으로
2. 위험 요소: 발견된 위험 요소 목록
3. 권장 사항: 사용자에게 권장하는 조치
4. 신뢰도: 0-100 사이의 숫자
`

  try {
    // OpenAI API 호출 (환경 변수가 없으면 기본 분석 반환)
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      console.log("[v0] OpenAI API key not found, using fallback analysis")
      return generateFallbackReview(transaction, simulationResult)
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "당신은 블록체인 보안 전문가입니다. 트랜잭션을 분석하고 일반 사용자가 이해할 수 있도록 설명합니다.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      console.error("[v0] OpenAI API error:", response.statusText)
      return generateFallbackReview(transaction, simulationResult)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ""

    // 응답 파싱
    return parseNLReviewResponse(content)
  } catch (error) {
    console.error("[v0] NL Review generation error:", error)
    return generateFallbackReview(transaction, simulationResult)
  }
}

function generateFallbackReview(transaction: any, simulationResult?: any): NLReviewResult {
  const value = Number.parseFloat(transaction.value)
  const isHighValue = value > 0.1
  const hasData = transaction.data && transaction.data !== "0x"

  let summary = `${transaction.from.slice(0, 6)}...에서 ${transaction.to.slice(0, 6)}...로 ${transaction.value} ETH를 전송합니다.`
  const risks: string[] = []
  const recommendations: string[] = []

  if (isHighValue) {
    risks.push("높은 금액의 거래입니다.")
    recommendations.push("거래를 진행하기 전에 수신자 주소를 다시 확인하세요.")
  }

  if (hasData) {
    summary += " 스마트 컨트랙트와 상호작용합니다."
    risks.push("스마트 컨트랙트 호출이 포함되어 있습니다.")
    recommendations.push("컨트랙트가 검증되었는지 확인하세요.")
  }

  if (simulationResult?.changes) {
    const changeCount = simulationResult.changes.length
    if (changeCount > 3) {
      risks.push(`${changeCount}개의 자산 변경이 예상됩니다.`)
      recommendations.push("모든 자산 변경 사항을 검토하세요.")
    }
  }

  return {
    summary,
    risks: risks.length > 0 ? risks : ["위험 요소가 발견되지 않았습니다."],
    recommendations: recommendations.length > 0 ? recommendations : ["거래를 진행해도 안전합니다."],
    confidence: risks.length === 0 ? 95 : risks.length === 1 ? 75 : 50,
  }
}

function parseNLReviewResponse(content: string): NLReviewResult {
  // OpenAI 응답 파싱
  const lines = content.split("\n").filter((l) => l.trim())

  let summary = ""
  const risks: string[] = []
  const recommendations: string[] = []
  let confidence = 80

  let currentSection = ""

  for (const line of lines) {
    if (line.includes("요약:") || line.includes("Summary:")) {
      currentSection = "summary"
      summary = line.split(":")[1]?.trim() || ""
    } else if (line.includes("위험") || line.includes("Risk")) {
      currentSection = "risks"
    } else if (line.includes("권장") || line.includes("Recommend")) {
      currentSection = "recommendations"
    } else if (line.includes("신뢰도") || line.includes("Confidence")) {
      const match = line.match(/\d+/)
      if (match) confidence = Number.parseInt(match[0])
    } else if (line.trim().startsWith("-") || line.trim().match(/^\d+\./)) {
      const text = line.replace(/^[-\d.]\s*/, "").trim()
      if (currentSection === "risks") risks.push(text)
      else if (currentSection === "recommendations") recommendations.push(text)
    }
  }

  return {
    summary: summary || "트랜잭션 분석 완료",
    risks: risks.length > 0 ? risks : ["위험 요소 없음"],
    recommendations: recommendations.length > 0 ? recommendations : ["안전하게 진행 가능"],
    confidence,
  }
}
