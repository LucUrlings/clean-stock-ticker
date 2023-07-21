import 'dotenv/config'
import * as finnhub from 'finnhub'
import mongoose from 'mongoose';
import {TickerData, TickersToTrack} from "./models";

mongoose.connect(process.env.DB_CONN_STRING)
    .then(() => log(severity.INFO, 'Connected to database!'));

const {connection} = mongoose;
const Ticker = connection.model('Tickers', TickerData)
const TTT = connection.model('TickersToTrack', TickersToTrack)

// new TTT({tickers: ['BINANCE:BTCUSDT']}).save()

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "citbjlhr01qu27mnrtp0citbjlhr01qu27mnrtpg" // Replace this
const finnhubClient = new finnhub.DefaultApi()


const getPrice = (ticker: string) => {
    setTimeout(() => finnhubClient.quote(ticker, async (error, data, response) => {
        if (error) {
            log(severity.ERROR, 'Error getting price', error.status, error.message)
            return
        }
        await createOrUpdateTicker(ticker, data.c)
    }), 2500);
}

const createOrUpdateTicker = async (tickerName: string, newPrice: number) => {
    log(severity.INFO, "Creating or updating ticker", tickerName, newPrice)
    const ticker = await Ticker.findOne({ticker: tickerName}).exec()
    if (ticker) {
        if (ticker.price === newPrice) return
        log(severity.INFO, "Updating price", tickerName, 'Old price', ticker.price, 'New price', newPrice)
        ticker.price = newPrice
        ticker.lastUpdated = new Date()
        ticker.save()
    } else {
        log(severity.INFO, "Creating new ticker", tickerName, newPrice)
        const newTicker = new Ticker({ticker: tickerName, price: newPrice})
        await newTicker.save()
    }
}

const getTickers = async () => {
    const tickers = await TTT.findOne({}).exec()
    if (!tickers) return
    tickers.tickers.forEach(ticker => getPrice(ticker), 50)
}
setInterval(getTickers, 300000)

enum severity {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

const log = (logLevel: severity, ...message: any[]) => {
    if (logLevel === severity.INFO) console.log(`INFO   [${new Date().toLocaleString()}] -`, ...message)
    if (logLevel === severity.WARN) console.warn(`WARN   [${new Date().toLocaleString()}] -`, ...message)
    if (logLevel === severity.ERROR) console.error(`\x1b[31mERROR  [${new Date().toLocaleString()}]\x1b[0m -`, ...message)
}