"use server"

import { getTransactionHistory } from "@/app/actions/blockchain"

export interface TransactionAnalytics {
  totalTransactions: number
  sentTransactions: number
  receivedTransactions: number
  totalVolume: string
  averageTransactionValue: string
  mostActiveDay: string
  transactionsByCategory: Record<string, number>
  topRecipients: Array<{ address: string; count: number; volume: string }>
  topSenders: Array<{ address: string; count: number; volume: string }>
  riskScore: number
  insights: string[]
}

export async function analyzeTransactionHistory(address: string): Promise<TransactionAnalytics> {
  console.log("[v0] analyzeTransactionHistory - address:", address)

  const result = await getTransactionHistory(address)

  if (!result.success || !result.transactions) {
    return {
      totalTransactions: 0,
      sentTransactions: 0,
      receivedTransactions: 0,
      totalVolume: "0",
      averageTransactionValue: "0",
      mostActiveDay: "N/A",
      transactionsByCategory: {},
      topRecipients: [],
      topSenders: [],
      riskScore: 0,
      insights: ["거래 내역을 불러올 수 없습니다."],
    }
  }

  const transactions = result.transactions
  const userAddress = address.toLowerCase()

  // 기본 통계
  const sentTxs = transactions.filter((tx: any) => tx.from?.toLowerCase() === userAddress)
  const receivedTxs = transactions.filter((tx: any) => tx.to?.toLowerCase() === userAddress)

  // 거래량 계산
  let totalVolume = 0
  transactions.forEach((tx: any) => {
    if (tx.value) {
      totalVolume += Number.parseFloat(tx.value) || 0
    }
  })

  // 카테고리별 분류
  const categoryCount: Record<string, number> = {}
  transactions.forEach((tx: any) => {
    const category = tx.category || "unknown"
    categoryCount[category] = (categoryCount[category] || 0) + 1
  })

  // 상위 수신자/발신자
  const recipientMap = new Map<string, { count: number; volume: number }>()
  const senderMap = new Map<string, { count: number; volume: number }>()

  sentTxs.forEach((tx: any) => {
    if (tx.to) {
      const to = tx.to.toLowerCase()
      const existing = recipientMap.get(to) || { count: 0, volume: 0 }
      recipientMap.set(to, {
        count: existing.count + 1,
        volume: existing.volume + (Number.parseFloat(tx.value) || 0),
      })
    }
  })

  receivedTxs.forEach((tx: any) => {
    if (tx.from) {
      const from = tx.from.toLowerCase()
      const existing = senderMap.get(from) || { count: 0, volume: 0 }
      senderMap.set(from, {
        count: existing.count + 1,
        volume: existing.volume + (Number.parseFloat(tx.value) || 0),
      })
    }
  })

  const topRecipients = Array.from(recipientMap.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([address, data]) => ({
      address,
      count: data.count,
      volume: data.volume.toFixed(4),
    }))

  const topSenders = Array.from(senderMap.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([address, data]) => ({
      address,
      count: data.count,
      volume: data.volume.toFixed(4),
    }))

  // 위험 점수 계산
  const riskScore = calculateRiskScore(transactions, userAddress)

  // AI 인사이트 생성
  const insights = await generateInsights({
    totalTransactions: transactions.length,
    sentTransactions: sentTxs.length,
    receivedTransactions: receivedTxs.length,
    totalVolume: totalVolume.toFixed(4),
    riskScore,
  })

  return {
    totalTransactions: transactions.length,
    sentTransactions: sentTxs.length,
    receivedTransactions: receivedTxs.length,
    totalVolume: totalVolume.toFixed(4),
    averageTransactionValue: (totalVolume / transactions.length).toFixed(4),
    mostActiveDay: getMostActiveDay(transactions),
    transactionsByCategory: categoryCount,
    topRecipients,
    topSenders,
    riskScore,
    insights,
  }
}

function calculateRiskScore(transactions: any[], userAddress: string): number {
  let riskScore = 0

  // 위험 요소 체크
  const hasHighValueTx = transactions.some((tx) => Number.parseFloat(tx.value || "0") > 10)
  const hasFrequentTx = transactions.length > 50
  const hasUnknownRecipients = transactions.some((tx) => tx.to && !isKnownAddress(tx.to))

  if (hasHighValueTx) riskScore += 30
  if (hasFrequentTx) riskScore += 20
  if (hasUnknownRecipients) riskScore += 25

  return Math.min(riskScore, 100)
}

function isKnownAddress(address: string): boolean {
  // 알려진 주소 목록 (예: 거래소, DeFi 프로토콜)
  const knownAddresses = [
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
    "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
  ]
  return knownAddresses.includes(address.toLowerCase())
}

function getMostActiveDay(transactions: any[]): string {
  const dayCount: Record<string, number> = {}

  transactions.forEach((tx) => {
    if (tx.metadata?.blockTimestamp) {
      const date = new Date(tx.metadata.blockTimestamp)
      const day = date.toISOString().split("T")[0]
      dayCount[day] = (dayCount[day] || 0) + 1
    }
  })

  const mostActive = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]
  return mostActive ? mostActive[0] : "N/A"
}

async function generateInsights(data: {
  totalTransactions: number
  sentTransactions: number
  receivedTransactions: number
  totalVolume: string
  riskScore: number
}): Promise<string[]> {
  const insights: string[] = []

  // 기본 인사이트
  if (data.totalTransactions === 0) {
    insights.push("아직 거래 내역이 없습니다.")
    return insights
  }

  if (data.sentTransactions > data.receivedTransactions) {
    insights.push("보낸 거래가 받은 거래보다 많습니다. 활발한 거래 활동을 보이고 있습니다.")
  } else {
    insights.push("받은 거래가 보낸 거래보다 많습니다. 자산을 축적하고 있습니다.")
  }

  if (data.riskScore > 50) {
    insights.push("위험 점수가 높습니다. 거래 패턴을 검토해보세요.")
  } else {
    insights.push("안전한 거래 패턴을 유지하고 있습니다.")
  }

  // OpenAI 인사이트 (선택사항)
  if (process.env.OPENAI_API_KEY) {
    try {
      const aiInsight = await generateAIInsight(data)
      if (aiInsight) {
        insights.push(aiInsight)
      }
    } catch (error) {
      console.error("[v0] AI 인사이트 생성 실패:", error)
    }
  }

  return insights
}

async function generateAIInsight(data: any): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a blockchain transaction analyst. Provide brief, actionable insights about transaction patterns in Korean.",
          },
          {
            role: "user",
            content: `분석 데이터: 총 거래 ${data.totalTransactions}건, 보낸 거래 ${data.sentTransactions}건, 받은 거래 ${data.receivedTransactions}건, 총 거래량 ${data.totalVolume} ETH, 위험 점수 ${data.riskScore}. 한 문장으로 인사이트를 제공해주세요.`,
          },
        ],
        max_tokens: 100,
      }),
    })

    const result = await response.json()
    return result.choices?.[0]?.message?.content || ""
  } catch (error) {
    console.error("[v0] OpenAI API 호출 실패:", error)
    return ""
  }
}
