'use client';

import { usePrivy } from '@privy-io/react-auth';
import MultiChainBalance from '@/components/wallet/MultiChainBalance';
import { motion } from 'framer-motion';

export default function MultichainPage() {
  const { authenticated } = usePrivy();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">멀티체인 허브</h1>
        <p className="text-purple-100">
          한 번 인증, 모든 체인에서 사용
        </p>
      </div>

      {/* Balance Display */}
      {authenticated ? (
        <MultiChainBalance />
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">🔐</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            지갑 연결이 필요합니다
          </h3>
          <p className="text-gray-600">
            상단의 "Connect Wallet" 버튼을 클릭하여 시작하세요.
          </p>
        </div>
      )}

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cross-chain Sync */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🔄</span> 크로스체인 동기화
          </h2>
          <div className="space-y-3">
            <FeatureItem
              icon="✅"
              title="Trust Score"
              description="모든 체인 동일 적용"
            />
            <FeatureItem
              icon="✅"
              title="NFT 티어"
              description="자동 동기화"
            />
            <FeatureItem
              icon="✅"
              title="보안 정책"
              description="체인 전환 시 유지"
            />
          </div>
        </div>

        {/* Supported Networks */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🌐</span> 지원 네트워크
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Ethereum', icon: '⟠' },
              { name: 'Polygon', icon: '⬣' },
              { name: 'Avalanche', icon: '🔺' },
              { name: 'Arbitrum', icon: '🔷' },
              { name: 'Base', icon: '🔵' },
              { name: 'Optimism', icon: '🔴' },
            ].map((network, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{network.icon}</div>
                <div className="text-xs font-semibold text-gray-700">
                  {network.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          💡 멀티체인의 장점
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <BenefitCard
            icon="⚡"
            title="빠른 전환"
            description="체인 전환에 소요되는 시간 최소화"
          />
          <BenefitCard
            icon="💰"
            title="자산 통합 관리"
            description="모든 체인 자산을 한눈에 확인"
          />
          <BenefitCard
            icon="🔒"
            title="통합 보안"
            description="체인 상관없이 동일한 보안 수준"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
