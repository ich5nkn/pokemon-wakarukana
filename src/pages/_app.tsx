import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BaseLayout } from "@/components/BaseLayout";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ChakraProvider>
  );
}

export default App;
