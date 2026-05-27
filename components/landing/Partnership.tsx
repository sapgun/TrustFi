"use client"

import { motion } from "framer-motion"
import { Building2, Handshake, TrendingUp, Shield, Wallet, CreditCard } from "lucide-react"

export default function Partnership() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Handshake className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">전략적 파트너십</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">BDACS × 우리은행</h2>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            블록체인 기술과 전통 금융의 만남
            <br />
            <span className="text-white font-semibold">차세대 네오뱅크 모델</span>을 함께 만들어갑니다
          </p>
        </motion.div>

        {/* Partnership Visual */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">BDACS</h3>
            <p className="text-slate-400 text-sm mb-4">블록체인 데이터 분석</p>
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                온체인 Trust Score
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                실시간 위험 분석
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                멀티체인 통합
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
                <Handshake className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-slate-700 animate-spin-slow" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">우리은행</h3>
            <p className="text-slate-400 text-sm mb-4">전통 금융 인프라</p>
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                오프체인 신용평가
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                금융 상품 제공
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                규제 준수
              </div>
            </div>
          </motion.div>
        </div>

        {/* Neo Bank Model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">하이브리드 네오뱅크 모델</h3>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              온체인 Trust Score와 오프체인 신용점수를 결합한
              <br />
              차세대 금융 서비스 플랫폼
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CreditCard,
                title: "하이브리드 신용카드",
                desc: "온/오프체인 신용 통합",
                color: "teal",
              },
              {
                icon: Wallet,
                title: "스마트 대출",
                desc: "Trust Score 기반 한도",
                color: "blue",
              },
              {
                icon: Shield,
                title: "디지털 자산 보험",
                desc: "멀티체인 자산 보호",
                color: "purple",
              },
              {
                icon: TrendingUp,
                title: "투자 상품",
                desc: "맞춤형 포트폴리오",
                color: "orange",
              },
            ].map((item, idx) => {
              const Icon = item.icon
              const colorClasses = {
                teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
                blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
              }

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      colorClasses[item.color as keyof typeof colorClasses]
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-white text-lg mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-slate-700 rounded-full">
              <TrendingUp className="w-5 h-5 text-teal-400" />
              <span className="text-white font-medium">2025년 하반기 출시 예정</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
