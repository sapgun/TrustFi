// @/components/demo/ScenarioSelector.tsx
import { DemoScenario } from "@/data/demo";

interface ScenarioSelectorProps {
  scenarios: DemoScenario[];
  onSelect: (scenario: DemoScenario) => void;
}

export default function ScenarioSelector({ scenarios, onSelect }: ScenarioSelectorProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">1. 시나리오 선택</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onSelect(scenario)}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">{scenario.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{scenario.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
