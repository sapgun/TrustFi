"use server"

import { createClient } from "@/lib/supabase/server"
import type { AlchemyWebhookEvent, AddressActivityEvent, WebhookProcessingResult } from "./webhook-types"
import { canUpgradeNFT } from "@/lib/nft/trust-nft"

/**
 * Alchemy Webhook 이벤트 처리
 */
export async function processWebhookEvent(event: AlchemyWebhookEvent): Promise<WebhookProcessingResult> {
  console.log("[v0] Processing webhook event:", event.id, "Type:", event.type)

  try {
    switch (event.type) {
      case "ADDRESS_ACTIVITY":
        return await processAddressActivity(event)
      case "NFT_ACTIVITY":
        return await processNFTActivity(event)
      case "CUSTOM_WEBHOOK":
        return await processCustomWebhook(event)
      default:
        return {
          success: false,
          message: `Unknown webhook type: ${event.type}`,
        }
    }
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Address Activity 이벤트 처리
 * - 거래 내역 저장
 * - Trust Score 업데이트
 * - 보안 알림 발송
 */
async function processAddressActivity(event: AlchemyWebhookEvent): Promise<WebhookProcessingResult> {
  const activityEvent = event.event as AddressActivityEvent
  const supabase = await createClient()

  let trustScoreUpdated = false
  let notificationSent = false

  for (const activity of activityEvent.activity) {
    // 1. 거래 내역 저장
    const { error: insertError } = await supabase.from("transactions").insert({
      hash: activity.hash,
      from_address: activity.fromAddress,
      to_address: activity.toAddress,
      value: activity.value.toString(),
      asset: activity.asset,
      category: activity.category,
      block_number: activity.blockNum,
      network: activityEvent.network,
      webhook_id: event.webhookId,
      created_at: event.createdAt,
    })

    if (insertError) {
      console.error("[v0] Transaction insert error:", insertError)
      continue
    }

    // 2. 사용자 찾기 (from_address 또는 to_address로)
    const { data: users } = await supabase
      .from("users")
      .select("id, wallet_address")
      .or(`wallet_address.eq.${activity.fromAddress},wallet_address.eq.${activity.toAddress}`)

    if (users && users.length > 0) {
      for (const user of users) {
        // 3. Trust Score 재계산 트리거
        await updateUserTrustScore(user.id)
        trustScoreUpdated = true

        // 4. 보안 알림 체크
        const isSuspicious = await checkSuspiciousActivity(activity)
        if (isSuspicious) {
          await sendSecurityNotification(user.id, activity)
          notificationSent = true
        }
      }
    }
  }

  return {
    success: true,
    message: `Processed ${activityEvent.activity.length} activities`,
    trustScoreUpdated,
    notificationSent,
  }
}

/**
 * NFT Activity 이벤트 처리
 */
async function processNFTActivity(event: AlchemyWebhookEvent): Promise<WebhookProcessingResult> {
  console.log("[v0] Processing NFT activity:", event.id)
  // NFT 거래 처리 로직
  return {
    success: true,
    message: "NFT activity processed",
  }
}

/**
 * Custom Webhook 이벤트 처리
 */
async function processCustomWebhook(event: AlchemyWebhookEvent): Promise<WebhookProcessingResult> {
  console.log("[v0] Processing custom webhook:", event.id)
  // 커스텀 이벤트 처리 로직
  return {
    success: true,
    message: "Custom webhook processed",
  }
}

/**
 * Trust Score 업데이트
 */
async function updateUserTrustScore(userId: string): Promise<void> {
  const supabase = await createClient()

  // 최근 거래 내역 조회
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .or(`from_address.eq.${userId},to_address.eq.${userId}`)
    .order("created_at", { ascending: false })
    .limit(100)

  if (!transactions) return

  // Trust Score 계산 (간단한 버전)
  const score = calculateTrustScore(transactions)

  // Trust Score 업데이트
  await supabase
    .from("users")
    .update({
      trust_score: score,
      trust_score_updated_at: new Date().toISOString(),
    })
    .eq("id", userId)

  console.log("[v0] Trust Score updated for user:", userId, "Score:", score)

  const { data: user } = await supabase.from("users").select("wallet_address").eq("id", userId).single()

  if (user?.wallet_address) {
    const canUpgrade = await canUpgradeNFT(user.wallet_address, score)
    if (canUpgrade) {
      await sendNFTUpgradeNotification(userId, score)
    }
  }
}

/**
 * Trust Score 계산
 */
function calculateTrustScore(transactions: any[]): number {
  if (transactions.length === 0) return 0

  let score = 50 // 기본 점수

  // 거래 횟수 (최대 +20점)
  score += Math.min(transactions.length / 5, 20)

  // 거래 다양성 (최대 +15점)
  const uniqueAddresses = new Set(transactions.flatMap((t) => [t.from_address, t.to_address]))
  score += Math.min(uniqueAddresses.size / 2, 15)

  // 최근 활동 (최대 +15점)
  const recentTransactions = transactions.filter((t) => {
    const txDate = new Date(t.created_at)
    const daysSince = (Date.now() - txDate.getTime()) / (1000 * 60 * 60 * 24)
    return daysSince <= 30
  })
  score += Math.min(recentTransactions.length / 2, 15)

  return Math.min(Math.round(score), 100)
}

/**
 * 의심스러운 활동 체크
 */
async function checkSuspiciousActivity(activity: any): Promise<boolean> {
  // 간단한 보안 체크
  const suspiciousPatterns = [
    // 매우 큰 금액
    activity.value > 1000000,
    // 알려진 위험 주소 (예시)
    activity.toAddress.toLowerCase() === "0x0000000000000000000000000000000000000000",
  ]

  return suspiciousPatterns.some((pattern) => pattern)
}

/**
 * 보안 알림 발송
 */
async function sendSecurityNotification(userId: string, activity: any): Promise<void> {
  const supabase = await createClient()

  await supabase.from("notifications").insert({
    user_id: userId,
    type: "security_alert",
    title: "Suspicious Activity Detected",
    message: `A suspicious transaction was detected: ${activity.hash}`,
    data: activity,
    created_at: new Date().toISOString(),
  })

  console.log("[v0] Security notification sent to user:", userId)
}

/**
 * NFT 업그레이드 알림 발송
 */
async function sendNFTUpgradeNotification(userId: string, newScore: number): Promise<void> {
  const supabase = await createClient()

  // 이미 같은 알림이 있는지 확인 (중복 방지)
  const { data: existingNotification } = await supabase
    .from("notifications")
    .select("id")
    .eq("user_id", userId)
    .eq("type", "nft_upgrade_available")
    .eq("read", false)
    .single()

  if (existingNotification) {
    console.log("[v0] NFT upgrade notification already exists for user:", userId)
    return
  }

  await supabase.from("notifications").insert({
    user_id: userId,
    type: "nft_upgrade_available",
    title: "Trust NFT 업그레이드 가능",
    message: `Trust Score가 ${newScore}점으로 상승했습니다! 프로필 페이지에서 NFT를 업그레이드하세요.`,
    data: { new_score: newScore },
    created_at: new Date().toISOString(),
  })

  console.log("[v0] NFT upgrade notification sent to user:", userId)
}
