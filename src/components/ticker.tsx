import { trpc } from "~/utils/api";
import { useState } from "react";

type TickerProps = {
  ticker: string;
  removeTicker: (ticker: string) => void;
};

export const Ticker = ({ ticker, removeTicker }: TickerProps) => {
  const [tickerValue, setTickerValue] = useState<number>(0);

  trpc.ticker.subscribeToTicker.useSubscription(
    { ticker },
    {
      onData(n) {
        setTickerValue(n.tickerPrice);
      },
    }
  );

  return (
    <>
      <div className="flex p-16">
        <div className="flex-grow">{ticker}</div>
          {tickerValue}
        <div
          className="flex-shrink-0 flex-grow-0"
          onClick={() => removeTicker(ticker)}
        >
          X
        </div>
      </div>
    </>
  );
};
