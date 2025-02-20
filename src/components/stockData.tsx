import { useState, useEffect } from "react";
import { fetchHistoricalData } from "../services/yahooFinanceApi";
import SymbolList from "./SymbolList";
import StockChart from "./StockChart";

const StockDataComponent = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("AAPL");
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transforma los datos de la API para la gráfica
  const transformData = (apiData: any): { date: string; price: number }[] => {
    if (!apiData || !apiData.chart || !apiData.chart.result) return [];
    // console.log("API Data:", apiData);
    const result = apiData.chart.result[0];
    // console.log("Result:", result);
    const timestamps = result.timestamp;
    // console.log("Timestamps:", timestamps);
    const prices = result.indicators.quote[0].close;
    // console.log("Prices:", prices);
    return timestamps.map((timestamp: number, index: number) => ({
      date: new Date(timestamp * 1000).toLocaleDateString(),
      price: prices[index],
    }));
  };

  // Obtiene los datos históricos cuando cambia el símbolo seleccionado
  useEffect(() => {
    const getHistoricalData = async () => {
      try {
        const data = await fetchHistoricalData(selectedSymbol);
        // console.log("Data getHistoricalData:", data);
        setHistoricalData(data);
      } catch (err) {
        console.error("Error in getHistoricalData:", err);
        setError("Error fetching historical data");
      } finally {
        setLoading(false);
      }
    };

    getHistoricalData();
  }, [selectedSymbol]);

  // Función que se ejecuta cuando el usuario selecciona un símbolo
  const handleSelectSymbol = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Stock Data</h2>
      {/* Muestra la lista de símbolos */}
      <SymbolList onSelectSymbol={handleSelectSymbol} />
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