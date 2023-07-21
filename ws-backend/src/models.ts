import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const TickerData = new Schema({
    id: ObjectId,
    ticker: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    lastUpdated: {type: Date, default: Date.now}
});

export const TickersToTrack = new Schema({
    id: ObjectId,
    tickers: [String]
})

