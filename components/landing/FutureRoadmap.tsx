"use client"

import { motion } from "framer-motion"
import {
  CreditCard,
  Building2,
  Shield,
  Sparkles,
  ArrowRight,
  Users,
  Factory,
  Briefcase,
  Network,
  Coins,
  Wallet,
  TrendingUp,
  FileText,
  Zap,
  Globe,
} from "lucide-react"

export default function FutureRoadmap() {
  const financialProducts = [
    {
      icon: Wallet,
      title: "하이브리드 담보 대출",
      description: "온체인 + 오프체인 자산 담보, Trust Score 기반 금리 우대",
      features: ["암호화폐 담보", "부동산/주식 담보", "Trust Score 금리 할인"],
      color: "from-blue-500 to-cyan-500",
      badge: "메인 상품",
    },
    {
      icon: Coins,
      title: "마이크로론",
      description: "Trust Score 기반 소액 무담보 대출 ($100-$1,000)",
      features: ["빠른 승인", "담보 불필요", "높은 Trust Score 필요"],
      color: "from-green-500 to-emerald-500",
      badge: "소액 전용",
    },
    {
      icon: CreditCard,
      title: "DeFi 신용카드",
      description: "하이브리드 신용평가로 발급되는 Web3 신용카드",
      features: ["암호화폐 결제", "리워드 적립", "글로벌 사용"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "보험 상품",
      description: "신뢰도 기반 맞춤형 보험 및 보장",
      features: ["스마트 계약", "자동 청구", "투명한 보상"],
      color: "from-orange-500 to-amber-500",
    },
  ]

  const enterpriseUseCases = [
    {
      icon: Factory,
      title: "스타트업 투자 심사",
      description: "온체인 활동 기반 스타트업 신뢰도 평가",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Network,
      title: "공급망 금융",
      description: "거래 파트너의 신뢰도 기반 금융 서비스",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Briefcase,
      title: "기업 신용 대출",
      description: "투명한 온체인 데이터 기반 기업 대출",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Users,
      title: "DAO 평가",
      description: "탈중앙화 조직의 거버넌스 및 재무 건전성 평가",
      color: "from-orange-500 to-red-500",
    },
  ]

  const neoBonds = [
    {
      icon: Users,
      title: "개인 채권",
      description: "P2P 대출의 채권화",
      features: ["소액 투자 가능", "실시간 신용등급", "자동 이자 지급"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Factory,
      title: "기업 채권",
      description: "스타트업 성장 채권",
      features: ["투명한 재무 공개", "마일스톤 기반", "유동성 확보"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Building2,
      title: "기관 채권",
      description: "DAO 트레저리 채권",
      features: ["거버넌스 연동", "스마트 계약", "온체인 투명성"],
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section className="py-32 bg-black border-t border-slate-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-400">Coming Soon</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            하이브리드 신용평가 모델
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            온체인 Trust Score와 오프체인 신용점수를 결합하여
            <br />
            <span className="text-teal-400 font-semibold">차세대 금융 서비스</span>를 제공합니다
          </motion.p>
        </div>

        {/* Hybrid Model Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">온체인 Trust Score</h3>
              <p className="text-slate-400 text-sm">거래 내역, NFT 보유, 지갑 활동 등 블록체인 데이터 기반 신뢰도</p>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-4xl font-bold text-teal-400">+</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">오프체인 신용점수</h3>
              <p className="text-slate-400 text-sm">기존 금융 기관의 신용 정보, 소득, 자산 등 전통적 신용평가</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <ArrowRight className="w-6 h-6 text-teal-400 mx-auto mb-3" />
            <h4 className="text-2xl font-bold text-white mb-2">네오 신용평가 모델</h4>
            <p className="text-slate-300">Trust Score가 대출 한도와 금리를 결정하는 혁신적인 신용평가 시스템</p>
          </div>
        </motion.div>

        {/* Financial Products for Individuals */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-8 text-center"
          >
            개인 금융 상품
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-6">
            {financialProducts.map((product, idx) => {
              const Icon = product.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group bg-slate-950 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 relative"
                >
                  {product.badge && (
                    <div className="absolute -top-3 -right-3">
                      <span className="px-3 py-1 rounded-full bg-teal-500 text-black text-xs font-bold">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{product.title}</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">{product.description}</p>

                  <div className="space-y-2">
                    {product.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span className="text-sm text-slate-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Neo Bonds Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Next Generation</span>
            </motion.div>
            <h3 className="text-4xl font-bold text-white mb-4">Proof of Trust 기반 네오채권</h3>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              개인, 기업, 기관 모두가 발행 가능한 블록체인 기반 채권
            </p>
          </div>

          {/* Comparison Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-950 border border-slate-800 rounded-xl p-6"
            >
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                  <span className="text-slate-400">✕</span>
                </div>
                전통 채권
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-slate-400">
                  <span className="text-slate-600">•</span>
                  신용평가사 의존
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <span className="text-slate-600">•</span>
                  느린 등급 업데이트
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <span className="text-slate-600">•</span>
                  높은 발행 진입장벽
                </li>
                <li className="flex items-start gap-2 text-slate-400">
                  <span className="text-slate-600">•</span>
                  제한된 유동성
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/50 rounded-xl p-6"
            >
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                네오채권
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-slate-200">
                  <span className="text-purple-400">✓</span>
                  Trust Score 기반 자동 평가
                </li>
                <li className="flex items-start gap-2 text-slate-200">
                  <span className="text-purple-400">✓</span>
                  실시간 신용등급 업데이트
                </li>
                <li className="flex items-start gap-2 text-slate-200">
                  <span className="text-purple-400">✓</span>
                  낮은 발행 진입장벽
                </li>
                <li className="flex items-start gap-2 text-slate-200">
                  <span className="text-purple-400">✓</span>
                  24/7 글로벌 유동성
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Neo Bond Types */}
          <div className="grid md:grid-cols-3 gap-6">
            {neoBonds.map((bond, idx) => {
              const Icon = bond.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-slate-950 border border-slate-800 hover:border-purple-500/50 rounded-xl p-6 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${bond.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{bond.title}</h4>
                  <p className="text-slate-400 mb-4 text-sm">{bond.description}</p>
                  <div className="space-y-2">
                    {bond.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-purple-400" />
                        <span className="text-xs text-slate-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-purple-950/50 to-pink-950/50 border border-purple-800/30 rounded-xl p-8"
          >
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">실시간</div>
                <div className="text-sm text-slate-400">신용등급 업데이트</div>
              </div>
              <div>
                <Globe className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-slate-400">글로벌 거래</div>
              </div>
              <div>
                <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-slate-400">온체인 투명성</div>
              </div>
              <div>
                <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">즉시</div>
                <div className="text-sm text-slate-400">이자 지급</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enterprise Trust Score Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-950/50 to-slate-950 border border-purple-800/30 rounded-2xl p-8 md:p-12 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">전통적 기업 신용평가</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-xs text-slate-400">✕</span>
                  </div>
                  <span className="text-slate-400">재무제표 기반 평가 (조작 가능)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-xs text-slate-400">✕</span>
                  </div>
                  <span className="text-slate-400">불투명한 평가 기준</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-xs text-slate-400">✕</span>
                  </div>
                  <span className="text-slate-400">느린 평가 프로세스</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white mb-4">TrustFi 기업 Trust Score</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span className="text-slate-300">투명한 온체인 데이터 기반</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span className="text-slate-300">실시간 신뢰도 모니터링</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span className="text-slate-300">스마트 컨트랙트 보안 분석</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-purple-800/30">
            <h5 className="text-lg font-semibold text-white mb-4">평가 요소</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">40%</div>
                <div className="text-sm text-slate-400">온체인 거래 활동</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">30%</div>
                <div className="text-sm text-slate-400">스마트 컨트랙트 보안</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">20%</div>
                <div className="text-sm text-slate-400">커뮤니티 평판</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">10%</div>
                <div className="text-sm text-slate-400">거버넌스 참여</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enterprise Use Cases */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {enterpriseUseCases.map((useCase, idx) => {
            const Icon = useCase.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-slate-950 border border-slate-800 hover:border-purple-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${useCase.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{useCase.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{useCase.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
