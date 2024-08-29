"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { StoreProvider } from "./StoreProvider";
import PropTypes from 'prop-types';
import { usePathname } from "next/navigation";
import { checkPublicRoute } from "@/function/checkRoutes";
import PrivateRouter from "@/components/privateRoute";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isPublicPage = checkPublicRoute(pathname);


  return (
    <html lang="PT-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href={inter.href}
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          {isPublicPage && children}
          {!isPublicPage &&
            <PrivateRouter>
              {children}
            </PrivateRouter>
          }
        </StoreProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
