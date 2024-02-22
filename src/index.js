import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//Rainbowkit Imports
import "@rainbow-me/rainbowkit/styles.css";
import './polyfills';

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora, polygonMumbai } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

//RainbowKit Config
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "7d0e6dd5d018a6b5528a9d2890282e36",
  chains: [mainnet, polygon, optimism, arbitrum, base, zora, polygonMumbai],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
