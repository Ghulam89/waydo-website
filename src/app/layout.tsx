'use client'

import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';


import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import classNames from 'classnames';
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { store } from "../redux/store";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/assets/img/favicon.ico" />
      <body className={classNames(inter.className, "App")} style={{ minHeight: "100vh", overflow: "hidden", overflowY: "auto" }}>
        <PayPalScriptProvider options={{
          "clientId": "test",
        }}>
          <Provider store={store}>
            {children}
          </Provider>
          <ToastContainer />
        </PayPalScriptProvider>
      </body>
    </html>
  );
}
