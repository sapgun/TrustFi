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

export async function updateTrustNFT(address: string, newScore: number): Promise<boolean> {
  try {
    const supabase = await createClient()

    const tier = calculateTier(newScore)

    const { error } = await supabase
      .from("trust_nfts")
      .update({
        trust_score: newScore,
        tier,
        last_updated: new Date().toISOString(),
      })
      .eq("user_address", address.toLowerCase())

    if (error) {
      console.error("[v0] Failed to update NFT:", error)
      return false
    }

    console.log("[v0] Trust NFT updated for", address)
    return true
  } catch (error) {
    console.error("[v0] Update NFT error:", error)
    return false
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

export function getTierColor(tier: string): string {
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

export function getTierIcon(tier: string): string {
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
