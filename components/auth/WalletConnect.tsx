'use client';

import { usePrivy } from '@privy-io/react-auth';
import { motion } from 'framer-motion';

export default function WalletConnect() {
  const { login, authenticated, user, logout } = usePrivy();

  if (!authenticated) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={login}
        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        🔐 Connect Wallet
      </motion.button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
        <span className="text-sm text-green-700 font-semibold">
          {user?.email?.address || user?.google?.email || 'Connected'}
        </span>
      </div>
      <button
        onClick={logout}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
