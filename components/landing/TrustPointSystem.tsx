"use client"

import { motion } from "framer-motion"
import { Coins, DollarSign, ArrowRight, Zap, TrendingUp, Lock, Sparkles, Award, Target, Users } from "lucide-react"

export default function TrustPointSystem() {
  const pointEarning = [
    { action: "안전한 거래", points: "+10", icon: Zap },
    { action: "DeFi 참여", points: "+5~15", icon: TrendingUp },
    { action: "DAO 투표", points: "+5", icon: Users },
    { action: "피싱 차단", points: "+20", icon: Lock },
    { action: "30일 무위반", points: "+50", icon: Award },
  ]

  const cashoutTiers = [
    { tier: "Platinum", points: "≥ 900", rate: "0.02", min: "50", color: "from-purple-500 to-pink-500" },
    { tier: "Gold", points: "≥ 700", rate: "0.015", min: "30", color: "from-yellow-500 to-orange-500" },
    { tier: "Silver", points: "≥ 400", rate: "0.01", min: "10", color: "from-slate-400 to-slate-500" },
    { tier: "Bronze", points: "≥ 200", rate: "다음 달 이월", min: "-", color: "from-orange-700 to-orange-800" },
  ]

  const tptFeatures = [
    { title: "거버넌스 투표", desc: "보상률 및 정책 결정권", icon: Users },
    { title: "Vault 스테이킹", desc: "추가 보상 획득", icon: Lock },
    { title: "Trust Score 버프", desc: "점수 상승 가속화", icon: TrendingUp },
    { title: "파트너십 예치", desc: "유동성 가중치 기여", icon: Sparkles },
  ]

  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 via-black to-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2 mb-6"
          >
            <Coins className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-400">Trust Point Economy</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            Trust Point → USDC 캐시아웃
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm text-slate-500/70 mb-6"
          >
            Trust Point → USDC Cash-out & TPT Token
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            신뢰 행동을 <span className="text-teal-400 font-semibold">실제 자산</span>으로 전환
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-sm text-slate-500/70 max-w-3xl mx-auto"
          >
            Convert trust behavior into real assets
          </motion.p>
        </div>

        {/* Trust Point Earning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-2">Trust Point 획득 방법</h3>
            <p className="text-sm text-slate-500/70 mb-4">How to Earn Trust Points</p>
            <p className="text-slate-400">안전한 행동으로 포인트를 적립하세요</p>
            <p className="text-xs text-slate-500/70">Earn points through safe behavior</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-8">
            {pointEarning.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-950 border border-slate-800 hover:border-teal-500/50 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10"
                >
                  <Icon className="w-10 h-10 text-teal-400 mx-auto mb-4" />
                  <div className="text-white font-semibold mb-2">{item.action}</div>
                  <div className="text-2xl font-bold text-teal-400">{item.points}</div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-teal-950/50 to-slate-950 border border-teal-800/30 rounded-xl p-6 text-center"
          >
            <div className="text-slate-400 mb-2">월간 최대 획득 한도</div>
            <div className="text-xs text-slate-500/70 mb-2">Monthly Maximum Limit</div>
            <div className="text-4xl font-bold text-teal-400">1,000 TP</div>
          </motion.div>
        </motion.div>

        {/* USDC Cash-out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">USDC Cash-out</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">티어별 캐시아웃 조건</h3>
            <p className="text-sm text-slate-500/70 mb-4">Cash-out Conditions by Tier</p>
            <p className="text-slate-400">Trust Point를 USDC로 교환하세요</p>
            <p className="text-xs text-slate-500/70">Exchange Trust Points for USDC</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {cashoutTiers.map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-950 border border-slate-800 rounded-xl p-6"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} bg-opacity-10 flex items-center justify-center mb-4`}
                >
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{tier.tier}</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">월간 포인트</div>
                    <div className="text-lg font-semibold text-teal-400">{tier.points}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">교환 비율</div>
                    <div className="text-lg font-semibold text-white">{tier.rate} USDC</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">최소 캐시아웃</div>
                    <div className="text-lg font-semibold text-slate-400">{tier.min} USDC</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Example Calculation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-950/50 to-slate-950 border border-green-800/30 rounded-xl p-8"
          >
            <h4 className="text-xl font-bold text-white mb-6 text-center">캐시아웃 예시</h4>
            <p className="text-xs text-slate-500/70 mb-6 text-center">Cash-out Example</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">Gold League 사용자</div>
                <div className="text-3xl font-bold text-yellow-400">810 TP</div>
              </div>
              <ArrowRight className="w-8 h-8 text-green-400" />
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-2">교환 비율 (0.015)</div>
                <div className="text-3xl font-bold text-green-400">12.15 USDC</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* TPT Token */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Coming Soon</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">TPT 토큰 (TrustFi Point Token)</h3>
            <p className="text-sm text-slate-500/70 mb-4">TPT Token - TrustFi Point Token</p>
            <p className="text-slate-400">Trust Point를 거버넌스 토큰으로 전환</p>
            <p className="text-xs text-slate-500/70">Convert Trust Points to governance token</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Token Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-950/50 to-slate-950 border border-purple-800/30 rounded-xl p-8"
            >
              <h4 className="text-xl font-bold text-white mb-6">토큰 정보</h4>
              <p className="text-xs text-slate-500/70 mb-6">Token Information</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">총 발행량</span>
                  <span className="text-white font-semibold">1억 TPT</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">월간 발행</span>
                  <span className="text-white font-semibold">최대 200만</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">소각 정책</span>
                  <span className="text-white font-semibold">50% 소각</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">기반 체인</span>
                  <span className="text-white font-semibold">Ethereum + Base</span>
                </div>
              </div>
            </motion.div>

            {/* Token Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-950/50 to-slate-950 border border-teal-800/30 rounded-xl p-8"
            >
              <h4 className="text-xl font-bold text-white mb-6">토큰 유틸리티</h4>
              <p className="text-xs text-slate-500/70 mb-6">Token Utility</p>
              <div className="space-y-4">
                {tptFeatures.map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-slate-950 rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold mb-1">{feature.title}</div>
                        <div className="text-sm text-slate-400">{feature.desc}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Token Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-950 border border-slate-800 rounded-xl p-8"
          >
            <h4 className="text-xl font-bold text-white mb-8 text-center">토큰 스왑 플로우</h4>
            <p className="text-xs text-slate-500/70 mb-8 text-center">Token Swap Flow</p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-teal-500/20 flex items-center justify-center mx-auto mb-3">
                  <Coins className="w-10 h-10 text-teal-400" />
                </div>
                <div className="text-white font-semibold">Trust Point</div>
                <div className="text-xs text-slate-500/70">Off-chain Credit</div>
              </div>
              <ArrowRight className="w-8 h-8 text-purple-400" />
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                <div className="text-white font-semibold">TPT Mint</div>
                <div className="text-xs text-slate-500/70">On-chain Token</div>
              </div>
              <ArrowRight className="w-8 h-8 text-green-400" />
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-10 h-10 text-green-400" />
                </div>
                <div className="text-white font-semibold">DEX Swap</div>
                <div className="text-xs text-slate-500/70">TPT → USDC/ETH</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-950/50 via-teal-950/50 to-purple-950/50 border border-purple-800/30 rounded-xl p-8"
        >
          <h4 className="text-2xl font-bold text-white mb-8 text-center">ReTrust Model 로드맵</h4>
          <p className="text-sm text-slate-500/70 mb-8 text-center">ReTrust Model Roadmap</p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-teal-400 font-bold mb-2">Q4 2025</div>
              <div className="text-white font-semibold mb-2">β 버전</div>
              <div className="text-sm text-slate-400">오프체인 포인트 + Vault Claim</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold mb-2">Q1 2026</div>
              <div className="text-white font-semibold mb-2">TPT 발행</div>
              <div className="text-sm text-slate-400">포인트↔토큰 스왑</div>
            </div>
            <div className="text-center">
              <div className="text-teal-400 font-bold mb-2">Q2 2026</div>
              <div className="text-white font-semibold mb-2">완전 온체인화</div>
              <div className="text-sm text-slate-400">Vault + LST 통합</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold mb-2">Q3 2026</div>
              <div className="text-white font-semibold mb-2">TrustDAO</div>
              <div className="text-sm text-slate-400">거버넌스 투표 시작</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
