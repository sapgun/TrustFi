"use client"

import { Shield, TrendingUp, Building2, Lock, Users, RefreshCw, Info, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function PoolsPage() {
  const [selectedPool, setSelectedPool] = useState<number | null>(null)

  const pools = [
    {
      tier: "Tier 1",
      name: "TrustStarter Pool",
      badge: "입문형",
      level: "Bronze · Silver",
      type: "저위험 보호형 (Fixed Yield)",
      apy: "3-5%",
      tvl: "$50M",
      minDeposit: "100 USDC",
      lockPeriod: "없음",
      partners: ["Aave", "Compound", "Sommelier"],
      icon: Shield,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-950/30 to-slate-900",
      borderColor: "border-orange-500/30",
      description: "안전한 입문형 Vault로 리스크를 최소화하고 신뢰를 쌓으며 수익을 익히는 단계입니다.",
      features: ["리스크 최소화", "AI Risk < 30 가중 이자", "안전한 입문 단계", "언제든 출금 가능"],
      requirements: ["Trust Score 20+", "AI Risk < 30"],
    },
    {
      tier: "Tier 2",
      name: "TrustGrow Pool",
      badge: "성장형",
      level: "Gold+",
      type: "LST 기반 성장형 (Variable Yield)",
      apy: "10-14%",
      tvl: "$85M",
      minDeposit: "0.1 ETH",
      lockPeriod: "7일",
      partners: ["Lido", "Swell", "Pendle"],
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-950/30 to-slate-900",
      borderColor: "border-yellow-500/30",
      description: "LST 리워드와 YT 복합 전략으로 신뢰에 따른 자본 효율을 강화하는 Pool입니다.",
      features: ["LST 리워드 + YT 복합", "Trust Score 750+ gas 면제", "자본 효율 강화", "Pendle 수익 최적화"],
      requirements: ["Trust Score 50+", "Gold Tier", "AI Risk < 50"],
    },
    {
      tier: "Tier 3",
      name: "TrustAlliance Pool",
      badge: "기관형",
      level: "Platinum",
      type: "RWA 연동형 (Real-World Assets)",
      apy: "12-20%",
      tvl: "$200M",
      minDeposit: "10,000 USDC",
      lockPeriod: "30일",
      partners: ["Circle", "Ondo", "BlackRock BUIDL"],
      icon: Building2,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-950/30 to-slate-900",
      borderColor: "border-purple-500/30",
      description: "실물 자본과 디지털 신뢰를 연결하는 기관 등급 사용자 전용 Pool입니다.",
      features: ["KYC 완전 통과자 전용", "실물 자산 연동", "LRT 보상", "US Treasuries 접근"],
      requirements: ["Trust Score 80+", "Platinum Tier", "Full KYC"],
    },
    {
      tier: "Tier 4",
      name: "TrustVault Pool",
      badge: "DAO",
      level: "All Users",
      type: "거버넌스 Vault (DAO Operated)",
      apy: "3% + 1%",
      tvl: "$30M",
      minDeposit: "50 USDC",
      lockPeriod: "없음",
      partners: ["TrustFi DAO"],
      icon: Lock,
      color: "from-teal-500 to-cyan-500",
      bgColor: "from-teal-950/30 to-slate-900",
      borderColor: "border-teal-500/30",
      description: "내부 엔진 및 DAO 오퍼레이션용 금고로 거버넌스 참여가 가능합니다.",
      features: ["TPT 스테이킹", "리더십 보너스", "ReTrust 점수 반영", "거버넌스 투표권"],
      requirements: ["Trust Score 20+"],
    },
    {
      tier: "Tier 5",
      name: "TrustPartner Pool",
      badge: "협업형",
      level: "External",
      type: "크로스 프로토콜 (Cross Protocol)",
      apy: "Variable",
      tvl: "$120M",
      minDeposit: "Variable",
      lockPeriod: "Variable",
      partners: ["Blast", "Base", "Arbitrum"],
      icon: Users,
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-950/30 to-slate-900",
      borderColor: "border-blue-500/30",
      description: "외부 프로젝트 협력 Pool로 Trust Score Oracle이 반영됩니다.",
      features: ["외부 Pool Wrapper", "Trust Score Oracle 반영", "DAO 인센티브", "Gas sharing"],
      requirements: ["Trust Score 30+", "Partner Protocol Access"],
    },
    {
      tier: "Tier 6",
      name: "ReTrust Reinjection Pool",
      badge: "재투자",
      level: "Network",
      type: "보상 재분배 (Reward Redistribution)",
      apy: "Auto",
      tvl: "$15M",
      minDeposit: "자동",
      lockPeriod: "자동",
      partners: ["TrustDAO Treasury"],
      icon: RefreshCw,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-950/30 to-slate-900",
      borderColor: "border-green-500/30",
      description: "플랫폼 내 모든 이자/수익의 일부를 재투자하고 DAO로 재분배합니다.",
      features: ["수익 재투자", "DAO 운영비", "리더보드 풀 환류", "자동 재분배"],
      requirements: ["자동 참여"],
    },
  ]

  const userStats = {
    trustScore: 65,
    tier: "Gold",
    accessiblePools: 4,
    totalDeposited: "$5,240",
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Trust-Based Pools</h1>
          <p className="text-sm text-slate-500/70 mb-4">신뢰 기반 Pool 라인업</p>
          <p className="text-slate-400">Trust Score에 따라 접근 가능한 Pool과 수익률이 차등화됩니다</p>
          <p className="text-xs text-slate-500/70">Access and yields are differentiated based on Trust Score</p>
        </div>

        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-teal-950/50 to-slate-900 border-2 border-teal-500/50 rounded-xl p-6 mb-8"
        >
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-slate-400 mb-1">Trust Score</div>
              <div className="text-2xl font-bold text-white">{userStats.trustScore}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">현재 티어</div>
              <div className="text-2xl font-bold text-yellow-400">{userStats.tier}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">접근 가능 Pool</div>
              <div className="text-2xl font-bold text-teal-400">{userStats.accessiblePools}/6</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">총 예치액</div>
              <div className="text-2xl font-bold text-white">{userStats.totalDeposited}</div>
            </div>
          </div>
        </motion.div>

        {/* Pool Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {pools.map((pool, idx) => {
            const Icon = pool.icon
            const isAccessible = idx < userStats.accessiblePools
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${pool.bgColor} border ${pool.borderColor} rounded-xl p-6 ${
                  isAccessible ? "hover:shadow-xl hover:shadow-teal-500/10 cursor-pointer" : "opacity-50"
                } transition-all duration-300`}
                onClick={() => isAccessible && setSelectedPool(idx)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 mb-1">{pool.tier}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{pool.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`inline-block px-2 py-1 bg-gradient-to-r ${pool.color} rounded text-xs font-semibold text-white`}
                      >
                        {pool.badge}
                      </div>
                      {!isAccessible && (
                        <div className="inline-block px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs font-semibold text-red-400">
                          잠김
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-slate-400">{pool.level}</div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pool.color} bg-opacity-20 flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">APY</div>
                    <div className="text-lg font-bold text-teal-400">{pool.apy}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">TVL</div>
                    <div className="text-lg font-bold text-white">{pool.tvl}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">최소 예치</div>
                    <div className="text-sm text-slate-400">{pool.minDeposit}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 mb-4">{pool.description}</p>

                {/* Partners */}
                <div className="mb-4">
                  <div className="text-xs text-slate-500 mb-2">파트너</div>
                  <div className="flex flex-wrap gap-2">
                    {pool.partners.map((partner, partnerIdx) => (
                      <span key={partnerIdx} className="px-2 py-1 bg-slate-800/50 rounded text-xs text-slate-300">
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                {isAccessible ? (
                  <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    자세히 보기
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-slate-800 text-slate-500 font-semibold py-2 rounded-lg cursor-not-allowed"
                  >
                    Trust Score 부족
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Coming Soon */}
        <div className="bg-purple-950/30 border border-purple-800/30 rounded-xl p-6 text-center">
          <Info className="w-12 h-12 text-purple-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Pool 시스템은 단계적으로 출시됩니다</h3>
          <p className="text-sm text-slate-500/70 mb-2">Pool system will be launched in phases</p>
          <p className="text-slate-400">Q4 2025: Starter/Grow → Q1 2026: Alliance → Q2 2026: Partner → Q3 2026: DAO</p>
        </div>
      </div>
    </div>
  )
}
