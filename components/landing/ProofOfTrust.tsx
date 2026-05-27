"use client"

import { motion } from "framer-motion"
import { Activity, TrendingUp, Shield, Award, CheckCircle2 } from "lucide-react"

export default function ProofOfTrust() {
  const comparison = [
    {
      label: "Proof of Activity",
      icon: Activity,
      color: "slate",
      items: ["단순 활동량 측정", "거래 횟수 기반", "시빌 공격 취약", "질적 평가 부재"],
    },
    {
      label: "Proof of Trust",
      icon: Shield,
      color: "teal",
      items: ["활동의 질 평가", "신뢰도 종합 분석", "시빌 공격 방지", "평판 기반 검증"],
    },
  ]

  const trustComponents = [
    {
      icon: TrendingUp,
      title: "온체인 활동 분석",
      description: "거래 패턴, 토큰 보유, NFT 이력",
    },
    {
      icon: Shield,
      title: "보안 이력 평가",
      description: "의심스러운 활동 감지, 위험 점수",
    },
    {
      icon: Award,
      title: "커뮤니티 평판",
      description: "거래 상대방 피드백, 신뢰 네트워크",
    },
  ]

  const useCases = [
    "DeFi 프로토콜 접근 권한",
    "마이크로론 자격 (소액 무담보)",
    "하이브리드 담보 대출 금리 우대",
    "거버넌스 투표 가중치",
    "수수료 할인 혜택",
    "프리미엄 서비스 이용",
  ]

  return (
    <section className="py-32 bg-gradient-to-b from-black via-slate-950 to-black border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-semibold">
              혁신적 검증 메커니즘
              <span className="block text-xs opacity-70 mt-0.5">Innovative Verification Mechanism</span>
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Proof of Trust
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-2"
          >
            단순한 활동 증명을 넘어, 신뢰도 기반 검증으로
            <br />
            탈중앙화 신용 시스템의 새로운 표준을 제시합니다
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-base text-slate-500/70 max-w-3xl mx-auto leading-relaxed"
          >
            Beyond Simple Activity Proof, Trust-Based Verification
            <br />
            Setting a New Standard for Decentralized Credit Systems
          </motion.p>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {comparison.map((item, idx) => {
            const Icon = item.icon
            const isPoT = item.color === "teal"
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  isPoT
                    ? "bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-2 border-teal-500/50"
                    : "bg-slate-950 border border-slate-800"
                }`}
              >
                {isPoT && (
                  <div className="absolute -top-3 -right-3">
                    <span className="px-3 py-1 rounded-full bg-teal-500 text-black text-xs font-bold">TrustFi</span>
                  </div>
                )}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl ${
                      isPoT ? "bg-teal-500/20" : "bg-slate-800"
                    } flex items-center justify-center`}
                  >
                    <Icon className={`w-7 h-7 ${isPoT ? "text-teal-400" : "text-slate-400"}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{item.label}</h3>
                </div>
                <ul className="space-y-3">
                  {item.items.map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full ${
                          isPoT ? "bg-teal-500/20" : "bg-slate-800"
                        } flex items-center justify-center flex-shrink-0 mt-0.5`}
                      >
                        <div className={`w-2 h-2 rounded-full ${isPoT ? "bg-teal-400" : "bg-slate-500"}`} />
                      </div>
                      <span className={isPoT ? "text-slate-200" : "text-slate-400"}>{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Trust Components */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-2">Trust Score 구성 요소</h3>
          <p className="text-lg text-slate-500/70 text-center mb-12">Trust Score Components</p>
          <div className="grid md:grid-cols-3 gap-6">
            {trustComponents.map((component, idx) => {
              const Icon = component.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-teal-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-teal-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{component.title}</h4>
                  <p className="text-sm text-slate-500/70 mb-2">{component.titleEn}</p>
                  <p className="text-slate-400 text-sm mb-1">{component.description}</p>
                  <p className="text-slate-500/70 text-xs">{component.descriptionEn}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border border-teal-500/20 rounded-2xl p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-teal-400" />
            <h3 className="text-3xl font-bold text-white">Proof of Trust 활용</h3>
          </div>
          <p className="text-lg text-slate-500/70 mb-8 ml-11">Proof of Trust Use Cases</p>
          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 bg-slate-950/50 rounded-lg p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-slate-200">{useCase}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800">
            <p className="text-slate-300 text-center leading-relaxed mb-2">
              Trust Score NFT가 증명서 역할을 하며, 높은 신뢰도를 가진 사용자는
              <br />더 많은 금융 서비스와 혜택에 접근할 수 있습니다
            </p>
            <p className="text-sm text-slate-500/70 text-center leading-relaxed">
              Trust Score NFT serves as proof, and users with high trust
              <br />
              can access more financial services and benefits
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
