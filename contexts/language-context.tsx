"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "ko" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 번역 데이터
const translations = {
  ko: {
    // 메타데이터
    "meta.title": "TrustPort - Web3 실명 인증의 게이트웨이",
    "meta.description":
      "PASS 기반 실명 인증부터 DID 생성, Web3 온체인 참여까지. 신뢰할 수 있는 디지털 신원의 새로운 표준",

    // 네비게이션
    "nav.features": "기능",
    "nav.useCases": "활용 사례",
    "nav.technology": "기술",
    "nav.payment": "결제 솔루션",
    "nav.team": "팀",
    "nav.start": "시작하기",
    "nav.getStarted": "시작하기",

    // 히어로 섹션
    "hero.title": "Web3 실명 인증의",
    "hero.highlight": "게이트웨이",
    "hero.description1": "PASS 기반 실명 인증부터",
    "hero.description2": "DID 생성, Web3 온체인 참여까지",
    "hero.description3": "신뢰할 수 있는 디지털 신원의 새로운 표준",
    "hero.startButton": "지금 시작하기",
    "hero.demoButton": "데모 보기",

    // 기능 섹션
    "features.title": "핵심 기능",
    "features.subtitle": "실명 인증부터 Web3 참여까지, 모든 과정을 하나의 플랫폼에서",
    "features.pass.title": "PASS 기반 실명 인증",
    "features.pass.description": "정부 공인 PASS 인증을 통한 안전하고 신뢰할 수 있는 신원 확인",
    "features.pass.detail1": "본인인증 API 연동",
    "features.pass.detail2": "개인정보 보호",
    "features.pass.detail3": "법적 효력 보장",
    "features.did.title": "DID 생성 & 신뢰 지갑",
    "features.did.description": "탈중앙화 신원증명과 개인 키 관리를 위한 보안 지갑 발급",
    "features.did.detail1": "Self-Sovereign Identity",
    "features.did.detail2": "키 복구 시스템",
    "features.did.detail3": "멀티체인 지원",
    "features.trust.title": "Trust Score & 활동 이력",
    "features.trust.description": "온체인 활동 기반 신뢰도 점수와 투명한 이력 관리",
    "features.trust.detail1": "활동 기반 점수",
    "features.trust.detail2": "이력 추적",
    "features.trust.detail3": "평판 시스템",
    "features.web3.title": "Web3 서비스 연결",
    "features.web3.description": "DAO 투표, NFT, 결제 등 다양한 Web3 서비스와의 원활한 연동",
    "features.web3.detail1": "DAO 거버넌스",
    "features.web3.detail2": "NFT 인증",
    "features.web3.detail3": "DeFi 연동",

    // 활용 사례 섹션
    "useCases.title": "활용 시나리오",
    "useCases.subtitle": "다양한 Web3 서비스에서 TrustPort가 제공하는 가치",
    "useCases.dao.title": "DAO 거버넌스",
    "useCases.dao.description": "실명 인증된 사용자만 참여 가능한 투명한 DAO 투표",
    "useCases.welfare.title": "복지금 지급",
    "useCases.welfare.description": "중복 수령 방지와 투명한 복지금 분배 시스템",
    "useCases.nft.title": "NFT 인증",
    "useCases.nft.description": "실명 기반 NFT 발행과 소유권 증명",
    "useCases.airdrop.title": "에어드랍",
    "useCases.airdrop.description": "시빌 어택 방지를 위한 검증된 에어드랍",
    "useCases.defi.title": "DeFi 결제",
    "useCases.defi.description": "KYC 완료된 사용자 대상 안전한 금융 서비스",
    "useCases.viewMore": "자세히 보기",

    // 기술 섹션
    "tech.title": "기술 구조",
    "tech.subtitle": "최신 블록체인 기술과 보안 프로토콜을 기반으로 구축",
    "tech.pass.title": "PASS 인증",
    "tech.pass.description": "정부 공인 본인인증",
    "tech.did.title": "DID & ZK",
    "tech.did.description": "영지식 증명 기반 신원",
    "tech.chain.title": "Cross-Chain",
    "tech.chain.description": "멀티체인 상호운용성",

    // 결제 솔루션 섹션
    "payment.title": "TrustPort 결제 솔루션",
    "payment.subtitle": "PASS 기반 실명 인증 지갑을 통한 안전한 스테이블코인 결제 시스템",
    "payment.purpose.title": "목적",
    "payment.purpose.item1": "스테이블코인 온램프/오프램프 기능 제공",
    "payment.purpose.item2": "Web3 사용자 간 P2P 송금/보상 결제 가능",
    "payment.purpose.item3": "실명 인증 기반 거래 신뢰도 확보",
    "payment.mvp.title": "MVP 기능 범위",
    "payment.mvp.essential": "필수 기능",
    "payment.mvp.essential1": "PASS 인증 기반 KYC 검증",
    "payment.mvp.essential2": "스테이블코인 P2P 송금",
    "payment.mvp.essential3": "거래 내역 추적",
    "payment.mvp.essential4": "신뢰 점수 기반 한도 관리",
    "payment.mvp.optional": "선택 기능 (v2 예정)",
    "payment.mvp.optional1": "원화 오프램프 연동",
    "payment.mvp.optional2": "다중 토큰 지원",
    "payment.mvp.optional3": "자동 환전 기능",
    "payment.mvp.optional4": "기업용 대량 결제",
    "payment.contract.title": "스마트 컨트랙트 구조",
    "payment.contract.description": "ERC-20 기반 실명 인증 결제 시스템",
    "payment.data.title": "데이터 구조",
    "payment.data.description": "오프체인 거래 기록 및 KYC 증명 데이터",
    "payment.components.title": "프론트엔드 구성 요소",
    "payment.flow.title": "인증 연동 흐름",
    "payment.flow.step1": "PASS 인증 완료",
    "payment.flow.step2": "온체인 검증 허용",
    "payment.flow.step3": "지갑 연결 및 결제",
    "payment.flow.step4": "거래 실행 및 기록",
    "payment.offramp.title": "오프램프 확장 구조",
    "payment.offramp.description": "Web3에서 현금으로의 안전한 출금 시스템",
    "payment.offramp.module1": "출금 요청 API",
    "payment.offramp.module2": "AML & 신뢰점수 필터",
    "payment.offramp.module3": "유동성 관리자",
    "payment.offramp.module4": "원화 정산 어댑터",
    "payment.offramp.module5": "출금 영수증 토큰화",
    "payment.summary.title": "요약",
    "payment.summary.item1": "Web3 지갑 간 실명 기반 송금부터 원화 출금까지 지원",
    "payment.summary.item2": "Web2 인프라와 Web3 유동성을 잇는 핵심 브릿지",
    "payment.summary.item3": "실명 인증과 신뢰 점수 기반 위험 관리",
    "payment.summary.item4": "MVP 이후 B2G/B2C 결제 서비스로 확장 가능",

    // 팀 섹션
    "team.title": "팀 & 파트너",
    "team.subtitle": "Web3와 보안 전문가들이 함께 만들어가는 신뢰의 생태계",
    "team.sectionTitle": "팀",
    "team.partner.sectionTitle": "파트너",
    "team.download": "IR 자료 다운로드",

    // CTA 섹션
    "cta.title": "지금 시작하세요",
    "cta.subtitle": "TrustPort와 함께 안전하고 신뢰할 수 있는 Web3 여정을 시작하세요",
    "cta.simulator.title": "KYC 시뮬레이터",
    "cta.simulator.description": "PASS 인증 기반 실명 확인 과정을 체험해보세요",
    "cta.simulator.button": "데모 체험하기",
    "cta.contact.title": "기관 문의",
    "cta.contact.description": "TrustPort 도입에 관심이 있으시다면 연락주세요",
    "cta.contact.email": "이메일 주소",
    "cta.contact.message": "문의 내용",
    "cta.contact.button": "문의하기",

    // 푸터
    "footer.copyright": "© 2025 TrustPort. All rights reserved.",
  },
  en: {
    // Metadata
    "meta.title": "TrustPort - Gateway to Web3 Identity Verification",
    "meta.description":
      "From PASS-based identity verification to DID creation and Web3 on-chain participation. The new standard for trusted digital identity",

    // Navigation
    "nav.features": "Features",
    "nav.useCases": "Use Cases",
    "nav.technology": "Technology",
    "nav.payment": "Payment Solutions",
    "nav.team": "Team",
    "nav.start": "Start",
    "nav.getStarted": "Get Started",

    // Hero Section
    "hero.title": "Gateway to Web3",
    "hero.highlight": "Identity Verification",
    "hero.description1": "From PASS-based identity verification",
    "hero.description2": "to DID creation and Web3 on-chain participation",
    "hero.description3": "The new standard for trusted digital identity",
    "hero.startButton": "Start Now",
    "hero.demoButton": "View Demo",

    // Features Section
    "features.title": "Core Features",
    "features.subtitle": "From identity verification to Web3 participation, all in one platform",
    "features.pass.title": "PASS-based Identity Verification",
    "features.pass.description":
      "Safe and reliable identity verification through government-certified PASS authentication",
    "features.pass.detail1": "Authentication API Integration",
    "features.pass.detail2": "Privacy Protection",
    "features.pass.detail3": "Legal Validity",
    "features.did.title": "DID Creation & Trust Wallet",
    "features.did.description": "Secure wallet issuance for decentralized identity and private key management",
    "features.did.detail1": "Self-Sovereign Identity",
    "features.did.detail2": "Key Recovery System",
    "features.did.detail3": "Multi-chain Support",
    "features.trust.title": "Trust Score & Activity History",
    "features.trust.description": "Trust score based on on-chain activity and transparent history management",
    "features.trust.detail1": "Activity-based Score",
    "features.trust.detail2": "History Tracking",
    "features.trust.detail3": "Reputation System",
    "features.web3.title": "Web3 Service Connection",
    "features.web3.description":
      "Seamless integration with various Web3 services such as DAO voting, NFT, and payments",
    "features.web3.detail1": "DAO Governance",
    "features.web3.detail2": "NFT Authentication",
    "features.web3.detail3": "DeFi Integration",

    // Use Cases Section
    "useCases.title": "Use Cases",
    "useCases.subtitle": "Value provided by TrustPort across various Web3 services",
    "useCases.dao.title": "DAO Governance",
    "useCases.dao.description": "Transparent DAO voting accessible only to verified users",
    "useCases.welfare.title": "Welfare Payments",
    "useCases.welfare.description": "Transparent welfare distribution system preventing duplicate receipts",
    "useCases.nft.title": "NFT Authentication",
    "useCases.nft.description": "Identity-based NFT issuance and ownership verification",
    "useCases.airdrop.title": "Airdrops",
    "useCases.airdrop.description": "Verified airdrops preventing Sybil attacks",
    "useCases.defi.title": "DeFi Payments",
    "useCases.defi.description": "Secure financial services for KYC-verified users",
    "useCases.viewMore": "View More",

    // Technology Section
    "tech.title": "Technology Architecture",
    "tech.subtitle": "Built on the latest blockchain technology and security protocols",
    "tech.pass.title": "PASS Authentication",
    "tech.pass.description": "Government-certified identity verification",
    "tech.did.title": "DID & ZK",
    "tech.did.description": "Zero-knowledge proof-based identity",
    "tech.chain.title": "Cross-Chain",
    "tech.chain.description": "Multi-chain interoperability",

    // Payment Solutions Section
    "payment.title": "TrustPort Payment Solutions",
    "payment.subtitle": "Secure stablecoin payment system through PASS-based identity verification wallet",
    "payment.purpose.title": "Purpose",
    "payment.purpose.item1": "Provide stablecoin on-ramp/off-ramp functionality",
    "payment.purpose.item2": "Enable P2P transfers/reward payments between Web3 users",
    "payment.purpose.item3": "Secure transaction trust through identity verification",
    "payment.mvp.title": "MVP Feature Scope",
    "payment.mvp.essential": "Essential Features",
    "payment.mvp.essential1": "PASS authentication-based KYC verification",
    "payment.mvp.essential2": "Stablecoin P2P transfers",
    "payment.mvp.essential3": "Transaction history tracking",
    "payment.mvp.essential4": "Trust score-based limit management",
    "payment.mvp.optional": "Optional Features (v2 planned)",
    "payment.mvp.optional1": "KRW off-ramp integration",
    "payment.mvp.optional2": "Multi-token support",
    "payment.mvp.optional3": "Automatic exchange functionality",
    "payment.mvp.optional4": "Enterprise bulk payments",
    "payment.contract.title": "Smart Contract Structure",
    "payment.contract.description": "ERC-20 based identity verification payment system",
    "payment.data.title": "Data Structure",
    "payment.data.description": "Off-chain transaction records and KYC proof data",
    "payment.components.title": "Frontend Components",
    "payment.flow.title": "Authentication Integration Flow",
    "payment.flow.step1": "PASS authentication completed",
    "payment.flow.step2": "On-chain verification enabled",
    "payment.flow.step3": "Wallet connection and payment",
    "payment.flow.step4": "Transaction execution and recording",
    "payment.offramp.title": "Off-ramp Extension Structure",
    "payment.offramp.description": "Secure withdrawal system from Web3 to cash",
    "payment.offramp.module1": "Withdrawal Request API",
    "payment.offramp.module2": "AML & Trust Score Filter",
    "payment.offramp.module3": "Liquidity Manager",
    "payment.offramp.module4": "Fiat Settlement Adapter",
    "payment.offramp.module5": "Withdrawal Receipt Tokenization",
    "payment.summary.title": "Summary",
    "payment.summary.item1": "Support from identity-based transfers between Web3 wallets to KRW withdrawal",
    "payment.summary.item2": "Core bridge connecting Web2 infrastructure and Web3 liquidity",
    "payment.summary.item3": "Risk management based on identity verification and trust scores",
    "payment.summary.item4": "Expandable to B2G/B2C payment services after MVP",

    // Team Section
    "team.title": "Team & Partners",
    "team.subtitle": "Web3 and security experts building a trusted ecosystem together",
    "team.sectionTitle": "Team",
    "team.partner.sectionTitle": "Partners",
    "team.download": "Download IR Materials",

    // CTA Section
    "cta.title": "Start Now",
    "cta.subtitle": "Begin your safe and trusted Web3 journey with TrustPort",
    "cta.simulator.title": "KYC Simulator",
    "cta.simulator.description": "Experience the PASS authentication-based identity verification process",
    "cta.simulator.button": "Try Demo",
    "cta.contact.title": "Enterprise Inquiry",
    "cta.contact.description": "Contact us if you're interested in implementing TrustPort",
    "cta.contact.email": "Email Address",
    "cta.contact.message": "Message",
    "cta.contact.button": "Send Inquiry",

    // Footer
    "footer.copyright": "© 2025 TrustPort. All rights reserved.",
  },
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ko")

  // 브라우저 언어 설정에 따라 초기 언어 설정
  useEffect(() => {
    const browserLang = navigator.language.split("-")[0]
    if (browserLang === "en") {
      setLanguage("en")
    }
    // 로컬 스토리지에 저장된 언어 설정이 있으면 그것을 사용
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "ko" || savedLang === "en")) {
      setLanguage(savedLang)
    }
  }, [])

  // 언어 변경 시 로컬 스토리지에 저장
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)

    // HTML lang 속성 업데이트
    document.documentElement.lang = lang

    // 메타 태그 업데이트
    const title = document.querySelector("title")
    if (title) {
      title.textContent = translations[lang]["meta.title"]
    }

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", translations[lang]["meta.description"])
    }
  }

  // 번역 함수
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
