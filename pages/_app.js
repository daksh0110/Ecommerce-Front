import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "./components/CartContext";
import { SessionProvider } from "next-auth/react";
import GlobalStyles from "../styles/globalStyles";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
