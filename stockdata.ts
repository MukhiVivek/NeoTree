import { NewLineKind } from "typescript";
import { CandlestickApi, IsomorphicFetchHttpLibrary, ServerConfiguration } from "./lighter-sdk-ts/generated";
import { getEMA, getMACD, getMidPrices } from "./indicators";
const BASE_URL = "https://mainnet.zklighter.elliot.ai"

const klinesApi = new CandlestickApi({
        baseServer: new ServerConfiguration<{  }>(BASE_URL, {  }),
        httpApi: new IsomorphicFetchHttpLibrary(),
        middleware: [],
        authMethods: {}
});

export async function getMarketData(duration: "5m" | "4h" , SOL_MARKET_ID: number) : Promise<{ midprice: number[] , ema20s: number[] , macd: number[] }> {
    const klines = await klinesApi.candlesticks(SOL_MARKET_ID, duration, Date.now() - 1000 * 60 * 60 * 1, Date.now(), 50, false);
    const midprice = getMidPrices(klines.candlesticks ?? []);
    const ema20s = getEMA(midprice, 20);
    const macd = getMACD(midprice);

    return{
        midprice: midprice.slice(-10),
        ema20s: ema20s.slice(-10),
        macd: macd.slice(-10)
    }
}
