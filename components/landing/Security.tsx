"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Shield,
  Clock,
  AlertTriangle,
  Bot,
  Settings,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"

export default function Security() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  const securityFeatures = [
    {
      title: "자연어 리뷰",
      description: "복잡한 트랜잭션을 사람이 이해할 수 있는 언어로 번역",
      icon: Search,
      process: [
        { step: "트랜잭션 데이터 수신", description: "스마트 컨트랙트 호출 분석", status: "processing" },
        { step: "OpenAI API 분석", description: "자연어로 변환", status: "processing" },
        { step: "사용자에게 표시", description: "이해하기 쉬운 설명 제공", status: "success" },
      ],
      result: "사용자가 트랜잭션의 정확한 의미를 이해하고 서명 여부를 결정할 수 있습니다.",
    },
    {
      title: "트랜잭션 방화벽",
      description: "위험 기준을 충족하는 트랜잭션을 즉시 차단",
      icon: Shield,
      process: [
        { step: "주소 검증", description: "블랙리스트 및 피싱 주소 확인", status: "processing" },
        { step: "컨트랙트 분석", description: "악성 코드 패턴 탐지", status: "processing" },
        { step: "위험도 평가", description: "종합 위험 점수 계산", status: "processing" },
        { step: "차단 또는 허용", description: "기준 초과 시 즉시 차단", status: "warning" },
      ],
      result: "알려진 위험 주소 및 악성 컨트랙트로의 트랜잭션을 사전에 차단합니다.",
    },
    {
      title: "지연 보호",
      description: "고위험 트랜잭션에 대한 5초 타이머 + 재확인",
      icon: Clock,
      process: [
        { step: "위험도 확인", description: "중간 위험 트랜잭션 감지", status: "warning" },
        { step: "5초 대기", description: "사용자 재고 시간 제공", status: "processing" },
        { step: "재확인 요청", description: "최종 승인 확인", status: "processing" },
        { step: "실행 또는 취소", description: "사용자 선택에 따라 처리", status: "success" },
      ],
      result: "충동적인 서명을 방지하고 사용자에게 재고할 시간을 제공합니다.",
    },
    {
      title: "긴급 취소",
      description: "서명 후 30초 이내 긴급 취소 가능",
      icon: AlertTriangle,
      process: [
        { step: "트랜잭션 전송", description: "블록체인에 제출", status: "processing" },
        { step: "30초 모니터링", description: "취소 가능 시간 제공", status: "processing" },
        { step: "취소 요청 감지", description: "사용자 긴급 취소 버튼 클릭", status: "warning" },
        { step: "트랜잭션 취소", description: "가스비로 트랜잭션 무효화", status: "success" },
      ],
      result: "실수로 서명한 트랜잭션을 30초 이내에 취소할 수 있습니다.",
    },
    {
      title: "AI 위험 가드",
      description: "실시간 위험 점수 분석 및 경고",
      icon: Bot,
      process: [
        { step: "데이터 수집", description: "온체인 활동 및 패턴 분석", status: "processing" },
        { step: "AI 모델 분석", description: "머신러닝 기반 위험도 예측", status: "processing" },
        { step: "위험 점수 계산", description: "0-100 점수 산출", status: "processing" },
        { step: "경고 표시", description: "고위험 시 사용자에게 알림", status: "warning" },
      ],
      result: "AI가 실시간으로 위험을 감지하고 사용자에게 경고를 제공합니다.",
    },
    {
      title: "정책 엔진",
      description: "맞춤형 보안 규칙 설정",
      icon: Settings,
      process: [
        { step: "사용자 정책 로드", description: "개인 맞춤 보안 규칙 확인", status: "processing" },
        { step: "규칙 검증", description: "트랜잭션이 정책 준수 여부 확인", status: "processing" },
        { step: "위반 감지", description: "정책 위반 시 차단", status: "warning" },
        { step: "승인 또는 차단", description: "정책에 따라 처리", status: "success" },
      ],
      result: "사용자가 설정한 보안 정책에 따라 트랜잭션을 자동으로 관리합니다.",
    },
  ]

  return (
    <section className="py-32 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">6단계 보안 OS</h2>
          <p className="text-xl text-slate-400 mb-4">TrustFi는 서명 전에 검증합니다</p>
          <p className="text-lg text-teal-400 font-medium">보안은 선택이 아닌 기본입니다</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityFeatures.map((feature, idx) => {
            const Icon = feature.icon
            const isActive = activeLayer === idx

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => setActiveLayer(isActive ? null : idx)}
                  className={`w-full text-left bg-black border rounded-xl p-6 transition-all duration-300 ${
                    isActive
                      ? "border-teal-500 shadow-lg shadow-teal-500/20"
                      : "border-slate-800 hover:border-teal-500/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? "bg-teal-500/20" : "bg-teal-500/10 group-hover:bg-teal-500/20"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${isActive ? "rotate-180" : ""}`}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                        <h4 className="text-sm font-bold text-teal-400 mb-4 uppercase tracking-wide">보호 프로세스</h4>

                        <div className="space-y-3 mb-6">
                          {feature.process.map((step, stepIdx) => (
                            <motion.div
                              key={stepIdx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: stepIdx * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="flex-shrink-0 mt-1">
                                {step.status === "success" && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                                {step.status === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                                {step.status === "processing" && (
                                  <div className="w-5 h-5 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-white">{step.step}</div>
                                <div className="text-xs text-slate-400 mt-0.5">{step.description}</div>
                              </div>
                              {stepIdx < feature.process.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0 mt-1" />
                              )}
                            </motion.div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-slate-800">
                          <div className="flex items-start gap-2">
                            <Shield className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-300 leading-relaxed">{feature.result}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <div className="bg-black border border-slate-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">통합 보안 플로우</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["서명 시도", "자연어 리뷰", "AI 위험", "방화벽", "지연", "정책", "실행", "긴급 취소"].map((step, idx) => (
              <div key={idx} className="flex items-center">
                <div className="bg-teal-500/10 border border-teal-500/30 text-teal-400 font-medium px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                  {step}
                </div>
                {idx < 7 && <div className="mx-2 text-teal-500/50">→</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
