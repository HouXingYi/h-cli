import React from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import styled from "@emotion/styled";
import { selectCwd } from "store/cwd.slice";
import { useSelector } from "react-redux";
import semver from "semver";

const getProjectTemplate = require("@h-cli/template-list");
export const ProjectInfoModal = (props: {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    onFinish: (values: unknown) => void;
}) => {
    console.log("props.openModal", props.openModal);
    const cwd = useSelector(selectCwd);
    const { openModal, setOpenModal, onFinish } = props;
    const tempList = getProjectTemplate();
    const { Option } = Select;

    function close() {
        setOpenModal(false);
    }
    const [form] = Form.useForm();

    async function validator(rule: unknown, value: string) {
        console.log("value", value);
        const res = semver.valid(value);
        if (res) {
            return true;
        } else {
            throw new Error("请输入合法的版本号");
        }
    }

    return (
        <Drawer
            forceRender={true}
            onClose={close}
            visible={openModal}
            width={"100%"}
        >
            <Container>
                <h1>请输入项目信息</h1>
                <Form
                    form={form}
                    layout={"vertical"}
                    style={{ width: "80rem" }}
                    onFinish={onFinish}
                    initialValues={{
                        projectPath: "",
                        projectName: "",
                        projectVersion: "1.0.0",
                        projectTemplate: "",
                    }}
                >
                    <Form.Item
                        label={"项目地址"}
                        name={"projectPath"}
                        rules={[{ required: true, message: "请输入项目地址" }]}
                    >
                        <Input
                            addonBefore={`${cwd}\\`}
                            placeholder={"请输入项目地址"}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"项目名称"}
                        name={"projectName"}
                        rules={[{ required: true, message: "请输入项目名称" }]}
                    >
                        <Input placeholder={"请输入项目名称"} />
                    </Form.Item>

                    <Form.Item
                        label={"模板名称"}
                        name={"projectTemplate"}
                        rules={[{ required: true, message: "请选择模板名称" }]}
                    >
                        <Select allowClear>
                            {tempList.map(
                                (el: { npmName: string; name: string }) => {
                                    return (
                                        <Option
                                            key={el.npmName}
                                            value={el.npmName}
                                        >
                                            {el.name}
                                        </Option>
                                    );
                                }
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={"版本"}
                        name={"projectVersion"}
                        rules={[
                            { required: true, message: "请输入合法的版本号" },
                            {
                                validator: validator,
                                message: "请输入合法的版本号",
                            },
                        ]}
                    >
                        <Input placeholder={"请输入合法的版本号"} />
                    </Form.Item>

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
