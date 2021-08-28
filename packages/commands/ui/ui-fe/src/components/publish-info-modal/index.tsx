import React from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { http } from "utils/http";
import { useState } from "react";

export const PublishInfoModal = (props: {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    onFinish: (
        values: Partial<{ prod: number; commit: string; incType: string }>
    ) => void;
}) => {
    console.log("props.openModal", props.openModal);
    const { openModal, setOpenModal, onFinish } = props;
    const { Option } = Select;
    const [showCommit, setShowCommit] = useState(false);
    const [showBump, setShowBump] = useState(false);

    function close() {
        setOpenModal(false);
    }
    const [form] = Form.useForm();

    async function checkIfCommit() {
        const res = await http("api/ui/checkIfCommit");
        console.log("getData res", res);
        const { ifCommit } = res;
        setShowCommit(ifCommit);
    }

    async function checkIfBump() {
        const res = await http("api/ui/checkIfBump");
        console.log("getData res", res);
        const { ifPrompt } = res;
        const { resBranch } = ifPrompt;
        if (!resBranch) {
            setShowBump(true);
        } else {
            setShowBump(false);
        }
    }

    useEffect(() => {
        if (openModal) {
            console.log("被打开了");
            checkIfCommit();
            checkIfBump();
        }
    }, [openModal]);

    return (
        <Drawer
            forceRender={true}
            onClose={close}
            visible={openModal}
            width={"100%"}
        >
            <Container>
                <h1>请输入发布信息</h1>
                <Form
                    form={form}
                    layout={"vertical"}
                    style={{ width: "80rem" }}
                    onFinish={onFinish}
                    initialValues={{
                        prod: 0,
                    }}
                >
                    <Form.Item
                        label={"是否发布正式"}
                        name={"prod"}
                        rules={[
                            { required: true, message: "请选择是否发布正式" },
                        ]}
                    >
                        <Select allowClear>
                            <Option key={1} value={1}>
                                是
                            </Option>
                            <Option key={0} value={0}>
                                否
                            </Option>
                        </Select>
                    </Form.Item>

                    {showCommit ? (
                        <Form.Item
                            label={"commit信息"}
                            name={"commit"}
                            rules={[
                                { required: true, message: "请输入commit信息" },
                            ]}
                        >
                            <Input placeholder={"请输入commit信息"} />
                        </Form.Item>
                    ) : null}

                    {showBump ? (
                        <Form.Item
                            label={"版本bump方式"}
                            name={"incType"}
                            rules={[
                                { required: true, message: "版本bump方式" },
                            ]}
                        >
                            <Select allowClear>
                                <Option key={2} value={"patch"}>
                                    patch小版本升级
                                </Option>
                                <Option key={3} value={"minor"}>
                                    minor中版本升级
                                </Option>
                                <Option key={4} value={"major"}>
                                    major大版本升级
                                </Option>
                            </Select>
                        </Form.Item>
                    ) : null}

                    <Form.Item style={{ textAlign: "right" }}>
                        <Button type={"primary"} htmlType={"submit"}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Container>
        </Drawer>
    );
};

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
