import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { SWRConfig } from "swr/_internal";

import { lightTheme } from "../themes/light-theme";

import { AuthProvider } from "@/context/auth";
import { CartProvider } from "@/context/cart";
import { UiProvider } from "@/context/ui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  );
}
