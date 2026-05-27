"use client"

import { motion } from "framer-motion"
import { Network, Link2, Database, Shield, Zap, Globe, Lock } from "lucide-react"

export default function Ecosystem() {
  const partners = [
    {
      name: "BDACS",
      role: "블록체인 데이터 분석",
      icon: Database,
      color: "teal",
      description: "온체인 Trust Score 및 실시간 위험 분석",
    },
    {
      name: "우리은행",
      role: "전통 금융 인프라",
      icon: Shield,
      color: "blue",
      description: "오프체인 신용평가 및 금융 상품 제공",
    },
    {
      name: "Chainlink",
      role: "오라클 & CCIP",
      icon: Link2,
      color: "indigo",
      description: "크로스체인 메시징 및 데이터 오라클",
    },
    {
      name: "CreditLink",
      role: "신용 데이터",
      icon: Network,
      color: "purple",
      description: "탈중앙화 신용 데이터 통합",
    },
    {
      name: "idOS",
      role: "탈중앙화 신원",
      icon: Shield,
      color: "cyan",
      description: "프라이버시 보호 신원 인증",
    },
    {
      name: "LayerZero",
      role: "크로스체인 인프라",
      icon: Globe,
      color: "violet",
      description: "옴니체인 메시징 프로토콜",
    },
  ]

  const securityPartners = [
    {
      name: "PeckShield",
      role: "스마트 컨트랙트 보안",
      icon: Lock,
      color: "red",
      description: "스마트 컨트랙트 취약점 분석 및 보안 감사",
      impact: "컨트랙트 보안 강화",
    },
    {
      name: "GoPlus Security",
      role: "실시간 보안 API",
      icon: Shield,
      color: "orange",
      description: "토큰/NFT/dApp 실시간 보안 검사 및 피싱 감지",
      impact: "위험 감지 정확도 95%↑",
    },
    {
      name: "Arkham Intelligence",
      role: "온체인 인텔리전스",
      icon: Database,
      color: "amber",
      description: "지갑 주소 분석 및 자금 흐름 추적",
      impact: "의심 주소 자동 식별",
    },
  ]

  const colorClasses = {
    teal: "from-teal-500/20 to-teal-500/5 border-teal-500/30",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    indigo: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
    violet: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
    red: "from-red-500/20 to-red-500/5 border-red-500/30",
    orange: "from-orange-500/20 to-orange-500/5 border-orange-500/30",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
  }

  return (
    <section className="py-32 bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-6">
            <Network className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-400">생태계 파트너십</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            함께 만드는
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
              차세대 금융 인프라
            </span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            블록체인, 전통 금융, 그리고 Web3 인프라 리더들과의 전략적 협력을 통해
            <br />
            <span className="text-white font-semibold">실질적인 유틸리티와 지속 가능한 비즈니스</span>를 구축합니다
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {partners.map((partner, idx) => {
            const Icon = partner.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${
                  colorClasses[partner.color as keyof typeof colorClasses]
                } border rounded-2xl p-8 hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{partner.name}</h3>
                    <p className="text-sm text-slate-400">{partner.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{partner.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <Lock className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">보안 파트너십</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              업계 최고 수준의
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                보안 레이어 강화
              </span>
            </h3>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              PeckShield, GoPlus Security, Arkham Intelligence와의 기술 협력으로
              <br />
              <span className="text-white font-semibold">사용자 자산을 완벽하게 보호</span>합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {securityPartners.map((partner, idx) => {
              const Icon = partner.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`bg-gradient-to-br ${
                    colorClasses[partner.color as keyof typeof colorClasses]
                  } border rounded-2xl p-8 hover:scale-[1.02] transition-transform`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1">{partner.name}</h4>
                      <p className="text-sm text-slate-400">{partner.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{partner.description}</p>
                  <div className="flex items-center gap-2 text-xs font-medium text-white bg-white/5 px-3 py-2 rounded-lg">
                    <Zap className="w-3 h-3" />
                    {partner.impact}
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-10">
            <h4 className="text-2xl font-bold text-white mb-8 text-center">구체적인 보안 강화 효과</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  metric: "99.9%",
                  label: "스마트 컨트랙트 보안",
                  desc: "PeckShield 감사로 취약점 사전 차단",
                },
                {
                  metric: "95%↑",
                  label: "위험 감지 정확도",
                  desc: "GoPlus API로 실시간 위협 탐지",
                },
                {
                  metric: "100K+",
                  label: "위험 주소 DB",
                  desc: "Arkham으로 의심 주소 자동 식별",
                },
                {
                  metric: "< 1초",
                  label: "실시간 분석",
                  desc: "거래 전 즉시 보안 검사 완료",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center"
                >
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400 mb-2">
                    {item.metric}
                  </div>
                  <div className="text-white font-semibold mb-2">{item.label}</div>
                  <div className="text-sm text-slate-400">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-12 text-center"
        >
          <Zap className="w-16 h-16 text-teal-400 mx-auto mb-6" />
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            토크노믹스가 아닌
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
              실질적인 비즈니스 모델
            </span>
          </h3>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
            TrustFi는 단순한 보안 레이어나 온보딩 서비스를 넘어,
            <br />
            금융기관과의 B2B 파트너십과 사용자 대상 B2C 서비스를 통해
            <br />
            <span className="text-white font-semibold">지속 가능한 수익 모델</span>을 구축합니다
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "B2B API",
                desc: "금융기관에 Trust Score API 제공",
                value: "수수료 기반 수익",
              },
              {
                title: "B2C 서비스",
                desc: "사용자 대상 금융 상품 제공",
                value: "거래 수수료 수익",
              },
              {
                title: "낮은 토큰 의존도",
                desc: "실제 비즈니스로 지속 가능성 확보",
                value: "장기 성장 가능",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-6">
                <h4 className="font-semibold text-white text-lg mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm mb-3">{item.desc}</p>
                <div className="text-teal-400 font-medium text-sm">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
