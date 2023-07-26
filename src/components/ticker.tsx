type TickerProps = {
  ticker: string;
  removeTicker: (ticker: string) => void;
};

export const Ticker = ({ ticker, removeTicker }: TickerProps) => {
  return (
    <div className="flex p-16">
      <div className="flex-grow">{ticker}</div>
      <div
        className="flex-shrink-0 flex-grow-0"
        onClick={() => removeTicker(ticker)}
      >
        X
      </div>
    </div>
  );
};
