import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BaseLayout } from "@/components/BaseLayout";
import { GlobalContextProvider } from "@/hooks/useGlobalState";

function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <ChakraProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ChakraProvider>
    </GlobalContextProvider>
  );
}

export default App;
