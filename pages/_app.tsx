import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
// import { apiSlice } from "../redux/api/apiSlice";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        // <ApiProvider api={apiSlice}>
        <Provider store={store}>
            <ToastContainer />
            <Component {...pageProps} />
        </Provider>
        // </ApiProvider>
    );
}

export default MyApp;
