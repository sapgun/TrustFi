"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const sections = [
    { id: "demo", label: "데모", labelEn: "Demo" },
    { id: "proof-of-trust", label: "Proof of Trust", labelEn: "" },
    { id: "ecosystem", label: "생태계", labelEn: "Ecosystem" },
    { id: "technology", label: "기술", labelEn: "Technology" },
    { id: "features", label: "기능", labelEn: "Features" },
    { id: "security", label: "보안", labelEn: "Security" },
    { id: "pools", label: "풀", labelEn: "Pools" },
    { id: "roadmap", label: "로드맵", labelEn: "Roadmap" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-slate-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white">TrustFi</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-teal-400 transition-colors"
              aria-label="메뉴"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/app">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-lg transition-colors text-sm sm:text-base"
              >
                시작하기
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/95 backdrop-blur-xl border-b border-slate-800/50 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="grid grid-cols-2 gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-left px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors group"
                  >
                    <div className="text-white font-medium group-hover:text-teal-400 transition-colors">
                      {section.label}
                    </div>
                    {section.labelEn && (
                      <div className="text-xs text-slate-500 group-hover:text-teal-500/70 transition-colors">
                        {section.labelEn}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
