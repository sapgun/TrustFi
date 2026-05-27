"use server"

// components/trust-score/OnChainAnalyzer.ts

interface AlchemyTransfer {
  to: string
  from: string
  metadata: {
    blockTimestamp: string
  }
}

// 1. Alchemy - 트랜잭션 히스토리
export async function getTransactionHistory(address: string): Promise<AlchemyTransfer[]> {
  const apiKey = process.env.ALCHEMY_API_KEY

  if (!apiKey) {
    console.error("[v0] ALCHEMY_API_KEY not found in environment variables")
    return []
  }

  const response = await fetch(`https://eth-mainnet.g.alchemy.com/v2/${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "alchemy_getAssetTransfers",
      params: [
        {
          fromAddress: address,
          category: ["external", "internal", "erc20", "erc721", "erc1155"],
          maxCount: "0x3e8", // 1000 transactions
          order: "desc",
        },
      ],
    }),
  })

  const data = await response.json()
  return data.result.transfers || []
}

// 2. 지갑 나이 계산
export async function getWalletAge(address: string) {
  const transfers = await getTransactionHistory(address)

  if (!transfers || transfers.length === 0) return 0

  const firstTx = transfers[transfers.length - 1]
  const firstTxDate = new Date(firstTx.metadata.blockTimestamp)
  const now = new Date()

  const monthsOld = (now.getTime() - firstTxDate.getTime()) / (1000 * 60 * 60 * 24 * 30)

  return Math.floor(monthsOld)
}

// 3. DeFi 활동 분석
export async function analyzeDeFiActivity(address: string) {
  const defiProtocols = [
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2
    "0xE592427A0AEce92De3Edee1F18E0157C05861564", // Uniswap V3
    "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", // Uniswap Router
    "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9", // Aave V2
    "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2", // Aave V3
  ]

  const transfers = await getTransactionHistory(address)

  const defiInteractions = transfers.filter((tx: AlchemyTransfer) =>
    defiProtocols.some(
      (protocol) =>
        tx.to?.toLowerCase() === protocol.toLowerCase() || tx.from?.toLowerCase() === protocol.toLowerCase(),
    ),
  )

  return {
    count: defiInteractions.length,
    protocols: [...new Set(defiInteractions.map((tx: AlchemyTransfer) => tx.to))],
  }
}

// 4. 청산 경험 확인 (Aave, Compound)
export async function checkLiquidationHistory(address: string) {
  // The Graph 쿼리 - Aave Liquidations
  const query = `
    {
      liquidationCalls(
        where: { user: "${address.toLowerCase()}" }
        orderBy: timestamp
        orderDirection: desc
      ) {
        id
        user
        collateralAsset
        debtAsset
        timestamp
      }
    }
  `

  const response = await fetch("https://api.thegraph.com/subgraphs/name/aave/protocol-v2", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  })

  const data = await response.json()
  return data.data.liquidationCalls || []
}

// 5. Trust Score 계산 (온체인 이력 부분)
export async function calculateOnChainScore(address: string): Promise<number> {
  const [walletAge, defiActivity, liquidations] = await Promise.all([
    getWalletAge(address),
    analyzeDeFiActivity(address),
    checkLiquidationHistory(address),
  ])

  let score = 0

  // 지갑 나이 (최대 80점)
  if (walletAge >= 6) score += 80
  else if (walletAge >= 3) score += 50
  else if (walletAge >= 1) score += 30

  // DeFi 활동 (최대 60점)
  if (defiActivity.count >= 20) score += 60
  else if (defiActivity.count >= 10) score += 40
  else if (defiActivity.count >= 5) score += 20

  // 청산 없음 (최대 60점)
  if (liquidations.length === 0) score += 60

  return Math.min(score, 200) // 최대 200점
}
