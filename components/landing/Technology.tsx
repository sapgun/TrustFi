"use client"

import { motion } from "framer-motion"
import { Layers, Zap, Shield, Network } from "lucide-react"

export default function Technology() {
  const techStack = [
    {
      category: "크로스체인 메시징",
      icon: Network,
      color: "teal",
      technologies: [
        {
          name: "Chainlink CCIP",
          desc: "안전한 크로스체인 토큰 전송",
          status: "구현 예정",
        },
        {
          name: "LayerZero",
          desc: "옴니체인 메시징 프로토콜",
          status: "구현 예정",
        },
        {
          name: "NEAR Intent",
          desc: "사용자 의도 기반 트랜잭션 실행",
          status: "연구 중",
        },
      ],
    },
    {
      category: "보안 & 신원",
      icon: Shield,
      color: "blue",
      technologies: [
        {
          name: "6-Layer Security OS",
          desc: "AI 기반 실시간 위험 감지",
          status: "운영 중",
        },
        {
          name: "idOS Integration",
          desc: "프라이버시 보호 신원 인증",
          status: "구현 예정",
        },
        {
          name: "Trust Score NFT",
          desc: "온체인 신용 증명",
          status: "운영 중",
        },
      ],
    },
    {
      category: "데이터 & 오라클",
      icon: Layers,
      color: "purple",
      technologies: [
        {
          name: "Chainlink Data Feeds",
          desc: "실시간 가격 및 데이터 오라클",
          status: "구현 예정",
        },
        {
          name: "BDACS Analytics",
          desc: "온체인 데이터 분석",
          status: "운영 중",
        },
        {
          name: "CreditLink",
          desc: "탈중앙화 신용 데이터",
          status: "구현 예정",
        },
      ],
    },
  ]

  const statusColors = {
    "운영 중": "bg-green-500/10 text-green-400 border-green-500/30",
    "구현 예정": "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "연구 중": "bg-orange-500/10 text-orange-400 border-orange-500/30",
  }

  const colorClasses = {
    teal: "from-teal-500/20 to-teal-500/5 border-teal-500/30",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  }

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">기술 스택</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            최첨단 Web3 기술로
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              구축하는 미래
            </span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            업계 최고의 인프라와 프로토콜을 활용하여
            <br />
            안전하고 확장 가능한 크로스체인 금융 플랫폼을 만듭니다
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {techStack.map((stack, idx) => {
            const Icon = stack.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`bg-gradient-to-br ${
                  colorClasses[stack.color as keyof typeof colorClasses]
                } border rounded-2xl p-8`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{stack.category}</h3>
                </div>

                <div className="space-y-4">
                  {stack.technologies.map((tech, techIdx) => (
                    <div key={techIdx} className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-white">{tech.name}</h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${
                            statusColors[tech.status as keyof typeof statusColors]
                          }`}
                        >
                          {tech.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{tech.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">개발 로드맵</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quarter: "2025 Q2",
                title: "Chainlink CCIP 통합",
                items: ["크로스체인 토큰 전송", "Data Feeds 연동", "Automation 구현"],
              },
              {
                quarter: "2025 Q3",
                title: "LayerZero & idOS",
                items: ["옴니체인 메시징", "탈중앙화 신원 인증", "CreditLink 통합"],
              },
              {
                quarter: "2025 Q4",
                title: "NEAR Intent",
                items: ["의도 기반 트랜잭션", "네오뱅크 출시", "금융 상품 론칭"],
              },
            ].map((phase, idx) => (
              <div key={idx} className="relative">
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-slate-700 to-transparent" />
                )}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
                  <div className="text-teal-400 font-semibold mb-2">{phase.quarter}</div>
                  <h4 className="text-xl font-bold text-white mb-4">{phase.title}</h4>
                  <ul className="space-y-2">
                    {phase.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
