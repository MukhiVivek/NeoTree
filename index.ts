import { getMarketData } from "./stockdata";

console.log("Fetching market data...");

const SOL_MARKET_ID = 1;

getMarketData("5m", SOL_MARKET_ID).then((data) => {
    console.log("5m Data:", data);
}).catch((error) => {
    console.error("Error fetching 5m data:", error);
});

getMarketData("4h", SOL_MARKET_ID).then((data) => {
    console.log("4h Data:", data);
}).catch((error) => {
    console.error("Error fetching 4h data:", error);
});