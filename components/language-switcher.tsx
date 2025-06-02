"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === "ko" ? "en" : "ko")
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-white/80 hover:text-[#00C2A8] hover:bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-36 bg-black/90 border border-[#00C2A8]/30 rounded-md shadow-lg overflow-hidden z-50"
          >
            <div className="py-1">
              <button
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === "ko" ? "bg-[#00C2A8]/20 text-[#00C2A8]" : "text-white/80 hover:bg-[#00C2A8]/10"
                }`}
                onClick={() => {
                  setLanguage("ko")
                  setIsOpen(false)
                }}
              >
                한국어
              </button>
              <button
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === "en" ? "bg-[#00C2A8]/20 text-[#00C2A8]" : "text-white/80 hover:bg-[#00C2A8]/10"
                }`}
                onClick={() => {
                  setLanguage("en")
                  setIsOpen(false)
                }}
              >
                English
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
