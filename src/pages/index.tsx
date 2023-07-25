import Head from "next/head";
import {PageLayout} from "~/components/layout";
import {useState} from "react";
import Cookies from 'js-cookie'
import {TickerGrid} from "~/components/ticker-grid";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
    const initCookies: string[] | undefined = Cookies.get('tickers')?.split(',')

    const [tickers, setTickers] = useState<string[]>(initCookies ? initCookies : [])

    const addTicker = (ticker: string) => {
        if (tickers) {
            Cookies.set('tickers', tickers + ',' + ticker)
            setTickers([...tickers, ticker])
        } else {
            Cookies.set('tickers', ticker)
            setTickers([ticker])
        }
    }

    const clearTickers = () => {
        Cookies.remove('tickers')
        setTickers([])
    }


  return (
    <>
      <PageLayout>
        <div className="h-full w-full">
            <div className="flex border-b border-slate-400 p-4">
                <button type="button" className="bg-transparent hover:bg-slate-100 text-white hover:text-black font-semibold py-2 px-4 border border-slate-500 hover:border-transparent rounded-full" onClick={clearTickers}>
                    Clear Tickers
                </button>
            </div>
            <TickerGrid tickers={tickers} addTicker={addTicker}/>
        </div>
      </PageLayout>
    </>
  );
}
