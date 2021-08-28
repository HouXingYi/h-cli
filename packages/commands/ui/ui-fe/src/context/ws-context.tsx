import React, { ReactNode } from "react";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import Ws from "io";

export const ws = new Ws();

export const bootstrapWs = async () => {
    await ws.connectIO();
    return ws;
};

export const WsProvider = ({ children }: { children: ReactNode }) => {
    const { error, isLoading, isIdle, isError, run } = useAsync<Ws | null>();
    useMount(() => {
        console.log("WsProvider");
        run(bootstrapWs());
    });
    if (isIdle || isLoading) {
        return <FullPageLoading />;
    }
    if (isError) {
        return <FullPageErrorFallback error={error} />;
    }
    return <div>{children}</div>;
};
