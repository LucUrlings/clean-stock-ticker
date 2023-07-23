import 'dotenv/config'
import * as finnhub from 'finnhub'
import mongoose from 'mongoose';
import {ActiveAnonymousUsers, TickerData} from "./models";
import {log} from "./utils/logger";

mongoose.connect(process.env.DB_CONN_STRING)
    .then(() => log("INFO", 'Connected to database!'));

const {connection} = mongoose;
const Ticker = connection.model('Tickers', TickerData)
const Users = connection.model('ActiveAnonymousUsers', ActiveAnonymousUsers)

// new Users({tickers: ['BINANCE:BTCUSDT']}).save()

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "citbjlhr01qu27mnrtp0citbjlhr01qu27mnrtpg" // Replace this
const finnhubClient = new finnhub.DefaultApi()

const getPrice = (ticker: string) => {
    setTimeout(() => finnhubClient.quote(ticker, async (error, data, response) => {
        if (error) {
            log("ERROR", 'Error getting price', error.status, error.message)
            return
        }
        await createOrUpdateTicker(ticker, data.c)
    }), 2500);
}

const createOrUpdateTicker = async (tickerName: string, newPrice: number) => {
    log("INFO", "Creating or updating ticker", tickerName, newPrice)
    const ticker = await Ticker.findOne({ticker: tickerName}).exec()
    if (ticker) {
        if (ticker.price === newPrice) return
        log("INFO", "Updating price", tickerName, 'Old price', ticker.price, 'New price', newPrice)
        ticker.price = newPrice
        ticker.lastUpdated = new Date()
        ticker.save()
    } else {
        log("INFO", "Creating new ticker", tickerName, newPrice)
        const newTicker = new Ticker({ticker: tickerName, price: newPrice})
        await newTicker.save()
    }
}

const getTickers = async () => {
    const users = await Users.find({}).exec()

    const uniqueTickers = new Set<string>()
    users.forEach(user => user.tickers.forEach(ticker => uniqueTickers.add(ticker)))


    if (!uniqueTickers) return
    uniqueTickers.forEach((ticker) => getPrice(ticker), 50)
}

setInterval(getTickers, 300000)

