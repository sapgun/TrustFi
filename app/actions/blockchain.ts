"use server"

import { Alchemy, Network } from "alchemy-sdk"

function getAlchemyInstance(chainId: number) {
  const networkMap: Record<number, Network> = {
    1: Network.ETH_MAINNET,
    137: Network.MATIC_MAINNET,
    42161: Network.ARB_MAINNET,
    8453: Network.BASE_MAINNET,
    10: Network.OPT_MAINNET,
  }

  return new Alchemy({
    apiKey: process.env.ALCHEMY_API_KEY,
    network: networkMap[chainId] || Network.ETH_MAINNET,
  })
}

export async function getWalletBalance(address: string, chainId = 1) {
  try {
    console.log(`[v0] getWalletBalance - address: ${address}, chainId: ${chainId}`)

    const alchemy = getAlchemyInstance(chainId)
    const balance = await alchemy.core.getBalance(address)

    console.log(`[v0] getWalletBalance - balance: ${balance.toString()}`)

    return {
      success: true,
      balance: balance.toString(),
      formatted: (Number(balance) / 1e18).toFixed(4),
    }
  } catch (error) {
    console.error("[v0] 잔액 조회 실패:", error)
    return {
      success: false,
      error: "잔액 조회에 실패했습니다",
      balance: "0",
      formatted: "0.0000",
    }
  }
}

export async function getMultiChainBalances(address: string) {
  console.log(`[v0] getMultiChainBalances - address: ${address}`)

  const chains = [
    { id: 1, name: "Ethereum" },
    { id: 137, name: "Polygon" },
    { id: 42161, name: "Arbitrum" },
    { id: 8453, name: "Base" },
    { id: 10, name: "Optimism" },
  ]

  const balances = await Promise.all(
    chains.map(async (chain) => {
      const result = await getWalletBalance(address, chain.id)
      return {
        chainId: chain.id,
        chainName: chain.name,
        ...result,
      }
    }),
  )

  console.log(`[v0] getMultiChainBalances - 결과:`, balances)

  return {
    success: true,
    balances,
  }
}

export async function getTokenBalances(address: string) {
  try {
    const alchemy = getAlchemyInstance(1)
    const balances = await alchemy.core.getTokenBalances(address)
    return {
      success: true,
      balances: balances.tokenBalances,
    }
  } catch (error) {
    console.error("토큰 잔액 조회 실패:", error)
    return {
      success: false,
      error: "토큰 잔액 조회에 실패했습니다",
    }
  }
}

export async function getNFTs(address: string) {
  try {
    const alchemy = getAlchemyInstance(1)
    const nfts = await alchemy.nft.getNftsForOwner(address)
    return {
      success: true,
      nfts: nfts.ownedNfts,
    }
  } catch (error) {
    console.error("NFT 조회 실패:", error)
    return {
      success: false,
      error: "NFT 조회에 실패했습니다",
    }
  }
}

export async function getTransactionHistory(address: string) {
  try {
    const alchemy = getAlchemyInstance(1)
    const history = await alchemy.core.getAssetTransfers({
      fromAddress: address,
      category: ["external", "internal", "erc20", "erc721", "erc1155"],
      maxCount: 100,
    })
    return {
      success: true,
      transactions: history.transfers,
    }
  } catch (error) {
    console.error("거래 내역 조회 실패:", error)
    return {
      success: false,
      error: "거래 내역 조회에 실패했습니다",
    }
  }
}
