const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

export const fetchHistoricalData = async (symbol: string): Promise<any> => {
  const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&symbol=${symbol}&range=1mo&region=US`;
    const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    // console.log("API Response:", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // console.log("API Response FIRST:", response);
    const result = await response.json();
     console.log("API Response:", result); 
    return result;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    throw error;
  }
};