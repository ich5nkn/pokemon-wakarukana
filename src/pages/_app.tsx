import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BaseLayout } from "@/components/BaseLayout";
import { GlobalContextProvider, useGlobalState } from "@/hooks/useGlobalState";
import { loadLocalStorage } from "@/utils/localStorage";
import { useEffect } from "react";

function App({ Component, pageProps }: AppProps) {
  const { globalStateDispatch } = useGlobalState();
  useEffect(() => {
    const value = loadLocalStorage();
    if (!value) return;
    globalStateDispatch({ type: "loadLocalStorage", value });
  }, [globalStateDispatch]);

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
