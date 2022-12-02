import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ReactQueryDevtools } from "react-query/devtools";
import { theme } from "theme";
import router from "Router";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    line-height: 1.2;
    background-color: ${(props) => props.theme.bgColor.primary};
    color: ${(props) => props.theme.txtColor.primary};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
