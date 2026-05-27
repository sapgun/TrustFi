"use client"

import { motion } from "framer-motion"
import { Award, TrendingUp, Shield, Coins } from "lucide-react"

interface TrustScoreCardProps {
  userData: {
    name: string
    trustScore: number
    tier: string
    tierColor: string
    nextTier: string
    pointsToNextTier: number
  }
  detailed?: boolean
}

export default function TrustScoreCard({ userData, detailed = false }: TrustScoreCardProps) {
  const getTierIcon = (tier: string) => {
    return <Award className="w-12 h-12 text-teal-400" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{userData.name}의 Trust Score</h2>
          <p className="text-slate-400">안전한 행동으로 신뢰를 쌓으세요</p>
        </div>
        <div>{getTierIcon(userData.tier)}</div>
      </div>

      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-teal-400 mb-2">{userData.trustScore}</div>
        <div className="inline-block px-4 py-2 rounded-full font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
          {userData.tier} Tier
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>{userData.tier}</span>
          <span>{userData.nextTier}</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${userData.trustScore % 100}%` }}
          />
        </div>
        <p className="text-sm text-slate-500 mt-2 text-center">
          {userData.nextTier} 티어까지 {userData.pointsToNextTier}점 남음
        </p>
      </div>

      {detailed && (
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { label: "안전한 거래", value: "24회", icon: Shield },
            { label: "차단된 위험", value: "3회", icon: TrendingUp },
            { label: "획득 보상", value: "120 USDC", icon: Coins },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
                <Icon className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
