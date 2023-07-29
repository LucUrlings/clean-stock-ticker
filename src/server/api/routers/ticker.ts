import { z } from "zod";
import { createTRPCRouter, publicProcedure } from '../trpc';
import { observable } from "@trpc/server/observable";

export const tickerRouter = createTRPCRouter({
  ticker: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const timer = setInterval(() => {
        // emits a number every second
        emit.next(Math.random());
      }, 200);

      return () => {
        clearInterval(timer);
      };
    });
  }),
});
