import { ws } from "context/ws-context";
import { slicePath } from "utils/folderUtils";
import { foldListType, setAddress, setFolder, setCwd } from "store/cwd.slice";
import { setLogs, setLogsModal, setLogsClean } from "store/logs.slice";
import { Dispatch } from "redux";
import { notification } from "antd";
import { Button } from "antd";
import React from "react";

function initSubscribe(dispatch: Dispatch) {
    ws.subscribeIO("cwd", (action, payload) => {
        handleCwdEvent(action, payload, dispatch);
    });
    ws.subscribeIO("init", (action, payload) => {
        handleInitEvent(action, payload, dispatch);
    });
    ws.subscribeIO("publish", (action, payload) => {
        handlePublishEvent(action, payload, dispatch);
    });
}

function handlePublishEvent(
    action: string,
    payload: Record<string, unknown>,
    dispatch: Dispatch
) {
    handleCommandProgress(action, payload, dispatch);
}

function handleInitEvent(
    action: string,
    payload: Record<string, unknown>,
    dispatch: Dispatch
) {
    handleCommandProgress(action, payload, dispatch);
}

function handleCwdEvent(
    action: string,
    payload: Record<string, unknown>,
    dispatch: Dispatch
) {
    function setAdd(data: Record<string, unknown>) {
        const { cwd } = data;
        const list = slicePath(cwd as string);
        dispatch(setAddress(list));
        dispatch(setCwd(cwd));
    }
    function setFold(data: Record<string, unknown>) {
        const { list } = data;
        dispatch(setFolder(list as foldListType[]));
    }
    if (action === "getcwd") {
        setAdd(payload);
    } else if (action === "openParent") {
        setAdd(payload);
    } else if (action === "getcurrentList") {
        setFold(payload);
    } else if (action === "openFolder") {
        setAdd(payload);
    }
}
function handleCommandProgress(
    action: string,
    payload: Record<string, unknown>,
    dispatch: Dispatch
) {
    if (action === "start") {
        const { progress } = payload;
        dispatch(setLogs(progress));
    } else if (action === "startEnd") {
        const key = `open${Date.now()}`;
        const btn = (
            <Button
                type="primary"
                size="small"
                onClick={() => {
                    notification.close(key);
                    dispatch(setLogsModal(false));
                    dispatch(setLogsClean());
                }}
            >
                立即关闭
            </Button>
        );
        notification.open({
            message: "通知",
            description: "命令执行完成 弹窗将在30秒后关闭",
            duration: 30,
            key,
            btn,
            onClose: () => {
                dispatch(setLogsModal(false));
                dispatch(setLogsClean());
            },
        });
    }
}
export default initSubscribe;
