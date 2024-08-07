"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { Provider } from "react-redux";
import store from '@/store';
import PropTypes from 'prop-types';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="PT-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link rel="icon" href={metadata.icon} /> */}
        {/* <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} /> */}
        <link
          rel="stylesheet"
          href={inter.href}
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          { children }
        </Provider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
