"use client"

import { motion } from "framer-motion"
import { Trophy, Coins, TrendingUp, Shield, Users, Lock, Sparkles, ArrowRight, Star, Award, Target } from "lucide-react"

export default function RewardLayer() {
  const leaderboardTiers = [
    {
      name: "Platinum League",
      icon: Trophy,
      color: "from-purple-500 to-pink-500",
      reward: "40%",
      benefits: ["LST 리워드", "NFT 에어드랍", "Vault 우선 접근"],
    },
    {
      name: "Gold League",
      icon: Award,
      color: "from-yellow-500 to-orange-500",
      reward: "25%",
      benefits: ["LST 리워드", "Vault 접근"],
    },
    {
      name: "Silver League",
      icon: Star,
      color: "from-slate-400 to-slate-500",
      reward: "20%",
      benefits: ["USDC 보너스", "LP Pool 접근"],
    },
    {
      name: "Bronze League",
      icon: Target,
      color: "from-orange-700 to-orange-800",
      reward: "15%",
      benefits: ["NFT 배지", "Vault 접근권"],
    },
  ]

  const vaultPartners = [
    { name: "Lido", role: "유동성 스테이킹" },
    { name: "EigenLayer", role: "ReStaking" },
    { name: "Pendle", role: "수익 최적화" },
    { name: "Aave", role: "안전한 Lending" },
  ]

  const metrics = [
    { value: "10억+", label: "예상 사용자 도달", icon: Users },
    { value: "$10M+", label: "월간 보상 풀", icon: Coins },
    { value: "15%", label: "평균 APY", icon: TrendingUp },
    { value: "99.9%", label: "보안 등급", icon: Shield },
  ]

  return (
    <section className="py-32 bg-gradient-to-b from-black via-slate-950 to-black border-t border-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Phase 6: Reward Layer</span>
            <span className="text-xs text-slate-500/70">Phase 6: Reward Layer</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            Trust Score 리더보드 & Vault
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm text-slate-500/70 mb-6"
          >
            Trust Score Leaderboard & Vault
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            안전한 행동이 곧 자산화되는 <span className="text-purple-400 font-semibold">월간 보상 시스템</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-sm text-slate-500/70 max-w-3xl mx-auto"
          >
            Safe behavior becomes assets through monthly reward system
          </motion.p>
        </div>

        {/* Monthly Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-2">월간 Trust Score 리더보드</h3>
            <p className="text-sm text-slate-500/70 mb-4">Monthly Trust Score Leaderboard</p>
            <p className="text-slate-400">매달 1일 00:00 UTC 기준 초기화 및 보상 분배</p>
            <p className="text-xs text-slate-500/70">Reset and reward distribution on 1st of each month at 00:00 UTC</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {leaderboardTiers.map((tier, idx) => {
              const Icon = tier.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-slate-950 border border-slate-800 hover:border-purple-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tier.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{tier.name}</h4>
                  <div className="text-3xl font-bold text-purple-400 mb-4">{tier.reward}</div>
                  <div className="space-y-2">
                    {tier.benefits.map((benefit, benefitIdx) => (
                      <div key={benefitIdx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span className="text-sm text-slate-400">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Scoring Criteria */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-xl p-8"
          >
            <h4 className="text-xl font-bold text-white mb-6 text-center">평가 지표</h4>
            <p className="text-xs text-slate-500/70 mb-6 text-center">Evaluation Metrics</p>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">25%</div>
                <div className="text-sm text-slate-400">안전 거래 비율</div>
                <div className="text-xs text-slate-500/70">Safe Transaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">15%</div>
                <div className="text-sm text-slate-400">DeFi 활동</div>
                <div className="text-xs text-slate-500/70">DeFi Activity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">10%</div>
                <div className="text-sm text-slate-400">커뮤니티 참여</div>
                <div className="text-xs text-slate-500/70">Community Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">20%</div>
                <div className="text-sm text-slate-400">보안 대응</div>
                <div className="text-xs text-slate-500/70">Security Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">30%</div>
                <div className="text-sm text-slate-400">점수 변화량</div>
                <div className="text-xs text-slate-500/70">Score Change</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Vault */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2 mb-6">
              <Lock className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-teal-400">Trust Vault</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">스테이킹 & LST 확장</h3>
            <p className="text-sm text-slate-500/70 mb-4">Staking & LST Expansion</p>
            <p className="text-slate-400">Trust Score가 높을수록 더 큰 스테이킹 혜택</p>
            <p className="text-xs text-slate-500/70">Higher Trust Score = Better staking benefits</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Vault Flow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-950/50 to-slate-950 border border-teal-800/30 rounded-xl p-8"
            >
              <h4 className="text-xl font-bold text-white mb-6">Trust Vault 흐름</h4>
              <p className="text-xs text-slate-500/70 mb-6">Trust Vault Flow</p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-400 font-bold">1</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">ETH/LST 예치</div>
                    <div className="text-xs text-slate-500/70 mb-1">Deposit ETH/LST</div>
                    <div className="text-sm text-slate-400">stETH, eETH, swETH 등 지원</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-teal-400 ml-4" />
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-400 font-bold">2</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">ReStaking</div>
                    <div className="text-sm text-slate-400">EigenLayer, Lido, Pendle 연계</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-teal-400 ml-4" />
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-400 font-bold">3</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">보상 분배</div>
                    <div className="text-xs text-slate-500/70 mb-1">Reward Distribution</div>
                    <div className="text-sm text-slate-400">Trust Score 기반 배율 적용</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vault Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-950/50 to-slate-950 border border-purple-800/30 rounded-xl p-8"
            >
              <h4 className="text-xl font-bold text-white mb-6">티어별 보상 배율</h4>
              <p className="text-xs text-slate-500/70 mb-6">Reward Multiplier by Tier</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-purple-500/30">
                  <div>
                    <div className="text-white font-semibold">Platinum</div>
                    <div className="text-xs text-slate-500/70">Platinum Tier</div>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">1.5x</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-700">
                  <div>
                    <div className="text-white font-semibold">Gold</div>
                    <div className="text-xs text-slate-500/70">Gold Tier</div>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">1.3x</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-700">
                  <div>
                    <div className="text-white font-semibold">Silver</div>
                    <div className="text-xs text-slate-500/70">Silver Tier</div>
                  </div>
                  <div className="text-2xl font-bold text-slate-400">1.1x</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-700">
                  <div>
                    <div className="text-white font-semibold">Bronze</div>
                    <div className="text-xs text-slate-500/70">Bronze Tier</div>
                  </div>
                  <div className="text-2xl font-bold text-orange-400">1.0x</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Partner Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-950 border border-slate-800 rounded-xl p-8"
          >
            <h4 className="text-lg font-semibold text-white mb-6 text-center">LST 파트너십</h4>
            <p className="text-xs text-slate-500/70 mb-6 text-center">LST Partnerships</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {vaultPartners.map((partner, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-teal-400">{partner.name[0]}</span>
                  </div>
                  <div className="text-white font-semibold mb-1">{partner.name}</div>
                  <div className="text-xs text-slate-400">{partner.role}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-950/50 via-teal-950/50 to-purple-950/50 border border-purple-800/30 rounded-xl p-8"
        >
          <h4 className="text-2xl font-bold text-white mb-2 text-center">기대 효과</h4>
          <p className="text-sm text-slate-500/70 mb-8 text-center">Expected Impact</p>
          <div className="grid md:grid-cols-4 gap-8">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon
              return (
                <div key={idx} className="text-center">
                  <Icon className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-sm text-slate-400">{metric.label}</div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
