import React from "react";
import "./App.css";
// import Views from "views/index";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useMount } from "utils";
import initSubscribe from "io/initSubscribe";
import { useDispatch } from "react-redux";

const Views = React.lazy(() => import("views/index"));

function App(): JSX.Element {
    const dispatch = useDispatch();
    useMount(() => {
        initSubscribe(dispatch);
    });
    return (
        <div className="App">
            <ErrorBoundary fallbackRender={FullPageErrorFallback}>
                <React.Suspense fallback={<FullPageLoading />}>
                    <Views></Views>
                </React.Suspense>
            </ErrorBoundary>
        </div>
    );
}

export default App;
