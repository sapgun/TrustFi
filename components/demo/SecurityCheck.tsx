// @/components/demo/SecurityCheck.tsx
"use client";

import { useState, useEffect } from "react";
import { DemoScenario } from "@/data/demo";
import LayerStatus from "./LayerStatus";
import ResultDisplay from "./ResultDisplay";

interface SecurityCheckProps {
  scenario: DemoScenario;
  onReset: () => void;
}

type CheckStatus = 'pending' | 'checking' | 'completed';

export default function SecurityCheck({ scenario, onReset }: SecurityCheckProps) {
  const [statuses, setStatuses] = useState<Record<string, CheckStatus>>({});
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const initialStatuses = scenario.layers.reduce((acc, layer) => {
      acc[layer.id] = 'pending';
      return acc;
    }, {} as Record<string, CheckStatus>);
    setStatuses(initialStatuses);
  }, [scenario]);

  useEffect(() => {
    if (currentLayerIndex < scenario.layers.length) {
      const currentLayer = scenario.layers[currentLayerIndex];

      // Start checking the current layer
      setStatuses(prev => ({ ...prev, [currentLayer.id]: 'checking' }));

      // After a delay, mark as completed and move to the next
      const timer = setTimeout(() => {
        setStatuses(prev => ({ ...prev, [currentLayer.id]: 'completed' }));
        setCurrentLayerIndex(currentLayerIndex + 1);
      }, 1500); // 1.5 second delay for each check

      return () => clearTimeout(timer);
    } else {
      // All layers are checked
      const completionTimer = setTimeout(() => setIsComplete(true), 1000);
      return () => clearTimeout(completionTimer);
    }
  }, [currentLayerIndex, scenario.layers]);

  const isBlocked = scenario.layers.some(layer => layer.status === 'fail');

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">보안 분석 진행 중...</h3>
      <div className="space-y-2">
        {scenario.layers.map(layer => (
          <LayerStatus
            key={layer.id}
            layer={layer}
            status={statuses[layer.id] || 'pending'}
          />
        ))}
      </div>

      {isComplete && (
        <div className="mt-6 animate-fade-in">
          <ResultDisplay isBlocked={isBlocked} onReset={onReset} />
        </div>
      )}
    </div>
  );
}
