import { type AppType } from "next/app";
import { api } from "../utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { DevSupport } from "@react-buddy/ide-toolbox-next";
import { ComponentPreviews, useInitial } from "../dev";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title> 🚀 Clean Investment Ticker 🚀</title>
        <meta name="description" content="🐥💭" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DevSupport
        ComponentPreviews={ComponentPreviews}
        useInitialHook={useInitial}
      >
        <Component {...pageProps} />
      </DevSupport>
      <Toaster position={"bottom-center"} />
    </>
  );
};

export default api.withTRPC(MyApp);
