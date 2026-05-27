"use client"

import { motion } from "framer-motion"
import { Shield, Eye, EyeOff, Zap, Lock, Gift, CreditCard, Award } from "lucide-react"

export default function PrivacyModel() {
  return (
    <section className="py-32 bg-gradient-to-b from-black to-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6"
          >
            <Lock className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Privacy First</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            당신의 선택, 당신의 프라이버시
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            신원 인증과 혜택, 또는 익명성과 보안
            <br />
            <span className="text-purple-400 font-semibold">당신이 선택합니다</span>
          </motion.p>
        </div>

        {/* Two Tracks Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Track 1: TrustFi Core */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-teal-950/50 to-slate-950 border border-teal-500/30 rounded-2xl p-8 relative overflow-hidden group hover:border-teal-500/50 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">TrustFi Core</h3>
                  <p className="text-sm text-teal-400">신원 기반 신뢰</p>
                </div>
              </div>

              <p className="text-slate-300 mb-6">KYC 인증으로 Trust Score를 높이고 다양한 혜택을 받습니다</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Trust-to-Earn 리워드</div>
                    <div className="text-sm text-slate-400">활동에 따른 보상</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">NFT 티어 혜택</div>
                    <div className="text-sm text-slate-400">등급별 특별 혜택</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">금융 서비스 접근</div>
                    <div className="text-sm text-slate-400">대출, 신용카드 등</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-teal-500/20">
                <div className="text-sm text-slate-400">대상 사용자</div>
                <div className="text-white font-medium">Web3 입문자, 혜택 추구 사용자</div>
              </div>
            </div>
          </motion.div>

          {/* Track 2: TrustFi Shield */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-950/50 to-slate-950 border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden group hover:border-purple-500/50 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <EyeOff className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">TrustFi Shield</h3>
                  <p className="text-sm text-purple-400">익명 기반 보안</p>
                </div>
              </div>

              <p className="text-slate-300 mb-6">신원 인증 없이 최고 수준의 보안만 이용합니다</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">6-Layer Security OS</div>
                    <div className="text-sm text-slate-400">프리미엄 보안 구독</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">완전한 익명성</div>
                    <div className="text-sm text-slate-400">KYC 불필요</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">즉시 사용 가능</div>
                    <div className="text-sm text-slate-400">인증 절차 없음</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-500/20">
                <div className="text-sm text-slate-400">대상 사용자</div>
                <div className="text-white font-medium">Web3 네이티브, 고래, 프라이버시 중시</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trade-off Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-950 border border-slate-800 rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">명확한 트레이드오프</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-teal-400 font-semibold mb-3">✓ TrustFi Core 선택 시</div>
              <ul className="space-y-2 text-slate-300">
                <li>• Trust Score 기반 리워드 획득</li>
                <li>• NFT 티어 혜택 및 수수료 감면</li>
                <li>• 금융 서비스 접근 (대출, 신용카드)</li>
                <li>• 커뮤니티 거버넌스 참여</li>
              </ul>
            </div>
            <div>
              <div className="text-purple-400 font-semibold mb-3">✓ TrustFi Shield 선택 시</div>
              <ul className="space-y-2 text-slate-300">
                <li>• 완전한 익명성 보장</li>
                <li>• 최고 수준의 보안 기능</li>
                <li>• 월간/연간 구독료로 이용</li>
                <li>• 신원 인증 불필요</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Future: Zero-Knowledge Trust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-950/30 to-slate-950 border border-indigo-500/30 rounded-2xl p-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-400">Future Vision</span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4">Zero-Knowledge Trust</h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-6">
            영지식 증명(ZKP) 기술로 개인정보는 보호하면서
            <br />
            <span className="text-indigo-400 font-semibold">"나는 신뢰할 수 있는 사용자다"</span>만 증명합니다
          </p>

          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-slate-950/50 border border-indigo-500/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-indigo-400 mb-1">ZK-KYC</div>
              <div className="text-sm text-slate-400">신원 정보 비공개</div>
            </div>
            <div className="bg-slate-950/50 border border-indigo-500/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-indigo-400 mb-1">ZK-Score</div>
              <div className="text-sm text-slate-400">점수만 증명</div>
            </div>
            <div className="bg-slate-950/50 border border-indigo-500/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-indigo-400 mb-1">ZK-Access</div>
              <div className="text-sm text-slate-400">자격만 검증</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
