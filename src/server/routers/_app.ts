/**
 * This file contains the root router of your tRPC-backend
 */
import { createTRPCRouter, publicProcedure } from '../trpc';
import { observable } from '@trpc/server/observable';
import { clearInterval } from 'timers';
import {tickerRouter} from "./ticker";
import {z} from "zod";

export const appRouter = createTRPCRouter({
    healthcheck: publicProcedure.query(() => 'yay!'),

    ticker: tickerRouter,

    randomNumber2: publicProcedure
        .input(z.object({ odd: z.boolean() }))
        .subscription(({ input }) => {
            return observable<{ randomNumber: number }>((emit) => {
                const timer = setInterval(() => {
                    // emits a number every second
                    let randomNumber = Math.round(Math.random() * 10000);
                    if (
                        (input.odd && randomNumber % 2 === 1) ||
                        (!input.odd && randomNumber % 2 === 0)
                    )
                        randomNumber++;
                    emit.next({ randomNumber });
                }, 1000);

                return () => {
                    clearInterval(timer);
                };
            });
        }),

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
