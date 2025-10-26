"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.2] tracking-tight">
            <span className="block mb-2">누구나</span>
            <span className="block mb-2">어떤 체인이든</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400">
              안전하게 한 번에
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-6 max-w-3xl mx-auto leading-relaxed">
            신뢰 기반 보상이 있는 보안 우선 멀티체인 게이트웨이
          </p>

          <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
            PASS 인증부터 온체인 참여까지, 가장 빠르고 안전한 Web3 온보딩
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/app/onboarding">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-teal-500 hover:bg-teal-400 text-black font-semibold text-lg rounded-lg transition-all flex items-center gap-2 justify-center"
              >
                지금 시작하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-transparent border border-slate-700 hover:border-slate-600 text-white font-semibold text-lg rounded-lg transition-all"
            >
              자세히 알아보기
            </motion.button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "99.9%", label: "신원 검증 성공률" },
              { value: "6-Layer", label: "보안 OS" },
              { value: "10+", label: "지원 체인" },
              { value: "$0", label: "온보딩 비용" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
