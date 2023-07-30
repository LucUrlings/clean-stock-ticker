import { useState } from "react";
import { Ticker } from "./ticker";

type TickerGridProps = {
  tickers: string[];
  addTicker: (ticker: string) => void;
  removeTicker: (ticker: string) => void;
};
export const TickerGrid = ({
  tickers,
  addTicker,
  removeTicker,
}: TickerGridProps) => {
  return (
    <div className="grid-rows-0 grid h-full grid-cols-2 gap-4">
      {tickers.map((ticker, index) => {
        return (
          <div key={`Ticker-${ticker}-${index}`} className="h-1/2">
            <Ticker ticker={ticker} removeTicker={removeTicker} />
          </div>
        );
      })}

      <AddTicker addTicker={addTicker} />
    </div>
  );
};

type AddTickerComponentProps = {
  addTicker: (ticker: string) => void;
};
const AddTicker = ({ addTicker }: AddTickerComponentProps) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex p-16">
      <input
        placeholder="Type a Ticker"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value.replace(" ", ""))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              addTicker(input);
              setInput("");
            }
          }
        }}
      />
    </div>
  );
};
