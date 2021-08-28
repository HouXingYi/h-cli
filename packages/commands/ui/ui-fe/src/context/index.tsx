import React, { ReactNode } from "react";
import { WsProvider } from "context/ws-context";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "store";

export const AppProviders = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    return (
        <Provider store={store}>
            <Router>
                <WsProvider>{children}</WsProvider>
            </Router>
        </Provider>
    );
};
