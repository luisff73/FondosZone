import React from "react";

interface PeriodSelectorProps {
  onSelectPeriod: (period: string) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ onSelectPeriod }) => {
  const periods = ["1d", "1wk", "1mo", "1y"]; // Períodos disponibles

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-4">Select a Period</h3>
      <div className="flex gap-4">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => onSelectPeriod(period)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PeriodSelector;