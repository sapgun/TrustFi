// @/components/demo/DemoContainer.tsx
"use client";

import { useState } from "react";
import { DEMO_SCENARIOS, DemoScenario } from "@/data/demo";
import ScenarioSelector from "./ScenarioSelector";
import SecurityCheck from "./SecurityCheck";

export default function DemoContainer() {
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleSelectScenario = (scenario: DemoScenario) => {
    setSelectedScenario(scenario);
    setIsRunning(false); // Reset running state when a new scenario is selected
  };

  const handleRunDemo = () => {
    if (selectedScenario) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setIsRunning(false);
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden">
      <div className="p-6">
        {!selectedScenario ? (
          <ScenarioSelector scenarios={DEMO_SCENARIOS} onSelect={handleSelectScenario} />
        ) : (
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{selectedScenario.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{selectedScenario.description}</p>
            </div>

            {!isRunning ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleRunDemo}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  분석 시작하기
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  시나리오 변경
                </button>
              </div>
            ) : (
              <SecurityCheck scenario={selectedScenario} onReset={handleReset} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
