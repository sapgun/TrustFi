"use client"

import { motion } from "framer-motion"
import { Layers, TrendingUp, Zap, DollarSign, Users } from "lucide-react"

export default function MultiLayerArchitecture() {
  const layers = [
    {
      name: "Avalanche",
      role: "기업용 프라이빗 서브넷",
      icon: "🏔️",
      color: "from-red-500/20 to-red-500/5 border-red-500/30",
      metrics: {
        tps: "4,500",
        latency: "< 2초",
        cost: "초저가",
      },
      useCase: "기업 Trust Score 관리",
      why: "커스텀 서브넷으로 기업별 독립 체인 구축 가능",
    },
    {
      name: "Solana SVM",
      role: "고빈도 거래 처리",
      icon: "⚡",
      color: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
      metrics: {
        tps: "65,000",
        latency: "< 400ms",
        cost: "$0.00025",
      },
      useCase: "실시간 Trust Score 업데이트",
      why: "초고속 처리로 대량 트랜잭션 실시간 분석",
    },
    {
      name: "OP Stack",
      role: "저렴한 가스비",
      icon: "🔴",
      color: "from-red-400/20 to-red-400/5 border-red-400/30",
      metrics: {
        tps: "2,000",
        latency: "< 1초",
        cost: "95% 절감",
      },
      useCase: "소액 거래 및 마이크로론",
      why: "Optimistic Rollup으로 가스비 대폭 절감",
    },
    {
      name: "Superchain",
      role: "크로스체인 유동성",
      icon: "🔗",
      color: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
      metrics: {
        tps: "통합",
        latency: "즉시",
        cost: "최적화",
      },
      useCase: "멀티체인 자산 통합",
      why: "OP Stack 체인 간 네이티브 상호운용성",
    },
    {
      name: "Algorand",
      role: "즉시 완결성",
      icon: "◆",
      color: "from-teal-500/20 to-teal-500/5 border-teal-500/30",
      metrics: {
        tps: "6,000",
        latency: "< 4.5초",
        cost: "$0.001",
      },
      useCase: "금융 상품 결제",
      why: "Pure PoS로 즉시 완결성 보장, 금융 규제 준수",
    },
    {
      name: "Aptos",
      role: "Move 언어 보안",
      icon: "🛡️",
      color: "from-green-500/20 to-green-500/5 border-green-500/30",
      metrics: {
        tps: "160,000",
        latency: "< 1초",
        cost: "초저가",
      },
      useCase: "스마트 컨트랙트 보안",
      why: "Move 언어로 자산 안전성 극대화",
    },
  ]

  const expectedImpact = [
    {
      icon: Users,
      metric: "10억+",
      label: "사용자 도달 범위",
      desc: "6개 레이어 통합",
    },
    {
      icon: Zap,
      metric: "100만 TPS",
      label: "총 처리 용량",
      desc: "병렬 처리",
    },
    {
      icon: DollarSign,
      metric: "99%",
      label: "가스비 절감",
      desc: "최적 레이어 자동 선택",
    },
    {
      icon: TrendingUp,
      metric: "24/7",
      label: "글로벌 운영",
      desc: "지역별 최적화",
    },
  ]

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">다중레이어 확장</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            6개 레이어로 구축하는
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              글로벌 금융 인프라
            </span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            각 프로토콜의 강점을 활용하여 최적의 성능, 보안, 비용 효율성을 달성합니다
          </p>
        </motion.div>

        {/* Layer Architecture */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {layers.map((layer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${layer.color} border rounded-2xl p-6 hover:scale-105 transition-transform duration-300`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{layer.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white">{layer.name}</h3>
                  <p className="text-sm text-slate-400">{layer.role}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-slate-950/50 rounded-xl">
                <div>
                  <div className="text-xs text-slate-500 mb-1">TPS</div>
                  <div className="text-sm font-bold text-white">{layer.metrics.tps}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">지연</div>
                  <div className="text-sm font-bold text-white">{layer.metrics.latency}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">비용</div>
                  <div className="text-sm font-bold text-white">{layer.metrics.cost}</div>
                </div>
              </div>

              {/* Use Case */}
              <div className="mb-3">
                <div className="text-xs text-slate-500 mb-1">활용 사례</div>
                <div className="text-sm font-semibold text-white">{layer.useCase}</div>
              </div>

              {/* Why */}
              <div className="p-3 bg-slate-950/30 rounded-lg border border-slate-800">
                <div className="text-xs text-teal-400 font-semibold mb-1">선택 이유</div>
                <p className="text-xs text-slate-300">{layer.why}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expected Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">기대 효과</h3>

          <div className="grid md:grid-cols-4 gap-8">
            {expectedImpact.map((impact, idx) => {
              const Icon = impact.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{impact.metric}</div>
                  <div className="text-lg font-semibold text-slate-300 mb-1">{impact.label}</div>
                  <div className="text-sm text-slate-500">{impact.desc}</div>
                </motion.div>
              )
            })}
          </div>

          {/* Architecture Diagram */}
          <div className="mt-16 p-8 bg-slate-950/50 rounded-2xl border border-slate-800">
            <h4 className="text-xl font-bold text-white text-center mb-8">레이어 아키텍처</h4>

            <div className="flex flex-col gap-4">
              {/* Application Layer */}
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
                <div className="text-center text-white font-semibold">TrustFi Application Layer</div>
                <div className="text-center text-xs text-slate-400 mt-1">통합 API & 스마트 라우팅</div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500/50 to-transparent" />
              </div>

              {/* Protocol Layers */}
              <div className="grid grid-cols-3 gap-4">
                {layers.slice(0, 3).map((layer, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center">
                    <div className="text-2xl mb-1">{layer.icon}</div>
                    <div className="text-sm font-semibold text-white">{layer.name}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {layers.slice(3, 6).map((layer, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-center">
                    <div className="text-2xl mb-1">{layer.icon}</div>
                    <div className="text-sm font-semibold text-white">{layer.name}</div>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-transparent to-teal-500/50" />
              </div>

              {/* Base Layer */}
              <div className="p-4 bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/30 rounded-xl">
                <div className="text-center text-white font-semibold">Chainlink CCIP & LayerZero</div>
                <div className="text-center text-xs text-slate-400 mt-1">크로스체인 메시징 & 브리징</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
