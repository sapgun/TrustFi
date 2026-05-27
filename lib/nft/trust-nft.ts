"use server"

import { createClient } from "@/lib/supabase/server"

export interface TrustNFTData {
  tokenId: string
  trustScore: number
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM"
  mintedAt: Date
  lastUpdated: Date
}

export async function mintTrustNFT(address: string, trustScore: number): Promise<TrustNFTData | null> {
  try {
    console.log("[v0] Minting Trust NFT for", address, "with score", trustScore)

    // Trust Score가 20 미만이면 민팅 불가
    if (trustScore < 20) {
      console.log("[v0] Trust Score too low to mint NFT")
      return null
    }

    const tier = calculateTier(trustScore)
    const tokenId = `${address}-${Date.now()}`

    const supabase = await createClient()

    // Supabase에 NFT 정보 저장
    const { data, error } = await supabase
      .from("trust_nfts")
      .insert({
        user_address: address.toLowerCase(),
        token_id: tokenId,
        trust_score: trustScore,
        tier,
        minted_at: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Failed to mint NFT:", error)
      return null
    }

    console.log("[v0] Trust NFT minted:", data)

    return {
      tokenId,
      trustScore,
      tier,
      mintedAt: new Date(),
      lastUpdated: new Date(),
    }
  } catch (error) {
    console.error("[v0] Mint NFT error:", error)
    return null
  }
}

export async function canUpgradeNFT(address: string, currentScore: number): Promise<boolean> {
  try {
    const nft = await getTrustNFT(address)
    if (!nft) return false

    const currentTier = nft.tier
    const newTier = calculateTier(currentScore)

    // 티어가 상승했는지 확인
    const tierOrder = { BRONZE: 0, SILVER: 1, GOLD: 2, PLATINUM: 3 }
    return tierOrder[newTier] > tierOrder[currentTier]
  } catch (error) {
    console.error("[v0] Check upgrade error:", error)
    return false
  }
}

export async function upgradeTrustNFT(address: string, newScore: number): Promise<TrustNFTData | null> {
  try {
    const supabase = await createClient()

    const tier = calculateTier(newScore)

    const { data, error } = await supabase
      .from("trust_nfts")
      .update({
        trust_score: newScore,
        tier,
        last_updated: new Date().toISOString(),
      })
      .eq("user_address", address.toLowerCase())
      .select()
      .single()

    if (error) {
      console.error("[v0] Failed to upgrade NFT:", error)
      return null
    }

    console.log("[v0] Trust NFT upgraded for", address)

    return {
      tokenId: data.token_id,
      trustScore: data.trust_score,
      tier: data.tier,
      mintedAt: new Date(data.minted_at),
      lastUpdated: new Date(data.last_updated),
    }
  } catch (error) {
    console.error("[v0] Upgrade NFT error:", error)
    return null
  }
}

export async function getTrustNFT(address: string): Promise<TrustNFTData | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("trust_nfts")
      .select("*")
      .eq("user_address", address.toLowerCase())
      .single()

    if (error || !data) {
      return null
    }

    return {
      tokenId: data.token_id,
      trustScore: data.trust_score,
      tier: data.tier,
      mintedAt: new Date(data.minted_at),
      lastUpdated: new Date(data.last_updated),
    }
  } catch (error) {
    console.error("[v0] Get NFT error:", error)
    return null
  }
}

function calculateTier(score: number): "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" {
  if (score >= 80) return "PLATINUM"
  if (score >= 60) return "GOLD"
  if (score >= 40) return "SILVER"
  return "BRONZE"
}

export async function getTierColor(tier: string): Promise<string> {
  switch (tier) {
    case "PLATINUM":
      return "from-cyan-400 to-blue-500"
    case "GOLD":
      return "from-yellow-400 to-orange-500"
    case "SILVER":
      return "from-gray-300 to-gray-500"
    case "BRONZE":
      return "from-orange-600 to-red-700"
    default:
      return "from-gray-400 to-gray-600"
  }
}

export async function getTierIcon(tier: string): Promise<string> {
  switch (tier) {
    case "PLATINUM":
      return "💎"
    case "GOLD":
      return "🏆"
    case "SILVER":
      return "🥈"
    case "BRONZE":
      return "🥉"
    default:
      return "⭐"
  }
}
