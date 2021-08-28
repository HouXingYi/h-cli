import React from "react";
import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { ws } from "context/ws-context";
import { ProjectInfoModal } from "components/project-info-modal/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogsModal } from "store/logs.slice";

export const InitStart = () => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    function startInit(values: unknown) {
        console.log("startInit");
        console.log("表单最后获取的值", values);
        setOpenModal(false);
        dispatch(setLogsModal(true));
        ws.send("init", "start", { projectinfo: values });
    }

    function open() {
        setOpenModal(true);
    }

    const onFinish = (values: unknown) => {
        console.log("values", values);
        setOpenModal(false);
        startInit(values);
    };

    return (
        <div>
            <Button
                type="primary"
                icon={<PlayCircleOutlined />}
                size="large"
                style={{ width: "200px" }}
                onClick={open}
            >
                开始创建
            </Button>
            <ProjectInfoModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                onFinish={onFinish}
            ></ProjectInfoModal>
        </div>
    );
};
