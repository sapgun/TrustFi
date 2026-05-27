// @/components/demo/ResultDisplay.tsx
interface ResultDisplayProps {
  isBlocked: boolean;
  onReset: () => void;
}

export default function ResultDisplay({ isBlocked, onReset }: ResultDisplayProps) {
  return (
    <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
      <h3 className="text-xl font-bold text-center mb-4">
        {isBlocked ? "🚨 거래가 차단되었습니다" : "✅ 분석 완료"}
      </h3>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        {isBlocked
          ? "보안 시스템이 심각한 위협을 감지하여 거래를 안전하게 차단했습니다. 자산은 안전하게 보호됩니다."
          : "보안 분석이 완료되었습니다. 아래 요약된 내용을 검토한 후 거래를 진행하거나 취소할 수 있습니다."}
      </p>

      <div className="flex justify-center items-center space-x-4">
        {!isBlocked && (
          <>
            <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
              거래 실행
            </button>
            <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
              긴급 취소 (30초)
            </button>
          </>
        )}
        <button
          onClick={onReset}
          className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          다른 시나리오 테스트
        </button>
      </div>
    </div>
  );
}
