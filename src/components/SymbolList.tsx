import React from "react";

interface SymbolListProps {
  onSelectSymbol: (symbol: string) => void; // Función que se ejecuta cuando se selecciona un símbolo
}

const SymbolList: React.FC<SymbolListProps> = ({ onSelectSymbol }) => {
  // Lista de símbolos de acciones
  const symbols = ["AAPL", "IBM", "GOOGL", "MSFT", "AMZN", "TSLA", "FB", "TWTR", "NFLX", "INTC", "CSCO", "NVDA",  "BABA", "PLTR"];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-4">Select a Symbol</h3>
      <div className="flex gap-4">
        {symbols.map((symbol) => (
          <button
            key={symbol} // Clave única para cada botón
            onClick={() => onSelectSymbol(symbol)} // Ejecuta onSelectSymbol al hacer clic
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SymbolList;