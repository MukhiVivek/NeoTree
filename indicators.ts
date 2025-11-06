import type { Candlestick } from "./lighter-sdk-ts/generated";

export function getEMA(prices : number[] , priod : number){
    const multiplier = 2 / (priod + 1);
    const smaInterval = prices.length - priod;

    if (smaInterval < 1) {
        throw new Error("Not enough data points to calculate EMA");
    }

    let sma = 0;

    for(let i=0; i<smaInterval; i++){
        sma += (prices[i] ?? 0);
    }

    sma /= smaInterval;

    const emas = [sma];

    for(let i=0; i<priod; i++){
        const ema = (emas[emas.length - 1] ?? 0) * (1 - multiplier) + (prices[smaInterval + i] ?? 0) * multiplier; 
        emas.push(ema);
    }

    return emas;

}

export function getMidPrices(candlesticks : Candlestick[]){
    return candlesticks.map(({open , close}) => Number(((open + close) / 2)));
}

// MACD = EMA26 - EMA14
export function getMACD(prices: number[]) {
    const ema26 = getEMA(prices, 26);
    const ema14 = getEMA(prices, 14);
    const macd = ema26.slice(-14).map((value, index) => (ema26[index] ?? 0) - (ema14[index] ?? 0));
    return macd;
}