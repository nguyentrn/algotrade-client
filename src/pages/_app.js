import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";

import store from "../redux/store";
import theme from "../theme";

const App = ({ Component, pageProps }) => {
  return (
    <SessionProvider
      options={{
        staleTime: 0,
        refetchInterval: 0,
      }}
      session={pageProps.session}
    >
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(App);
