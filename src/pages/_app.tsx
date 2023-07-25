import {type AppType} from "next/app";
import {api} from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import {Toaster} from "react-hot-toast";

const MyApp: AppType = ({Component, pageProps}) => {
    return (
        <>
            <Head>
                <title> 🚀 Clean Investment Ticker 🚀</title>
                <meta name="description" content="🐥💭"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Component {...pageProps} />
            <Toaster
                position={"bottom-center"}/>
        </>
    );
};

export default api.withTRPC(MyApp);
