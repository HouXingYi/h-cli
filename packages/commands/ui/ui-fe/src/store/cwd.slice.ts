import { createSlice } from "@reduxjs/toolkit";
// import { bootstrapWs } from "context/ws-context";
// import { AppDispatch } from "store/index";
import { RootState } from "store/index";

export interface foldListType {
    name: string;
    path: string;
}

interface State {
    addressArr: foldListType[];
    folderList: foldListType[];
    cwd: string;
}

const initialState: State = {
    addressArr: [],
    folderList: [],
    cwd: "",
};

export const cwdSlice = createSlice({
    name: "cwd",
    initialState,
    reducers: {
        setCwd(state, action) {
            state.cwd = action.payload;
        },
        setAddress(state, action) {
            state.addressArr = action.payload;
        },
        setFolder(state, action) {
            state.folderList = action.payload;
        },
    },
});

export const { setAddress, setFolder, setCwd } = cwdSlice.actions;

export const selectAddress = (state: RootState) => state.cwd.addressArr;
export const selectFolder = (state: RootState) => state.cwd.folderList;
export const selectCwd = (state: RootState) => state.cwd.cwd;
