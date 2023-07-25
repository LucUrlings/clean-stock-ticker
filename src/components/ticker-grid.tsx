import { useEffect, useState } from "react";

type TickerGridProps = {
  tickers: string[];
  addTicker: (ticker: string) => void;
};
export const TickerGrid = ({ tickers, addTicker }: TickerGridProps) => {
  return (
    <div className="grid-rows-0 grid h-full grid-cols-2 gap-4">
      {tickers.map((ticker) => {
        return <div className="flex flex-col">{ticker}</div>;
      })}

      <AddTickerComponent addTicker={addTicker} />
    </div>
  );
};

type AddTickerComponentProps = {
  addTicker: (ticker: string) => void;
};
const AddTickerComponent = ({ addTicker }: AddTickerComponentProps) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col">
      <input
        placeholder="Type a Ticker"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
