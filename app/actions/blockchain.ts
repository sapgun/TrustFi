"use server"

import { Alchemy, Network } from "alchemy-sdk"

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
})

export async function getWalletBalance(address: string) {
  try {
    const balance = await alchemy.core.getBalance(address)
    return {
      success: true,
      balance: balance.toString(),
    }
  } catch (error) {
    console.error("잔액 조회 실패:", error)
    return {
      success: false,
      error: "잔액 조회에 실패했습니다",
    }
  }
}

export async function getTokenBalances(address: string) {
  try {
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
