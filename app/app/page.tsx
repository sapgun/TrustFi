"use client"

import { usePrivy } from "@privy-io/react-auth"
import { useEffect, useState } from "react"
import DashboardContent from "@/components/app/DashboardContent"

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const { authenticated, ready } = usePrivy()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !ready) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-teal-400 animate-pulse">로딩 중...</div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Welcome to TrustFi</h2>
          <p className="text-slate-400 mb-6">지갑을 연결하여 시작하세요</p>
        </div>
      </div>
    )
  }

  return <DashboardContent />
}
