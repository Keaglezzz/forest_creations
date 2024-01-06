import React from "react";
import { Toaster } from "react-hot-toast";

import { Layout } from "../components";
import "../styles/globals.css";
import { StateContext } from "../context/StateContext";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
        <Analytics />
        <Script
          src="https://js.yoco.com/sdk/v1/yoco-sdk-web.js"
          strategy="beforeInteractive"
        />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
