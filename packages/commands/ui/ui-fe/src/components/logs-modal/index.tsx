import React from "react";
import { Drawer, Alert, Spin } from "antd";
import styled from "@emotion/styled";
import { selectLogs, selectLogsModal, setLogsModal } from "store/logs.slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const LogsModal = () => {
    const logs = useSelector(selectLogs);
    const logsModal = useSelector(selectLogsModal);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("logs改变了", logs);
    }, [logs]);

    function close() {
        console.log("触发close");
        dispatch(setLogsModal(false));
    }

    return (
        <Drawer
            closable={false}
            forceRender={true}
            onClose={close}
            visible={logsModal}
            width={"100%"}
        >
            <Container>
                <SpinContainer>
                    <Spin tip="命令执行中，请稍等"></Spin>
                </SpinContainer>
                <LogsContainer>
                    {[...logs].reverse().map((el, index) => {
                        return (
                            <Alert
                                key={index}
                                style={{ width: "60rem", marginBottom: "1rem" }}
                                message={el}
                                type="info"
                            />
                        );
                    })}
                </LogsContainer>
            </Container>
        </Drawer>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
`;

const SpinContainer = styled.div`
    flex: 10% 0 0;
    align-self: center;
    display: flex;
    align-items: center;
`;

const LogsContainer = styled.div`
    flex: 70% 0 0;
    overflow: auto;
`;
