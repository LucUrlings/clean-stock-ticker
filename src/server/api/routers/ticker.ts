import { createTRPCRouter, publicProcedure } from "../trpc";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { clearInterval } from "timers";

export const tickerRouter = createTRPCRouter({
  ticker: publicProcedure
    .input(z.object({ v: z.number() }))
    .subscription(({ input }) => {
      return observable<{ value: number }>((emit) => {
        const timer = setInterval(() => {
          // emits a number every second
          emit.next({ value: Math.random() * 100 });
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      });
    }),
});
