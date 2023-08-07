import { createTRPCRouter, publicProcedure } from "../trpc";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { clearInterval } from "timers";
import * as finnhub from "finnhub";
import { EventEmitter } from "events";

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "citbjlhr01qu27mnrtp0citbjlhr01qu27mnrtpg"; // Replace this
const finnhubClient = new finnhub.DefaultApi();

const ee = new EventEmitter();

const listenerCount = new Map<
  string,
  { listeners: number; lastPrice: number }
>();

const updatePrice = (ticker: string, price: number) => {
  const tickerData = listenerCount.get(ticker) ?? {
    listeners: 0,
    lastPrice: 0,
  };
  if (tickerData.lastPrice !== price) {
    tickerData.lastPrice = price;
    listenerCount.set(ticker, tickerData);
    ee.emit(ticker, price);
  }
};

const addListener = (ticker: string) => {
  console.log("adding listener for", ticker);
  const tickerData = listenerCount.get(ticker) ?? {
    listeners: 0,
    lastPrice: 0,
  };
  listenerCount.set(ticker, {
    listeners: tickerData.listeners + 1,
    lastPrice: 0,
  });
};

const removeListener = (ticker: string) => {
  console.log("removing listener for", ticker);
  const tickerData = listenerCount.get(ticker) ?? {
    listeners: 0,
    lastPrice: 0,
  };
  listenerCount.set(ticker, {
    listeners: tickerData.listeners - 1,
    lastPrice: 0,
  });
};

const interval = setInterval(() => {
  console.log("Different tickers", listenerCount.size);
  console.log(
    "Tickers listened to",
    Array.from(listenerCount.entries()).reduce(
      (accumulator, [key, value]) => accumulator + value.listeners,
      0
    )
  );
  listenerCount.forEach((tickerData, ticker) => {
    if (tickerData.listeners > 0) {
      console.log("getting price for", ticker);

      finnhubClient.quote(
        ticker,
        async (
          error: { status: number; message: string },
          data: { c: number }
        ) => {
          if (error) {
            console.error("Error getting price", error.status, error.message);
            return;
          }
          if (data.c !== tickerData.lastPrice) {
            console.log("new price for", ticker, tickerData.lastPrice, data.c);
            updatePrice(ticker, data.c);
            ee.emit(ticker, { ticker: ticker, tickerPrice: data.c });

          }
        }
      );
    }
  });
}, 5000);
process.on("SIGTERM", () => {
  clearInterval(interval);
});

export const tickerRouter = createTRPCRouter({
  ticker: publicProcedure
    .input(z.object({ ticker: z.string() }))
    .subscription(({ input }) => {
      return observable<{ ticker: string; tickerPrice: number }>((emit) => {
        // const timer = setInterval(() => {
        //   // emits a number every second
        //     finnhubClient.quote(input.ticker, async (error, data, response) => {
        //         if (error) {
        //             console.error('Error getting price', error.status, error.message)
        //             return
        //         }
        //         emit.next({ ticker: input.ticker, tickerPrice: data.c });
        //     })
        //
        // }, 1000);

        return () => {
          // clearInterval(timer);
        };
      });
    }),
  /** please program a subscription that opens a new websocket connection to an external service that emits a number every second.
   * In case there are two people connection to the subscription, the external service should only be connected once. And it should stay open once the first person disconnects.
   */
  subscribeToTicker: publicProcedure
    .input(z.object({ ticker: z.string() }))
    .subscription(async ({ ctx, input }) => {
      return observable<{ ticker: string; tickerPrice: number }>((emit) => {
        addListener(input.ticker);

        const onNewPrice = ({
          ticker,
          tickerPrice,
        }: {
          ticker: string;
          tickerPrice: number;
        }) => {
          emit.next({ ticker, tickerPrice });
        };

        ee.on(input.ticker, onNewPrice);

        return () => {
          ee.off(input.ticker, onNewPrice);
          removeListener(input.ticker);
        };
      });
    }),
});
