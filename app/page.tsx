"use client"

import { useState } from "react"
import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  ArrowRight,
  Shield,
  Wallet,
  Globe,
  Users,
  Mail,
  Download,
  Play,
  ChevronDown,
  Menu,
  CreditCard,
  CheckCircle,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { InteractiveBackground } from "@/components/interactive-background"
import { ScrollBasedAnimation, ParallaxSection } from "@/components/scroll-based-animation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

export default function TrustPortLanding() {
  const { scrollYProgress } = useScroll()
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)

    // 모바일 감지
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative">
      {mounted && <InteractiveBackground scrollProgress={scrollProgress.get()} />}
      <Header />
      <HeroSection isMobile={isMobile} />
      <FeaturesSection />
      <UseCasesSection />
      <TechnologySection />
      <VisualGallerySection />
      <PaymentSolutionsSection />
      <TeamSection />
      <CTASection />
      <MyFooter />
    </div>
  )
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: t("nav.features"), href: "#features" },
    { name: t("nav.useCases"), href: "#use-cases" },
    { name: t("nav.technology"), href: "#technology" },
    { name: t("nav.payment"), href: "#payment" },
    { name: t("nav.team"), href: "#team" },
    { name: t("nav.start"), href: "#start" },
  ]

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-[#00C2A8]/20" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div className="text-2xl font-bold text-white" whileHover={{ scale: 1.05 }}>
          <span className="text-[#00C2A8]">Trust</span>Port
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-white/80 hover:text-[#00C2A8] transition-colors"
              whileHover={{ y: -2 }}
            >
              {item.name}
            </motion.a>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>

          <Button className="bg-[#00C2A8] hover:bg-[#00A693] text-white border border-[#00C2A8]/50 hidden md:flex">
            {t("nav.getStarted")}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 border-b border-[#00C2A8]/20"
        >
          <div className="container mx-auto px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-3 text-white/80 hover:text-[#00C2A8] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button
              className="bg-[#00C2A8] hover:bg-[#00A693] text-white border border-[#00C2A8]/50 w-full mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.getStarted")}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

function HeroSection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const { t } = useLanguage()

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 텍스트 뒤 애니메이션 배경 */}
      <div className="absolute inset-0 z-0">
        <HeroBackgroundAnimation />
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-6 text-center relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold mb-8 leading-tight relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="block sm:inline">{t("hero.title")}</span>{" "}
          <motion.span
            className="text-[#00C2A8] relative block sm:inline"
            animate={{
              textShadow: [
                "0 0 20px rgba(0, 194, 168, 0.5)",
                "0 0 40px rgba(0, 194, 168, 0.8)",
                "0 0 20px rgba(0, 194, 168, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {t("hero.highlight")}
            <motion.div
              className="absolute -inset-2 sm:-inset-4 border border-[#00C2A8]/30 rounded-lg"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl lg:text-2xl mb-12 text-gray-300 leading-relaxed max-w-4xl mx-auto relative px-4 sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="block sm:inline">{t("hero.description1")}</span>{" "}
          <span className="block sm:inline">{t("hero.description2")}</span>
          <br className="hidden sm:block" />
          <span className="block mt-2 sm:mt-0 sm:inline">{t("hero.description3")}</span>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-[#00C2A8] hover:bg-[#00A693] text-white group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border border-[#00C2A8]/50 w-full sm:w-auto"
          >
            {t("hero.startButton")}
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
          >
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            {t("hero.demoButton")}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="h-8 w-8 text-[#00C2A8]" />
      </motion.div>
    </section>
  )
}

function HeroBackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 네트워크 노드들 */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-3 h-3 bg-[#00C2A8]/40 rounded-full"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${20 + Math.floor(i / 4) * 30}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* 연결선들 */}
      <svg className="absolute inset-0 w-full h-full">
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${15 + (i % 3) * 30}%`}
            y1={`${25 + Math.floor(i / 3) * 25}%`}
            x2={`${35 + (i % 3) * 30}%`}
            y2={`${35 + Math.floor(i / 3) * 25}%`}
            stroke="#00C2A8"
            strokeWidth="1"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>

      {/* 플로팅 데이터 블록들 */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`block-${i}`}
            className="absolute w-8 h-8 border border-[#00C2A8]/30 bg-[#00C2A8]/10"
            style={{
              left: `${5 + i * 15}%`,
              top: `${10 + (i % 2) * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotateY: [0, 180, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* 인증 체크마크들 */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`check-${i}`}
            className="absolute text-[#00C2A8] text-2xl"
            style={{
              left: `${20 + i * 20}%`,
              top: `${15 + (i % 2) * 50}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 1.5,
            }}
          >
            ✓
          </motion.div>
        ))}
      </div>

      {/* 방패 아이콘들 */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shield-${i}`}
            className="absolute text-[#00C2A8]/50 text-xl"
            style={{
              left: `${30 + i * 25}%`,
              top: `${40 + (i % 2) * 20}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
            }}
          >
            🛡️
          </motion.div>
        ))}
      </div>

      {/* 데이터 플로우 파티클들 */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-[#00C2A8] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* 원형 펄스 효과 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute border border-[#00C2A8]/20 rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* 키워드 플로팅 텍스트 */}
      <div className="absolute inset-0">
        {["PASS", "DID", "Web3", "Trust", "KYC", "DAO"].map((text, i) => (
          <motion.div
            key={`text-${i}`}
            className="absolute text-[#00C2A8]/20 text-sm font-mono"
            style={{
              left: `${10 + (i % 3) * 30}%`,
              top: `${20 + Math.floor(i / 3) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 1.2,
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      {/* 그리드 라인 효과 */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width%3D%2240%22 height%3D%2240%22 viewBox%3D%220 0 40 40%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg stroke%3D%22%2300C2A8%22 strokeWidth%3D%221%22%3E%3Cpath d%3D%22M0 40L40 0M40 40L0 0%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
    </div>
  )
}

function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const features = [
    {
      icon: Shield,
      title: t("features.pass.title"),
      description: t("features.pass.description"),
      details: [t("features.pass.detail1"), t("features.pass.detail2"), t("features.pass.detail3")],
    },
    {
      icon: Wallet,
      title: t("features.did.title"),
      description: t("features.did.description"),
      details: [t("features.did.detail1"), t("features.did.detail2"), t("features.did.detail3")],
    },
    {
      icon: Globe,
      title: t("features.trust.title"),
      description: t("features.trust.description"),
      details: [t("features.trust.detail1"), t("features.trust.detail2"), t("features.trust.detail3")],
    },
    {
      icon: Users,
      title: t("features.web3.title"),
      description: t("features.web3.description"),
      details: [t("features.web3.detail1"), t("features.web3.detail2"), t("features.web3.detail3")],
    },
  ]

  return (
    <section id="features" ref={ref} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1C1F2A]/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollBasedAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t("features.title")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("features.subtitle")}</p>
          </div>
        </ScrollBasedAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ScrollBasedAnimation key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="h-full bg-black/40 border-[#00C2A8]/20 backdrop-blur-sm hover:border-[#00C2A8]/50 transition-all duration-300 group">
                  <CardHeader>
                    <motion.div
                      className="w-12 h-12 bg-[#00C2A8]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00C2A8]/40 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon className="h-6 w-6 text-[#00C2A8]" />
                    </motion.div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-gray-300">{feature.description}</CardDescription>
                    <ul className="space-y-2">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-center">
                          <div className="w-1.5 h-1.5 bg-[#00C2A8] rounded-full mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollBasedAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

function UseCasesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const useCases = [
    {
      title: t("useCases.dao.title"),
      description: t("useCases.dao.description"),
      icon: "🏛️",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: t("useCases.welfare.title"),
      description: t("useCases.welfare.description"),
      icon: "💰",
      color: "from-green-500 to-green-600",
    },
    {
      title: t("useCases.nft.title"),
      description: t("useCases.nft.description"),
      icon: "🎨",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: t("useCases.airdrop.title"),
      description: t("useCases.airdrop.description"),
      icon: "🪂",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: t("useCases.defi.title"),
      description: t("useCases.defi.description"),
      icon: "💳",
      color: "from-teal-500 to-teal-600",
    },
  ]

  return (
    <section id="use-cases" ref={ref} className="py-20 relative">
      <ParallaxSection speed={0.3}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00C2A8]/5 to-[#1C1F2A]/5" />
      </ParallaxSection>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollBasedAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t("useCases.title")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("useCases.subtitle")}</p>
          </div>
        </ScrollBasedAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <ScrollBasedAnimation key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Card className="h-full overflow-hidden bg-black/40 border-[#00C2A8]/20 backdrop-blur-sm hover:border-[#00C2A8]/50 transition-all duration-300">
                  <div className={`h-2 bg-gradient-to-r ${useCase.color}`} />
                  <CardHeader className="text-center">
                    <motion.div className="text-4xl mb-4" whileHover={{ scale: 1.2, rotate: 10 }}>
                      {useCase.icon}
                    </motion.div>
                    <CardTitle className="text-white group-hover:text-[#00C2A8] transition-colors">
                      {useCase.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-4 text-gray-300">{useCase.description}</CardDescription>
                    <Button
                      variant="outline"
                      className="w-full border-[#00C2A8]/30 text-white hover:bg-[#00C2A8] hover:text-white hover:border-[#00C2A8] transition-all"
                    >
                      {t("useCases.viewMore")}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollBasedAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechnologySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <section id="technology" ref={ref} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C1F2A]/80 to-black/80" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollBasedAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t("tech.title")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("tech.subtitle")}</p>
          </div>
        </ScrollBasedAnimation>

        <ScrollBasedAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Shield, title: t("tech.pass.title"), desc: t("tech.pass.description") },
              { icon: Wallet, title: t("tech.did.title"), desc: t("tech.did.description") },
              { icon: Globe, title: t("tech.chain.title"), desc: t("tech.chain.description") },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="space-y-4"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-[#00C2A8]/20 rounded-full flex items-center justify-center mx-auto border border-[#00C2A8]/30">
                  <item.icon className="h-8 w-8 text-[#00C2A8]" />
                </div>
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </ScrollBasedAnimation>
      </div>
    </section>
  )
}

function VisualGallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const visualImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EC%8B%A0%EB%A2%B0%EC%99%80%20%EB%B3%B4%EC%95%88%EC%9D%84%20%EC%83%81%EC%A7%95%ED%95%98%EB%8A%94%20%EC%9D%B4%EB%AF%B8%EC%A7%80-NPbPk3MmOXWDXCAbizzWLDNCQv4f3w.png",
      title: "신뢰와 보안",
      description: "TrustPort의 핵심 가치인 신뢰와 보안을 상징하는 브랜드 이미지",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8%20%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%20%EC%97%B0%EA%B2%B0-T2TpV7oybyLTUFDOrcfMqVeWNNnIUv.png",
      title: "블록체인 네트워크",
      description: "다양한 블록체인 네트워크와의 연결성을 보여주는 기술 다이어그램",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EC%8B%A0%EB%A2%B0%EC%9D%98%20%EB%AF%B8%EB%9E%98%2C%20Web3%20%EC%97%B0%EA%B2%B0-SjcKL6FR3SegYT6KdIV0PaHcr6t18Q.png",
      title: "Web3 연결의 미래",
      description: "실명을 넘어 신뢰로 연결되는 Web3의 미래 비전",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EC%9B%B93%EB%A1%9C%EC%9D%98%20%EC%A0%84%ED%99%98-Q3oDLSF48UPCgRrkLS3zJE2ZGkDI3E.png",
      title: "Web3로의 전환",
      description: "기존 신원 확인에서 Web3 세계로의 안전한 전환 과정",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%ED%8A%B8%EB%9F%AC%EC%8A%A4%ED%8A%B8%ED%8F%AC%ED%8A%B8%EC%99%80%20%EB%B9%9B%EB%82%98%EB%8A%94%20%ED%8F%AC%ED%84%B8-nztOCQP8senmEZ9UOvXrcOD2giBEn3.png",
      title: "신뢰의 포털",
      description: "TrustPort를 통한 안전하고 신뢰할 수 있는 Web3 접근",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EC%9B%B93%20%EC%A0%91%EA%B7%BC%20%EA%B2%8C%EC%9D%B4%ED%8A%B8%EC%9B%A8%EC%9D%B4%20%EC%95%88%EB%82%B4-RsxhOlafLD1adBmZiQobFV6dvflbbD.png",
      title: "Web3 게이트웨이",
      description: "DeFi, DAO, NFT, Payment 등 다양한 Web3 서비스 연결",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EC%9B%B93%EB%A1%9C%20%EA%B0%80%EB%8A%94%20%EB%AF%BF%EC%9D%84%20%EC%88%98%20%EC%9E%88%EB%8A%94%20%EA%B8%B8-sP7whS1UyQE7V2pfDpbla2q2EqFzog.png",
      title: "신뢰할 수 있는 여정",
      description: "실제 신원에서 Web3 애플리케이션까지의 완전한 여정",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%ED%8A%B8%EB%9F%AC%EC%8A%A4%ED%8A%B8%ED%8F%AC%ED%8A%B8%EC%9D%98%20Web3%20%ED%86%B5%ED%95%A9%20%EC%A0%95%EB%B3%B4-j4SYTq7RqZTF45CFg7PjuOv8f8dHX0.png",
      title: "Web3 통합",
      description: "PASS 인증부터 Web3 지갑, dApp 서비스까지의 기술적 통합",
    },
  ]

  return (
    <section id="visual-gallery" ref={ref} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1C1F2A]/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollBasedAnimation>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 bg-[#00C2A8]/10 border border-[#00C2A8]/30 rounded-full px-4 py-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[#00C2A8] font-medium">Visual Gallery</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">TrustPort 비주얼 갤러리</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              TrustPort의 비전과 기술을 시각적으로 표현한 이미지 컬렉션
            </p>
          </div>
        </ScrollBasedAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visualImages.map((image, index) => (
            <ScrollBasedAnimation key={index}>
              <motion.div
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedImage(index)}
              >
                <Card className="overflow-hidden bg-black/40 border-[#00C2A8]/20 backdrop-blur-sm hover:border-[#00C2A8]/50 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute top-2 right-2 w-8 h-8 bg-[#00C2A8]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-[#00C2A8] text-sm">🔍</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-white font-semibold mb-2 group-hover:text-[#00C2A8] transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{image.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollBasedAnimation>
          ))}
        </div>

        {/* 이미지 모달 */}
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 text-white hover:text-[#00C2A8] transition-colors text-2xl"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
              <div className="bg-black/60 border border-[#00C2A8]/30 rounded-2xl overflow-hidden backdrop-blur-sm">
                <img
                  src={visualImages[selectedImage].src || "/placeholder.svg"}
                  alt={visualImages[selectedImage].title}
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">{visualImages[selectedImage].title}</h3>
                  <p className="text-gray-300">{visualImages[selectedImage].description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function PaymentSolutionsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <section id="payment" ref={ref} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1C1F2A]/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollBasedAnimation>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 bg-[#00C2A8]/10 border border-[#00C2A8]/30 rounded-full px-4 py-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <CreditCard className="h-5 w-5 text-[#00C2A8]" />
              <span className="text-[#00C2A8] font-medium">Payment Solutions</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t("payment.title")}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("payment.subtitle")}</p>
          </div>
        </ScrollBasedAnimation>

        {/* 목적 */}
        <ScrollBasedAnimation>
          <div className="mb-16">
            <Card className="bg-black/40 border-[#00C2A8]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-[#00C2A8]" />
                  {t("payment.purpose.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {[t("payment.purpose.item1"), t("payment.purpose.item2"), t("payment.purpose.item3")].map(
                    (item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-[#00C2A8]/5 rounded-lg border border-[#00C2A8]/10"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-[#00C2A8] rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-300">{item}</p>
                      </motion.div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollBasedAnimation>

        {/* MVP 기능 범위 */}
        <ScrollBasedAnimation>
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-8">{t("payment.mvp.title")}</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* 필수 기능 */}
              <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400 text-xl">{t("payment.mvp.essential")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      t("payment.mvp.essential1"),
                      t("payment.mvp.essential2"),
                      t("payment.mvp.essential3"),
                      t("payment.mvp.essential4"),
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* 선택 기능 */}
              <Card className="bg-black/40 border-orange-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-orange-400 text-xl">{t("payment.mvp.optional")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      t("payment.mvp.optional1"),
                      t("payment.mvp.optional2"),
                      t("payment.mvp.optional3"),
                      t("payment.mvp.optional4"),
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <DollarSign className="h-5 w-5 text-orange-400 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollBasedAnimation>

        {/* 인증 연동 흐름 */}
        <ScrollBasedAnimation>
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-8">{t("payment.flow.title")}</h3>
            <Card className="bg-black/40 border-[#00C2A8]/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[
                    { step: "1", title: t("payment.flow.step1") },
                    { step: "2", title: t("payment.flow.step2") },
                    { step: "3", title: t("payment.flow.step3") },
                    { step: "4", title: t("payment.flow.step4") },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-[#00C2A8]/5 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="text-[#00C2A8] font-bold text-lg mb-2">{item.step}</div>
                      <p className="text-white text-sm">{item.title}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollBasedAnimation>

        {/* 오프램프 확장 구조 */}
        <ScrollBasedAnimation>
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-8">{t("payment.offramp.title")}</h3>
            <Card className="bg-black/40 border-[#00C2A8]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl">{t("payment.offramp.description")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    t("payment.offramp.module1"),
                    t("payment.offramp.module2"),
                    t("payment.offramp.module3"),
                    t("payment.offramp.module4"),
                    t("payment.offramp.module5"),
                  ].map((module, index) => (
                    <motion.div
                      key={index}
                      className="p-4 bg-[#00C2A8]/5 rounded-lg border border-[#00C2A8]/10 hover:border-[#00C2A8]/30 transition-all"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="w-8 h-8 bg-[#00C2A8]/20 rounded-lg flex items-center justify-center mb-3">
                        <span className="text-[#00C2A8] font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{module}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollBasedAnimation>

        {/* 요약 */}
        <ScrollBasedAnimation>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-8">{t("payment.summary.title")}</h3>
            <Card className="bg-black/60 border-[#00C2A8]/40 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    t("payment.summary.item1"),
                    t("payment.summary.item2"),
                    t("payment.summary.item3"),
                    t("payment.summary.item4"),
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <CheckCircle className="h-6 w-6 text-[#00C2A8] flex-shrink-0 mt-1" />
                      <p className="text-gray-200">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollBasedAnimation>
      </div>
    </section>
  )
}

function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const team = [
    {
      name: "김개발",
      role: "Lead Developer",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EC%B9%9C%EC%A0%88%ED%95%9C%20%EB%AF%B8%EC%86%8C%EC%9D%98%20%EC%BA%90%EB%A6%AD%ED%84%B0%20%EC%B4%88%EC%83%81-Sr8hMVS2zUWRIxLbneJWxTFCQ24c3u.png",
    },
    {
      name: "이블록",
      role: "Blockchain Engineer",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EC%B9%9C%EA%B7%BC%ED%95%9C%20%EB%94%94%EC%A7%80%ED%84%B8%20%EC%95%84%EB%B0%94%ED%83%80-xJdRY4VAG45SyriuG3Xww3FIwt08v8.png",
    },
    {
      name: "박디자인",
      role: "UI/UX Designer",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EC%B9%9C%EA%B7%BC%ED%95%9C%20%EB%AF%B8%EC%86%8C%EC%9D%98%203D%20%EC%BA%90%EB%A6%AD%ED%84%B0-gr3IjVolP2yEF5gRw0ItJ0SvFSXRKG.png",
    },
    {
      name: "최보안",
      role: "Security Specialist",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EC%B9%9C%EC%A0%88%ED%95%9C%20%EB%AF%B8%EC%86%8C%EC%99%80%20%EC%97%84%EC%A7%80%20%EC%B2%99-Sumkfu5zpJjJNHzNxqWrAvlRdCHDdi.png",
    },
  ]

  const partners = ["PASS 인증기관", "블록체인 파트너", "정부기관", "금융기관"]

  return (
    <section id="team" ref={ref} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1C1F2A]/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollBasedAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t("team.title")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("team.subtitle")}</p>
          </div>
        </ScrollBasedAnimation>

        {/* 팀 소개 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">{t("team.sectionTitle")}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <ScrollBasedAnimation key={index}>
                <motion.div
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#00C2A8]/30 group-hover:border-[#00C2A8] transition-colors">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-white">{member.name}</h4>
                  <p className="text-gray-400">{member.role}</p>
                </motion.div>
              </ScrollBasedAnimation>
            ))}
          </div>
        </div>

        {/* 파트너 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">{t("team.partner.sectionTitle")}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <ScrollBasedAnimation key={index}>
                <motion.div
                  className="bg-black/40 p-6 rounded-lg border border-[#00C2A8]/20 text-center hover:border-[#00C2A8]/50 transition-all backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-[#00C2A8]/20 rounded-lg mx-auto mb-4 flex items-center justify-center border border-[#00C2A8]/30">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <p className="font-medium text-white">{partner}</p>
                </motion.div>
              </ScrollBasedAnimation>
            ))}
          </div>
        </div>

        {/* IR 자료 */}
        <ScrollBasedAnimation>
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-[#00C2A8] text-[#00C2A8] hover:bg-[#00C2A8] hover:text-white px-8 py-4"
            >
              <Download className="mr-2 h-4 w-4" />
              {t("team.download")}
            </Button>
          </div>
        </ScrollBasedAnimation>
      </div>
    </section>
  )
}

function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  return (
    <section id="start" ref={ref} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C1F2A] to-black" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollBasedAnimation>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t("cta.title")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
          </div>
        </ScrollBasedAnimation>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* KYC 시뮬레이터 */}
          <ScrollBasedAnimation>
            <Card className="bg-black/40 border-[#00C2A8]/30 text-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">{t("cta.simulator.title")}</CardTitle>
                <CardDescription className="text-gray-300">{t("cta.simulator.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" className="w-full bg-[#00C2A8] hover:bg-[#00A693] text-white">
                  <Play className="mr-2 h-4 w-4" />
                  {t("cta.simulator.button")}
                </Button>
              </CardContent>
            </Card>
          </ScrollBasedAnimation>

          {/* 문의 양식 */}
          <ScrollBasedAnimation>
            <Card className="bg-black/40 border-[#00C2A8]/30 text-white backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">{t("cta.contact.title")}</CardTitle>
                <CardDescription className="text-gray-300">{t("cta.contact.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder={t("cta.contact.email")}
                  className="bg-black/20 border-[#00C2A8]/30 text-white placeholder:text-gray-400"
                />
                <Textarea
                  placeholder={t("cta.contact.message")}
                  className="bg-black/20 border-[#00C2A8]/30 text-white placeholder:text-gray-400"
                />
                <Button size="lg" className="w-full bg-[#00C2A8] hover:bg-[#00A693] text-white">
                  <Mail className="mr-2 h-4 w-4" />
                  {t("cta.contact.button")}
                </Button>
              </CardContent>
            </Card>
          </ScrollBasedAnimation>
        </div>
      </div>
    </section>
  )
}

function MyFooter() {
  const { t } = useLanguage()

  return (
    <footer className="bg-black/90 border-t border-[#00C2A8]/20 py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} TrustPort. {t("footer.rights")}
        </p>
      </div>
    </footer>
  )
}
