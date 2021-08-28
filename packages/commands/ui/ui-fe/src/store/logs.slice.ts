import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/index";

interface State {
    logs: string[];
    logsModal: boolean;
}

const initialState: State = {
    logs: [],
    logsModal: false,
};

export const logsSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {
        setLogs(state, action) {
            state.logs.push(action.payload);
        },
        setLogsModal(state, action) {
            state.logsModal = action.payload;
        },
        setLogsClean(state) {
            state.logs = [];
        },
    },
});

export const { setLogs, setLogsModal, setLogsClean } = logsSlice.actions;

export const selectLogs = (state: RootState) => state.logs.logs;
export const selectLogsModal = (state: RootState) => state.logs.logsModal;
