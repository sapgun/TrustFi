"use client"

import { useEffect, useState } from "react"
import { useWallets, usePrivy } from "@privy-io/react-auth"
import { getCachedTrustScore, type UserTrustScore } from "@/lib/trust-score/calculator"
import { motion } from "framer-motion"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

export default function TrustScoreDisplay() {
  const { ready } = usePrivy()
  const { wallets } = useWallets()
  const [trustScore, setTrustScore] = useState<UserTrustScore | null>(null)
  const [loading, setLoading] = useState(true)

  const embeddedWallet = ready ? wallets.find((w) => w.walletClientType === "privy") : null

  useEffect(() => {
    if (!ready) {
      setLoading(true)
      return
    }

    async function loadScore() {
      if (!embeddedWallet?.address) {
        setLoading(false)
        return
      }

      try {
        const score = await getCachedTrustScore(embeddedWallet.address)
        setTrustScore(score)
      } catch (error) {
        console.error("Trust Score 로딩 실패:", error)
      } finally {
        setLoading(false)
      }
    }

    loadScore()
  }, [embeddedWallet?.address, ready])

  if (loading || !ready) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-md p-8 text-center border border-slate-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4" />
        <p className="text-slate-400">Trust Score 계산 중...</p>
      </div>
    )
  }

  if (!trustScore) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-md p-8 text-center border border-slate-700">
        <div className="text-4xl mb-3">⭐</div>
        <p className="text-slate-400">지갑을 연결하여 Trust Score를 확인하세요</p>
      </div>
    )
  }

  const chartData = [
    { category: "실명인증", value: trustScore.breakdown.identity, max: 300 },
    { category: "온체인", value: trustScore.breakdown.onchain, max: 200 },
    { category: "커뮤니티", value: trustScore.breakdown.community, max: 100 },
    { category: "기관검증", value: trustScore.breakdown.institutional, max: 250 },
    { category: "보안", value: trustScore.breakdown.security, max: 50 },
  ]

  const tierColors = {
    Basic: { bg: "from-gray-400 to-gray-600", text: "text-gray-700" },
    Silver: { bg: "from-gray-300 to-gray-500", text: "text-gray-700" },
    Gold: { bg: "from-yellow-400 to-yellow-600", text: "text-yellow-700" },
    Platinum: { bg: "from-purple-400 to-purple-600", text: "text-purple-700" },
  }

  const tierColor = tierColors[trustScore.tier]

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-br ${tierColor.bg} rounded-2xl p-8 text-white shadow-xl`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Trust Score</h2>
            <div className="text-6xl font-bold">{trustScore.breakdown.total}</div>
            <div className="text-xl mt-2 opacity-90">/ 1000</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80 mb-2">Current Tier</div>
            <div className="text-4xl font-bold">{trustScore.tier}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "실명", value: trustScore.breakdown.identity, max: 300 },
            { label: "온체인", value: trustScore.breakdown.onchain, max: 200 },
            { label: "커뮤니티", value: trustScore.breakdown.community, max: 100 },
            { label: "기관", value: trustScore.breakdown.institutional, max: 250 },
            { label: "보안", value: trustScore.breakdown.security, max: 50 },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xs opacity-80 mb-1">{item.label}</div>
              <div className="text-lg font-bold">
                {item.value}/{item.max}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Radar Chart */}
      <div className="bg-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-slate-100 mb-4">점수 분포</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={90} domain={[0, 300]} />
            <Radar name="Trust Score" dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown Details */}
      <div className="bg-slate-800 rounded-xl shadow-md p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-slate-100 mb-4">상세 점수</h3>
        <div className="space-y-4">
          {[
            {
              label: "실명 인증",
              icon: "🔐",
              value: trustScore.breakdown.identity,
              max: 300,
              description: "PASS 본인 인증 또는 KYC 완료",
            },
            {
              label: "온체인 이력",
              icon: "📊",
              value: trustScore.breakdown.onchain,
              max: 200,
              description: "트랜잭션 수, 지갑 나이, 청산 이력",
            },
            {
              label: "커뮤니티 참여",
              icon: "👥",
              value: trustScore.breakdown.community,
              max: 100,
              description: "DAO 투표, 거버넌스 참여",
            },
            {
              label: "기관 검증",
              icon: "🏛️",
              value: trustScore.breakdown.institutional,
              max: 250,
              description: "Gitcoin Passport, 파트너 인증",
            },
            {
              label: "보안 행동",
              icon: "🛡️",
              value: trustScore.breakdown.security,
              max: 50,
              description: "안전한 거래 습관, 보안 설정",
            },
          ].map((item, idx) => {
            const percentage = (item.value / item.max) * 100

            return (
              <div key={idx} className="border-b border-slate-700 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-slate-100">{item.label}</div>
                      <div className="text-xs text-slate-400">{item.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-100">
                      {item.value} / {item.max}
                    </div>
                    <div className="text-xs text-slate-400">{percentage.toFixed(0)}%</div>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="bg-teal-500 h-2 rounded-full"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
