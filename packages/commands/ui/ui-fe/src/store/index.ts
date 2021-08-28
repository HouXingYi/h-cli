import { configureStore } from "@reduxjs/toolkit";
import { cwdSlice } from "store/cwd.slice";
import { logsSlice } from "store/logs.slice";

export const rootReducer = {
    cwd: cwdSlice.reducer,
    logs: logsSlice.reducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
