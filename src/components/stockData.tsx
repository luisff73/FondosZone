import { useState, useEffect } from "react";
import { fetchHistoricalData } from "../services/yahooFinanceApi";
import SymbolList from "./SymbolList";
import PeriodSelector from "./PeriodSelector";
import StockChart from "./StockChart";

const StockDataComponent = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("AAPL");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1mo"); // Período predeterminado
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transforma los datos de la API para la gráfica
  const transformData = (apiData: any): { date: string; price: number }[] => {
    if (!apiData || !apiData.chart || !apiData.chart.result) return [];

    const result = apiData.chart.result[0];
    const timestamps = result.timestamp;
    const prices = result.indicators.quote[0].close;

    return timestamps.map((timestamp: number, index: number) => ({
      date: new Date(timestamp * 1000).toLocaleDateString(),
      price: prices[index],
    }));
  };

  // Obtiene los datos históricos cuando cambia el símbolo o el período
  useEffect(() => {
    const getHistoricalData = async () => {
      try {
        const data = await fetchHistoricalData(selectedSymbol, selectedPeriod);
        setHistoricalData(data);
      } catch (err) {
        console.error("Error in getHistoricalData:", err);
        setError("Error fetching historical data");
      } finally {
        setLoading(false);
      }
    };

    getHistoricalData();
  }, [selectedSymbol, selectedPeriod]);

  // Función que se ejecuta cuando el usuario selecciona un símbolo
  const handleSelectSymbol = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  // Función que se ejecuta cuando el usuario selecciona un período
  const handleSelectPeriod = (period: string) => {
    setSelectedPeriod(period);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Stock Data</h2>
      {/* Muestra la lista de símbolos */}
      <SymbolList onSelectSymbol={handleSelectSymbol} />
      {/* Muestra el selector de período */}
      <PeriodSelector onSelectPeriod={handleSelectPeriod} />
      {/* Muestra la gráfica con los datos históricos */}
      {historicalData && (
        <div>
          <h3 className="text-lg font-bold mb-4">Historical Data for {selectedSymbol}</h3>
          <StockChart data={transformData(historicalData)} />
        </div>
      )}
    </div>
  );
};

export default StockDataComponent;