'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { transactionScenarios, TransactionScenario } from '@/data/transactionScenarios';

export default function TransactionReview() {
  const [currentScenario, setCurrentScenario] = useState<TransactionScenario>(
    transactionScenarios[0]
  );
  const [delayTimer, setDelayTimer] = useState(0);
  const [panicRevokeTimer, setPanicRevokeTimer] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  // Delay Protection Timer
  useEffect(() => {
    if (delayTimer > 0) {
      const interval = setInterval(() => {
        setDelayTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [delayTimer]);

  // Panic Revoke Timer
  useEffect(() => {
    if (panicRevokeTimer > 0) {
      const interval = setInterval(() => {
        setPanicRevokeTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [panicRevokeTimer]);

  const handleExecute = () => {
    const delayLayer = currentScenario.securityLayers.find(l => l.id === 'delay');
    const delaySeconds = currentScenario.riskLevel === 'high' ? 10 :
                        currentScenario.riskLevel === 'medium' ? 5 : 0;

    if (delaySeconds > 0) {
      setDelayTimer(delaySeconds);
      setIsExecuting(true);

      setTimeout(() => {
        executeTransaction();
      }, delaySeconds * 1000);
    } else {
      executeTransaction();
    }
  };

  const executeTransaction = () => {
    setIsExecuting(false);
    setPanicRevokeTimer(30); // 30초 취소 가능
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handlePanicRevoke = () => {
    setPanicRevokeTimer(0);
    alert('🚨 거래가 긴급 취소되었습니다!');
  };

  const riskColors = {
    low: { bg: 'from-green-400 to-green-600', text: 'text-green-700', border: 'border-green-200' },
    medium: { bg: 'from-yellow-400 to-orange-500', text: 'text-orange-700', border: 'border-orange-200' },
    high: { bg: 'from-red-400 to-red-600', text: 'text-red-700', border: 'border-red-200' },
  };

  const currentColor = riskColors[currentScenario.riskLevel];
  const isBlocked = currentScenario.securityLayers.some(l => l.status === 'blocked');

  return (
    <div className="space-y-6">
      {/* Scenario Selector */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          거래 시나리오 선택
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {transactionScenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setCurrentScenario(scenario)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                currentScenario.id === scenario.id
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-bold text-gray-900 mb-1">{scenario.name}</div>
              <div className="text-sm text-gray-600">{scenario.description}</div>
              <div className={`mt-2 inline-block px-2 py-1 rounded text-xs font-semibold ${
                scenario.riskLevel === 'low' ? 'bg-green-100 text-green-700' :
                scenario.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {scenario.riskLevel === 'low' ? '낮음' :
                 scenario.riskLevel === 'medium' ? '중간' : '높음'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction Details */}
      <div className={`bg-gradient-to-br ${currentColor.bg} rounded-xl p-6 text-white`}>
        <h2 className="text-2xl font-bold mb-4">거래 상세</h2>
        <div className="space-y-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <div>
            <div className="text-sm opacity-80">수신자</div>
            <div className="font-mono text-lg">{currentScenario.to}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">금액</div>
            <div className="text-3xl font-bold">{currentScenario.value} ETH</div>
          </div>
          <div>
            <div className="text-sm opacity-80">위험도</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{currentScenario.riskScore}/100</div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                currentScenario.riskLevel === 'low' ? 'bg-green-500' :
                currentScenario.riskLevel === 'medium' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}>
                {currentScenario.riskLevel === 'low' ? '낮음' :
                 currentScenario.riskLevel === 'medium' ? '중간' : '높음'}
              </div>
            </div>
          </div>
          {currentScenario.counterpartyTrustScore && (
            <div>
              <div className="text-sm opacity-80">상대방 Trust Score</div>
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold">{currentScenario.counterpartyTrustScore}</div>
                <div className="px-2 py-1 bg-yellow-500 rounded text-sm font-semibold">
                  {currentScenario.counterpartyTier}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* NL Review */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>📖</span> Natural Language Review
        </h3>
        <div className={`p-4 rounded-lg border-2 ${
          currentScenario.riskLevel === 'high'
            ? 'bg-red-50 border-red-200'
            : currentScenario.riskLevel === 'medium'
            ? 'bg-yellow-50 border-yellow-200'
            : 'bg-green-50 border-green-200'
        }`}>
          <p className="text-gray-900">{currentScenario.nlReview}</p>
        </div>
      </div>

      {/* 6-Layer Security OS */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          🛡️ 6-Layer Security OS
        </h3>
        <div className="space-y-3">
          {currentScenario.securityLayers.map((layer, idx) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-lg border-2 ${
                layer.status === 'pass' ? 'bg-green-50 border-green-200' :
                layer.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{layer.icon}</div>
                  <div>
                    <div className="font-bold text-gray-900">{layer.name}</div>
                    <div className="text-sm text-gray-600">{layer.message}</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  layer.status === 'pass' ? 'bg-green-500 text-white' :
                  layer.status === 'warning' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {layer.status === 'pass' ? '통과' :
                   layer.status === 'warning' ? '경고' : '차단'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {!isBlocked ? (
          <>
            <button
              onClick={handleExecute}
              disabled={isExecuting || delayTimer > 0}
              className="flex-1 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {delayTimer > 0 ? `대기 중... ${delayTimer}초` :
               isExecuting ? '실행 중...' : '거래 실행'}
            </button>
            <button
              onClick={() => alert('거래가 취소되었습니다')}
              className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              취소
            </button>
          </>
        ) : (
          <div className="flex-1 py-4 bg-red-500 text-white font-bold rounded-lg text-center">
            🛑 거래 차단됨 - 보안 위험 감지
          </div>
        )}
      </div>

      {/* Panic Revoke */}
      <AnimatePresence>
        {panicRevokeTimer > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">🚨 Panic Revoke 활성화</h3>
                <p className="text-orange-100">
                  거래가 실행되었습니다. {panicRevokeTimer}초 내에 긴급 취소 가능합니다.
                </p>
              </div>
              <button
                onClick={handlePanicRevoke}
                className="px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors"
              >
                긴급 취소
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <div className="font-bold text-lg">거래 성공!</div>
                <div className="text-sm text-green-100">Trust Score +10점 획득</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
