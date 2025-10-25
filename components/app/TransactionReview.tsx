"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Bot, Shield, Clock, Settings, CheckCircle } from "lucide-react"
import transactionData from "@/data/transactionData.json"

export default function TransactionReview() {
  const [selectedTx, setSelectedTx] = useState(transactionData.scenarios[0])
  const [currentLayer, setCurrentLayer] = useState(0)
  const [isExecuting, setIsExecuting] = useState(false)

  const securityLayers = [
    { name: "NL Review", icon: Search, status: "checking" },
    { name: "AI Risk", icon: Bot, status: "pending" },
    { name: "Firewall", icon: Shield, status: "pending" },
    { name: "Delay", icon: Clock, status: "pending" },
    { name: "Policy", icon: Settings, status: "pending" },
    { name: "Execute", icon: CheckCircle, status: "pending" },
  ]

  const handleExecute = async () => {
    setIsExecuting(true)
    for (let i = 0; i < securityLayers.length; i++) {
      setCurrentLayer(i)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    setIsExecuting(false)
    setCurrentLayer(0)
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">거래 선택</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {transactionData.scenarios.map((tx, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTx(tx)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedTx.id === tx.id
                  ? "border-teal-500 bg-teal-500/10"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">{tx.type}</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    tx.riskLevel === "low"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : tx.riskLevel === "medium"
                        ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {tx.riskLevel.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-slate-400">{tx.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">거래 상세</h2>
        <div className="space-y-3">
          <div className="flex justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <span className="text-slate-400">From:</span>
            <span className="font-mono text-sm text-white">{selectedTx.from}</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <span className="text-slate-400">To:</span>
            <span className="font-mono text-sm text-white">{selectedTx.to}</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <span className="text-slate-400">Amount:</span>
            <span className="font-semibold text-white">{selectedTx.amount}</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <span className="text-slate-400">Chain:</span>
            <span className="font-semibold text-white">{selectedTx.chain}</span>
          </div>
        </div>
      </div>

      {isExecuting && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-4">보안 검사 진행 중</h2>
          <div className="space-y-3">
            {securityLayers.map((layer, idx) => {
              const Icon = layer.icon
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    idx < currentLayer
                      ? "bg-green-500/10 border-green-500/20"
                      : idx === currentLayer
                        ? "bg-teal-500/10 border-teal-500/20"
                        : "bg-slate-800/50 border-slate-700/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-6 h-6 ${
                        idx < currentLayer
                          ? "text-green-400"
                          : idx === currentLayer
                            ? "text-teal-400"
                            : "text-slate-500"
                      }`}
                    />
                    <span className="font-semibold text-white">{layer.name}</span>
                  </div>
                  {idx < currentLayer && <CheckCircle className="w-5 h-5 text-green-400" />}
                  {idx === currentLayer && <Clock className="w-5 h-5 text-teal-400 animate-pulse" />}
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      <button
        onClick={handleExecute}
        disabled={isExecuting}
        className="w-full px-8 py-4 bg-teal-500 text-white font-bold text-lg rounded-xl hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExecuting ? "보안 검사 중..." : "거래 실행"}
      </button>
    </div>
  )
}
