import React from "react";
import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import _ from "lodash";

import { ws } from "context/ws-context";
import { PublishInfoModal } from "components/publish-info-modal/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogsModal } from "store/logs.slice";

export const PublishStart = () => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    function startPublish(
        values: Partial<{ prod: number; commit: string; incType: string }>
    ) {
        setOpenModal(false);
        dispatch(setLogsModal(true));
        ws.send("publish", "start", { publishinfo: values });
    }

    function open() {
        setOpenModal(true);
    }

    const onFinish = (
        values: Partial<{ prod: number; commit: string; incType: string }>
    ) => {
        console.log("开始发布参数", values);
        const { prod, commit, incType } = values;
        const info = _.omitBy(
            {
                prod,
                commit,
                incType,
            },
            _.isUndefined
        );

        console.log("info", info);

        // inlinepreset参数模板
        // const publishInfo = {
        //     prod: false, // 是否正式发布
        //     commit: "ci: 测试inlinepreset",
        //     incType: "patch",
        // };

        startPublish(info);
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
                开始发布
            </Button>
            <PublishInfoModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                onFinish={onFinish}
            ></PublishInfoModal>
        </div>
    );
};
