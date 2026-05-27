// @/components/demo/LayerStatus.tsx
import { SecurityLayerResult } from "@/data/demo";
import { CheckCircle, AlertTriangle, XCircle, Clock, Loader } from "lucide-react";

interface LayerStatusProps {
  layer: SecurityLayerResult;
  status: 'pending' | 'checking' | 'completed';
}

const statusConfig = {
  pass: {
    icon: <CheckCircle className="text-green-500" />,
    textColor: "text-green-500",
    label: "통과",
  },
  warn: {
    icon: <AlertTriangle className="text-yellow-500" />,
    textColor: "text-yellow-500",
    label: "경고",
  },
  fail: {
    icon: <XCircle className="text-red-500" />,
    textColor: "text-red-500",
    label: "차단",
  },
  info: {
    icon: <CheckCircle className="text-blue-500" />,
    textColor: "text-blue-500",
    label: "정보",
  },
};

export default function LayerStatus({ layer, status }: LayerStatusProps) {
  const renderStatus = () => {
    if (status === 'pending') {
      return (
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Clock className="w-5 h-5 mr-2" />
          <span>대기 중</span>
        </div>
      );
    }
    if (status === 'checking') {
      return (
        <div className="flex items-center text-blue-500">
          <Loader className="w-5 h-5 mr-2 animate-spin" />
          <span>확인 중...</span>
        </div>
      );
    }
    if (status === 'completed') {
      const config = statusConfig[layer.status];
      return (
        <div className={`flex items-center font-bold ${config.textColor}`}>
          <div className="w-5 h-5 mr-2">{config.icon}</div>
          <span>{config.label}</span>
        </div>
      );
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between transition-all duration-300">
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{layer.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {status === 'completed' ? layer.details : layer.message}
        </p>
      </div>
      <div className="w-28 text-right">
        {renderStatus()}
      </div>
    </div>
  );
}
