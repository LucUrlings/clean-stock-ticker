import { api } from "~/utils/api";
import { useState } from "react";

type TickerProps = {
  ticker: string;
  removeTicker: (ticker: string) => void;
};

export const Ticker = ({ ticker, removeTicker }: TickerProps) => {
  const [tickerValue, setTickerValue] = useState<number>(0);

  api.ticker.ticker.useSubscription(undefined, {
    onData(n) {
      setTickerValue(n);
    },
  });

  return (
    <>
      <div className="flex p-16">
        <div className="flex-grow">{ticker}</div>
        <div
          className="flex-shrink-0 flex-grow-0"
          onClick={() => removeTicker(ticker)}
        >
          {tickerValue}
        </div>
      <p>aaa</p>
      </div>
    </>
  );
};