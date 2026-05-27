"use client"

import { Shield, TrendingUp, Building2, Lock, Users, RefreshCw, ArrowRight, Info } from "lucide-react"
import { motion } from "framer-motion"

export default function PoolLineup() {
  const pools = [
    {
      tier: "Tier 1",
      name: "TrustStarter Pool",
      badge: "입문형",
      badgeEn: "Beginner",
      level: "Bronze · Silver",
      type: "저위험 보호형",
      typeEn: "Low Risk Protected",
      apy: "3-5%",
      structure: "Fixed Yield",
      partners: ["Aave", "Compound", "Sommelier"],
      icon: Shield,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-950/30 to-slate-900",
      borderColor: "border-orange-500/30",
      features: ["리스크 최소화", "AI Risk < 30 가중 이자", "안전한 입문 단계"],
    },
    {
      tier: "Tier 2",
      name: "TrustGrow Pool",
      badge: "성장형",
      badgeEn: "Growth",
      level: "Gold+",
      type: "LST 기반 성장형",
      typeEn: "LST Based Growth",
      apy: "10-14%",
      structure: "Variable Yield",
      partners: ["Lido", "Swell", "Pendle"],
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-950/30 to-slate-900",
      borderColor: "border-yellow-500/30",
      features: ["LST 리워드 + YT 복합", "Trust Score 750+ gas 면제", "자본 효율 강화"],
    },
    {
      tier: "Tier 3",
      name: "TrustAlliance Pool",
      badge: "기관형",
      badgeEn: "Institutional",
      level: "Platinum",
      type: "RWA 연동형",
      typeEn: "RWA Connected",
      apy: "12-20%",
      structure: "RWA + Bond",
      partners: ["Circle", "Ondo", "BlackRock BUIDL"],
      icon: Building2,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-950/30 to-slate-900",
      borderColor: "border-purple-500/30",
      features: ["KYC 완전 통과자 전용", "실물 자산 연동", "LRT 보상"],
    },
    {
      tier: "Tier 4",
      name: "TrustVault Pool",
      badge: "DAO",
      badgeEn: "DAO",
      level: "All Users",
      type: "거버넌스 Vault",
      typeEn: "Governance Vault",
      apy: "3% + 1%",
      structure: "Base + Bonus",
      partners: ["TrustFi DAO"],
      icon: Lock,
      color: "from-teal-500 to-cyan-500",
      bgColor: "from-teal-950/30 to-slate-900",
      borderColor: "border-teal-500/30",
      features: ["TPT 스테이킹", "리더십 보너스", "ReTrust 점수 반영"],
    },
    {
      tier: "Tier 5",
      name: "TrustPartner Pool",
      badge: "협업형",
      badgeEn: "Partnership",
      level: "External",
      type: "크로스 프로토콜",
      typeEn: "Cross Protocol",
      apy: "Variable",
      structure: "Integration",
      partners: ["Blast", "Base", "Arbitrum"],
      icon: Users,
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-950/30 to-slate-900",
      borderColor: "border-blue-500/30",
      features: ["외부 Pool Wrapper", "Trust Score Oracle 반영", "DAO 인센티브"],
    },
    {
      tier: "Tier 6",
      name: "ReTrust Reinjection Pool",
      badge: "재투자",
      badgeEn: "Reinvestment",
      level: "Network",
      type: "보상 재분배",
      typeEn: "Reward Redistribution",
      apy: "Auto",
      structure: "ReFlow",
      partners: ["TrustDAO Treasury"],
      icon: RefreshCw,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-950/30 to-slate-900",
      borderColor: "border-green-500/30",
      features: ["수익 재투자", "DAO 운영비", "리더보드 풀 환류"],
    },
  ]

  const accessPolicy = [
    { tier: "Bronze", pools: "Starter", apr: "3-5%", risk: "AI Risk < 30" },
    { tier: "Silver", pools: "Starter / Vault", apr: "5-8%", risk: "AI Risk < 40" },
    { tier: "Gold", pools: "Grow / Vault", apr: "10-14%", risk: "AI Risk < 50" },
    { tier: "Platinum", pools: "All Pools", apr: "12-20% + RWA", risk: "Full KYC" },
  ]

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-950/20 via-transparent to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-6">
            <span className="text-teal-400 font-semibold">Trust-Based Pool Lineup</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">신뢰 기반 Pool 전략</h2>
          <p className="text-sm text-slate-500/70 mb-4">Trust-Based Pool Strategy</p>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Trust Score에 따라 접근 가능한 자산 그룹과 수익률이 차등화되는 6단계 Pool 구조
          </p>
          <p className="text-sm text-slate-500/70 max-w-3xl mx-auto">
            6-tier pool structure with differentiated access and yields based on Trust Score
          </p>
        </motion.div>

        {/* Pool Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pools.map((pool, idx) => {
            const Icon = pool.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${pool.bgColor} border ${pool.borderColor} rounded-xl p-6 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">{pool.tier}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{pool.name}</h3>
                    <div
                      className={`inline-block px-2 py-1 bg-gradient-to-r ${pool.color} rounded text-xs font-semibold text-white`}
                    >
                      {pool.badge}
                    </div>
                    <div className="text-xs text-slate-500/70 ml-1">{pool.badgeEn}</div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pool.color} bg-opacity-20 flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">접근 레벨</div>
                    <div className="text-sm font-semibold text-white">{pool.level}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">유형</div>
                    <div className="text-sm text-slate-400">{pool.type}</div>
                    <div className="text-xs text-slate-500/70">{pool.typeEn}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">APY</div>
                      <div className="text-2xl font-bold text-teal-400">{pool.apy}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 mb-1">구조</div>
                      <div className="text-sm text-slate-400">{pool.structure}</div>
                    </div>
                  </div>
                </div>

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

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {pool.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5" />
                      <span className="text-xs text-slate-400">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                  자세히 보기
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Access Policy Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Pool 접근 정책</h3>
          <p className="text-sm text-slate-500/70 mb-6">Pool Access Policy</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Trust Tier</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">접근 가능 Pool</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">월 이자율</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">위험도 관리</th>
                </tr>
              </thead>
              <tbody>
                {accessPolicy.map((policy, idx) => (
                  <tr key={idx} className="border-b border-slate-800/50">
                    <td className="py-4 px-4">
                      <span className="font-semibold text-white">{policy.tier}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{policy.pools}</td>
                    <td className="py-4 px-4 text-teal-400 font-semibold">{policy.apr}</td>
                    <td className="py-4 px-4 text-slate-400 text-sm">{policy.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-2 text-center">Pool Layering 구조</h3>
          <p className="text-sm text-slate-500/70 mb-8 text-center">Pool Layering Structure</p>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-white font-semibold">User Trust Tier</div>
                <div className="text-xs text-slate-500/70">사용자 신뢰 등급</div>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-6 h-6 text-teal-400 rotate-90" />
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-white font-semibold mb-3 text-center">Vault Access Layer</div>
                <div className="space-y-2 text-sm text-slate-400">
                  <div>├─ TrustStarter (Low Risk)</div>
                  <div>├─ TrustGrow (Yield x LST)</div>
                  <div>├─ TrustAlliance (RWA)</div>
                  <div>├─ TrustVault (DAO / Points)</div>
                  <div>├─ TrustPartner (협업)</div>
                  <div>└─ ReTrust Reinjection (Rewards ReFlow)</div>
                </div>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-6 h-6 text-teal-400 rotate-90" />
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <div className="text-white font-semibold">Governance Layer</div>
                <div className="text-xs text-slate-500/70 mt-1">DAO 거버넌스 및 Treasury 투표</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-2 text-center">차별화 포인트</h3>
          <p className="text-sm text-slate-500/70 mb-8 text-center">Key Differentiators</p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-2">접근 기준</div>
              <div className="text-xs text-slate-500/70 mb-2">Access Criteria</div>
              <div className="text-white font-semibold mb-1">신뢰 기반 접근</div>
              <div className="text-xs text-slate-400">Trust Score Gate</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-2">보안 체계</div>
              <div className="text-xs text-slate-500/70 mb-2">Security</div>
              <div className="text-white font-semibold mb-1">6-Layer Security OS</div>
              <div className="text-xs text-slate-400">Auto Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-2">수익 분배</div>
              <div className="text-xs text-slate-500/70 mb-2">Yield Distribution</div>
              <div className="text-white font-semibold mb-1">Trust Point 비례</div>
              <div className="text-xs text-slate-400">Vault-Tier Based</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-2">지속 가능성</div>
              <div className="text-xs text-slate-500/70 mb-2">Sustainability</div>
              <div className="text-white font-semibold mb-1">월 리셋 구조</div>
              <div className="text-xs text-slate-400">Monthly Reset</div>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-purple-950/30 border border-purple-800/30 rounded-xl p-6 text-center"
        >
          <Info className="w-12 h-12 text-purple-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Pool 시스템은 단계적으로 출시됩니다</h3>
          <p className="text-sm text-slate-500/70 mb-2">Pool system will be launched in phases</p>
          <p className="text-slate-400">Q4 2025: Starter/Grow → Q1 2026: Alliance → Q2 2026: Partner → Q3 2026: DAO</p>
        </motion.div>
      </div>
    </section>
  )
}
