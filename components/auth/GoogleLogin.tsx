"use client"

import { useLoginWithOAuth } from "@privy-io/react-auth"
import { LogIn } from "lucide-react"

export default function GoogleLogin() {
  const { state, initOAuth } = useLoginWithOAuth()

  const handleLogin = async () => {
    try {
      await initOAuth({ provider: "google" })
    } catch (err) {
      console.error("[v0] Google login error:", err)
    }
  }

  const isLoading = state.status === "initial-oauth-redirect" || state.status === "awaiting-oauth-redirect"

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <LogIn className="w-5 h-5" />
      {isLoading ? "로그인 중..." : "Google로 로그인"}
    </button>
  )
}
