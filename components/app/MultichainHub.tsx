"use client"

import { useState } from "react"
import { Send, Download, Repeat } from "lucide-react"
import walletData from "@/data/walletData.json"

export default function MultichainHub() {
  const [selectedChain, setSelectedChain] = useState(walletData.chains[0])

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">지원 체인</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {walletData.chains.map((chain, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedChain(chain)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedChain.id === chain.id
                  ? "border-teal-500 bg-teal-500/10"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
              }`}
            >
              <div className="font-semibold text-sm text-white">{chain.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">{selectedChain.name} 지갑</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <span className="text-slate-400">잔액</span>
            <span className="text-2xl font-bold text-white">{selectedChain.balance}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <span className="text-slate-400">USD 가치</span>
            <span className="text-xl font-semibold text-teal-400">${selectedChain.usdValue}</span>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <span className="text-slate-400 block mb-2">주소</span>
            <span className="font-mono text-sm break-all text-white">{selectedChain.address}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: "전송", icon: Send },
          { title: "수신", icon: Download },
          { title: "스왑", icon: Repeat },
        ].map((action, idx) => {
          const Icon = action.icon
          return (
            <button
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-teal-500/50 transition-all group"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                <Icon className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white">{action.title}</h3>
            </button>
          )
        })}
      </div>
    </div>
  )
}
