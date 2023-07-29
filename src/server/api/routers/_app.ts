/**
 * This file contains the root router of your tRPC-backend
 */
import { createTRPCRouter, publicProcedure } from '../trpc';
import { observable } from '@trpc/server/observable';
import { clearInterval } from 'timers';
import {tickerRouter} from "~/server/api/routers/ticker";

export const appRouter = createTRPCRouter({
    healthcheck: publicProcedure.query(() => 'yay!'),

    ticker: tickerRouter,

    randomNumber: publicProcedure.subscription(() => {
        return observable<number>((emit) => {
            const int = setInterval(() => {
                emit.next(Math.random());
            }, 500);
            return () => {
                clearInterval(int);
            };
        });
    }),
});

export type AppRouter = typeof appRouter;
