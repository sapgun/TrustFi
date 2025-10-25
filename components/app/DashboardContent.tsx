"use client"

import { usePrivy, useWallets } from "@privy-io/react-auth"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { getWalletBalance } from "@/app/actions/blockchain"
import { getCachedTrustScore, TrustScoreBreakdown } from "@/lib/trust-score/calculator"

export default function DashboardContent() {
  const { ready, authenticated } = usePrivy()
  const { wallets } = useWallets()

  // State from TrustFi-update branch
  const [ethBalance, setEthBalance] = useState("0.0000")
  const [loadingBalance, setLoadingBalance] = useState(true)

  // State from feat-implement-trust-score-and-transaction branch
  const [trustScore, setTrustScore] = useState<TrustScoreBreakdown | null>(null)
  const [loadingScore, setLoadingScore] = useState(true)

  useEffect(() => {
    const embeddedWallet = wallets.find((w) => w.walletClientType === "privy")
    if (embeddedWallet?.address && ready && authenticated) {
      loadAllData(embeddedWallet.address)
    }
  }, [wallets, ready, authenticated])

  // Combined data loading function
  const loadAllData = async (address: string) => {
    // Load balance using server action (from TrustFi-update)
    setLoadingBalance(true)
    const balanceResult = await getWalletBalance(address, 1)
    if (balanceResult.success) {
      setEthBalance(balanceResult.formatted)
    }
    setLoadingBalance(false)

    // Load trust score (from feat-implement-trust-score-and-transaction)
    setLoadingScore(true)
    try {
      const score = await getCachedTrustScore(address)
      setTrustScore(score)
    } catch (error) {
      console.error("Failed to load trust score:", error)
    } finally {
      setLoadingScore(false)
    }
  }

  // Tier calculation function (from feat-implement-trust-score-and-transaction)
  const getTier = (score: number | undefined) => {
    if (!score) return "N/A"
    if (score >= 800) return "Diamond"
    if (score >= 700) return "Platinum"
    if (score >= 600) return "Gold"
    if (score >= 500) return "Silver"
    return "Bronze"
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <h1 className="text-4xl font-bold mb-3">Welcome to TrustFi 👋</h1>
        <p className="text-xl text-teal-100 mb-6">안전하고 신뢰할 수 있는 Web3 경험을 시작하세요</p>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-lg">
            <div className="text-teal-100 text-sm mb-1">Ethereum Balance</div>
            <div className="text-3xl font-bold">
              {/* Merged UI for balance */}
              {loadingBalance ? <span className="animate-pulse">...</span> : `${ethBalance} ETH`}
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-lg">
            <div className="text-teal-100 text-sm mb-1">Trust Score</div>
            <div className="text-3xl font-bold">
              {/* Merged UI for trust score */}
              {loadingScore ? <span className="animate-pulse">...</span> : trustScore?.total ?? 'N/A'}
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-lg">
            <div className="text-teal-100 text-sm mb-1">Tier</div>
            <div className="text-3xl font-bold">
              {/* Merged UI for tier */}
              {loadingScore ? <span className="animate-pulse">...</span> : getTier(trustScore?.total)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions (No conflicts here) */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "거래 실행",
            icon: "💳",
            path: "/app/transactions",
            color: "from-blue-400 to-blue-600",
            description: "보안 검토 후 안전한 거래",
          },
          {
            title: "Trust Score",
            icon: "⭐",
            path: "/app/trust-score",
            color: "from-yellow-400 to-orange-600",
            description: "신뢰 점수 상세 확인",
          },
          {
            title: "멀티체인",
            icon: "🌐",
            path: "/app/multichain",
            color: "from-purple-400 to-pink-600",
            description: "모든 체인 자산 통합",
          },
        ].map((action, idx) => (
          <Link key={idx} href={action.path}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-br ${action.color} rounded-xl p-6 text-white cursor-pointer shadow-lg hover:shadow-2xl transition-all`}
            >
              <div className="text-5xl mb-4">{action.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{action.title}</h3>
              <p className="text-white/90">{action.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}