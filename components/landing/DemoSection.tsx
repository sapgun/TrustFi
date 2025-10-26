"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Play, Sparkles, Lock, Coins, ArrowRight } from "lucide-react"

export default function DemoSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-slate-950 to-black border-y border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-6">
            <Play className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-400">라이브 데모</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">30초면 충분합니다</h2>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            소셜 로그인부터 신뢰 점수 인증, 안전한 트랜잭션 실행까지
            <br />
            지금 바로 경험해보세요
          </p>

          <Link href="/demo">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xl rounded-lg transition-all shadow-lg shadow-teal-500/20"
            >
              <Play className="w-5 h-5" />
              데모 시작하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, title: "무료 온보딩", desc: "신용카드 없이 즉시 시작" },
            { icon: Lock, title: "6단계 보안", desc: "AI 기반 실시간 보호" },
            { icon: Coins, title: "행동 기반 보상", desc: "Trust Score NFT 획득" },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-teal-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
