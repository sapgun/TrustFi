"use server"

import { createClient } from "@/lib/supabase/server"
import { generateRandomName } from "@/lib/utils/random-name"

export async function syncUserToSupabase(privyUser: {
  id: string
  email?: { address: string } | null
  google?: { email: string; name?: string; picture?: string } | null
  wallet?: { address: string } | null
}) {
  console.log("[v0] syncUserToSupabase 시작:", privyUser.id)

  const supabase = await createClient()

  const email = privyUser.email?.address || privyUser.google?.email || null
  const displayName = privyUser.google?.name || generateRandomName()
  const avatarUrl = privyUser.google?.picture || null

  const { data: existingProfile, error: fetchError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("privy_user_id", privyUser.id)
    .maybeSingle()

  if (fetchError) {
    console.error("[v0] Failed to fetch user profile:", fetchError)
    return { success: false, error: fetchError.message }
  }

  if (existingProfile) {
    console.log("[v0] 기존 프로필 업데이트:", existingProfile.id)
    // 기존 프로필 업데이트
    const { error } = await supabase
      .from("user_profiles")
      .update({
        email,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("privy_user_id", privyUser.id)

    if (error) {
      console.error("[v0] Failed to update user profile:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] 프로필 업데이트 성공")
    return { success: true, profile: existingProfile }
  } else {
    console.log("[v0] 새 프로필 생성 중...")
    // 새 프로필 생성
    const { data: newProfile, error } = await supabase
      .from("user_profiles")
      .insert({
        privy_user_id: privyUser.id,
        email,
        display_name: displayName,
        avatar_url: avatarUrl,
        trust_score: 0,
        trust_level: "Bronze",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Failed to create user profile:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] 새 프로필 생성 성공:", newProfile.id)
    return { success: true, profile: newProfile, isNew: true }
  }
}
