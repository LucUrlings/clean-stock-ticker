import { EventEmitter } from 'events';
import {initTRPC, router} from '@trpc/server';
import {tickerRouter} from "~/server/api/routers/ticker";

// create a global event emitter (could be replaced by redis, etc)
const ee = new EventEmitter();

const t = initTRPC.create();


export const appRouter = t.router({
    ticker: tickerRouter,
})
