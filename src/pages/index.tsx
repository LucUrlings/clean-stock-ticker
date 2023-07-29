import { PageLayout } from "~/components/layout";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TickerGrid } from "~/components/ticker-grid";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [tickers, setTickers] = useState<string[]>([]);

  const addTicker = (ticker: string) => {
    if (tickers.length > 0) {
      Cookies.set("tickers", tickers + "," + ticker);
      setTickers([...tickers, ticker]);
    } else {
      Cookies.set("tickers", ticker);
      setTickers([ticker]);
    }
  };

  const loadTickers = () => {
    const initCookies: string[] | undefined =
      Cookies.get("tickers")?.split(",");
    setTickers(initCookies ?? []);
  };

  const clearTickers = () => {
    Cookies.remove("tickers");
    setTickers([]);
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    loadTickers();
    console.log("useEffect called");
  }, []);

  const removeTicker = (ticker: string) => {
    if (tickers) {
      const newTickers = tickers.filter((t) => t !== ticker);
      Cookies.set("tickers", newTickers.join(","));
      setTickers(newTickers);
    }
  };

  return (
    <>
      <PageLayout>
        <div className="border-b border-slate-400 p-4">
          <button
            type="button"
            className="rounded-full border-2 border-slate-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-slate-100 hover:text-black"
            onClick={loadTickers}
          >
            Load Tickers
          </button>
          <button
            type="button"
            className="rounded-full border-2 border-slate-500 bg-transparent px-4 py-2 font-semibold text-white hover:border-transparent hover:bg-slate-100 hover:text-black"
            onClick={clearTickers}
          >
            Clear Tickers
          </button>
        </div>
        <TickerGrid
          tickers={tickers}
          addTicker={addTicker}
          removeTicker={removeTicker}
        />
      </PageLayout>
    </>
  );
}
