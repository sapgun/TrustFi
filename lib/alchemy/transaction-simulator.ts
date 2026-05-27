"use server"

/**
 * Alchemy Transaction Simulation Utility
 * Based on official alchemy_simulateAssetChanges API
 */

export interface SimulateTransactionParams {
  from?: string
  to: string
  value?: string
  data?: string
  gas?: string
  gasPrice?: string
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
}

export interface AssetChange {
  assetType: string
  changeType: string
  from: string
  to: string
  rawAmount: string
  contractAddress: string
  tokenId: string | null
  decimals: number
  symbol: string
  name: string
  logo: string
  amount: string
}

export interface SimulationResult {
  changes: AssetChange[]
}

export interface SecurityAnalysis {
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  warnings: string[]
  recommendations: string[]
  summary: string
  changes: AssetChange[]
}

/**
 * Simulate a transaction and return asset changes
 */
export async function simulateTransaction(params: SimulateTransactionParams, chainId = 1): Promise<SimulationResult> {
  const apiKey = process.env.ALCHEMY_API_KEY
  if (!apiKey) {
    throw new Error("ALCHEMY_API_KEY is not set")
  }

  // Determine the correct endpoint based on chainId
  const endpoints: Record<number, string> = {
    1: "eth-mainnet",
    137: "polygon-mainnet",
    10: "opt-mainnet",
    42161: "arb-mainnet",
    8453: "base-mainnet",
  }

  const network = endpoints[chainId] || "eth-mainnet"
  const url = `https://${network}.g.alchemy.com/v2/${apiKey}`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_simulateAssetChanges",
      params: [params],
    }),
  })

  if (!response.ok) {
    throw new Error(`Simulation failed: ${response.statusText}`)
  }

  const data = await response.json()

  if (data.error) {
    throw new Error(`Simulation error: ${data.error.message}`)
  }

  return data.result
}

/**
 * Analyze simulation results for security risks
 */
export async function analyzeSecurityRisks(
  simulation: SimulationResult,
  userAddress: string,
): Promise<SecurityAnalysis> {
  const warnings: string[] = []
  const recommendations: string[] = []
  let riskLevel: SecurityAnalysis["riskLevel"] = "LOW"

  const { changes } = simulation

  // Check for unexpected asset transfers
  const outgoingTransfers = changes.filter(
    (change) => change.from.toLowerCase() === userAddress.toLowerCase() && change.changeType === "TRANSFER",
  )

  const incomingTransfers = changes.filter(
    (change) => change.to.toLowerCase() === userAddress.toLowerCase() && change.changeType === "TRANSFER",
  )

  // Risk 1: Multiple outgoing transfers
  if (outgoingTransfers.length > 1) {
    warnings.push(`This transaction will transfer ${outgoingTransfers.length} different assets from your wallet`)
    riskLevel = "MEDIUM"
  }

  // Risk 2: Large value transfers
  outgoingTransfers.forEach((transfer) => {
    const amount = Number.parseFloat(transfer.amount)
    if (amount > 1000) {
      warnings.push(`Large transfer detected: ${transfer.amount} ${transfer.symbol}`)
      riskLevel = "HIGH"
    }
  })

  // Risk 3: NFT transfers
  const nftTransfers = changes.filter(
    (change) =>
      (change.assetType === "ERC721" || change.assetType === "ERC1155") &&
      change.from.toLowerCase() === userAddress.toLowerCase(),
  )

  if (nftTransfers.length > 0) {
    warnings.push(`This transaction will transfer ${nftTransfers.length} NFT(s) from your wallet`)
    riskLevel = riskLevel === "LOW" ? "MEDIUM" : riskLevel
  }

  // Risk 4: No incoming transfers (potential scam)
  if (outgoingTransfers.length > 0 && incomingTransfers.length === 0) {
    warnings.push("You are sending assets but not receiving anything in return")
    riskLevel = "HIGH"
    recommendations.push("Verify the recipient address carefully")
  }

  // Risk 5: Unknown token contracts
  const unknownTokens = changes.filter((change) => !change.symbol || change.symbol === "UNKNOWN")

  if (unknownTokens.length > 0) {
    warnings.push("Transaction involves unknown or unverified tokens")
    riskLevel = "CRITICAL"
    recommendations.push("Do not proceed unless you trust the token contract")
  }

  // Generate summary
  let summary = ""
  if (riskLevel === "LOW") {
    summary = "This transaction appears safe to execute."
  } else if (riskLevel === "MEDIUM") {
    summary = "This transaction has some risks. Review carefully before proceeding."
  } else if (riskLevel === "HIGH") {
    summary = "This transaction has significant risks. Proceed with caution."
  } else {
    summary = "DANGER: This transaction is highly suspicious. Do not proceed."
  }

  // Add general recommendations
  if (riskLevel !== "LOW") {
    recommendations.push("Double-check the contract address")
    recommendations.push("Verify the transaction on a block explorer")
    recommendations.push("Consider using a test transaction first")
  }

  return {
    riskLevel,
    warnings,
    recommendations,
    summary,
    changes,
  }
}

/**
 * Format asset changes for display
 */
export async function formatAssetChanges(changes: AssetChange[]): Promise<string> {
  if (changes.length === 0) {
    return "No asset changes detected"
  }

  return changes
    .map((change) => {
      const direction = change.changeType === "TRANSFER" ? "→" : "↔"
      const fromShort = `${change.from.slice(0, 6)}...${change.from.slice(-4)}`
      const toShort = `${change.to.slice(0, 6)}...${change.to.slice(-4)}`

      if (change.assetType === "NATIVE") {
        return `${change.amount} ETH: ${fromShort} ${direction} ${toShort}`
      } else if (change.assetType === "ERC721" || change.assetType === "ERC1155") {
        return `${change.name} #${change.tokenId}: ${fromShort} ${direction} ${toShort}`
      } else {
        return `${change.amount} ${change.symbol}: ${fromShort} ${direction} ${toShort}`
      }
    })
    .join("\n")
}
