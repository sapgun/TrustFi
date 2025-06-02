"use client"

import { Github, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-[#00C2A8]/20 py-12">
      <div className="container mx-auto px-6 text-center">
        <motion.div className="text-2xl font-bold text-white mb-4 inline-block" whileHover={{ scale: 1.05 }}>
          <span className="text-[#00C2A8]">Trust</span>Port
        </motion.div>
        <p className="text-gray-400 mb-6">{t("footer.copyright")}</p>
        <div className="flex justify-center space-x-6">
          <motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={{ scale: 1.1 }}>
            <Github className="h-5 w-5" />
          </motion.a>
          <motion.a href="#" className="text-gray-400 hover:text-white transition-colors" whileHover={{ scale: 1.1 }}>
            <Twitter className="h-5 w-5" />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
