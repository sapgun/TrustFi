"use client"

import { useLogin } from "@privy-io/react-auth"
import { Mail } from "lucide-react"

export default function EmailLogin() {
  const { login } = useLogin({
    onComplete: (user) => {
      console.log("[v0] 로그인 성공:", user)
    },
    onError: (error) => {
      console.error("[v0] 로그인 에러:", error)
    },
  })

  return (
    <button
      onClick={login}
      className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-all"
    >
      <Mail className="w-5 h-5" />
      이메일로 로그인
    </button>
  )
}
