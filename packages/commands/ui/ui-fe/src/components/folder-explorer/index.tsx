import React, { useEffect } from "react";
import { Button } from "antd";
import styled from "@emotion/styled";
import { CaretUpOutlined } from "@ant-design/icons";
import { ws } from "context/ws-context";
import { useMount } from "utils";
import { useSelector } from "react-redux";
import { selectAddress, selectFolder } from "store/cwd.slice";

export const FolderExplorer = () => {
    const address = useSelector(selectAddress);
    const folder = useSelector(selectFolder);

    useMount(() => {
        getCwd();
    });

    useEffect(() => {
        if (address.length > 0) {
            ws.send("cwd", "getcurrentList");
        }
    }, [address]);

    function getCwd() {
        ws.send("cwd", "getcwd");
    }

    function openParent() {
        // console.log("openParent 发送");
        ws.send("cwd", "openParent");
    }

    function openFolder(
        path: string,
        e: React.MouseEvent<HTMLElement, MouseEvent>
    ) {
        ws.send("cwd", "openFolder", { path });
    }

    return (
        <ExplorerContainer>
            <ToolbarContainer>
                <Button
                    type="primary"
                    shape="circle"
                    onClick={openParent}
                    style={{ margin: "0px 10px" }}
                    icon={<CaretUpOutlined />}
                />
                {address.map((item, index) => {
                    return (
                        <span key={index}>
                            <Button
                                type="dashed"
                                value={item.name}
                                style={{ margin: "0px 5px" }}
                                onClick={(e) => {
                                    openFolder(item.path, e);
                                }}
                            >
                                {item.name}
                            </Button>
                            /
                        </span>
                    );
                })}
            </ToolbarContainer>
            <FoldersContainer>
                {folder.map((folder, index) => {
                    return (
                        <FolderItem
                            key={index}
                            onClick={(e) => {
                                openFolder(folder.path, e);
                            }}
                        >
                            {folder.name}
                        </FolderItem>
                    );
                })}
            </FoldersContainer>
        </ExplorerContainer>
    );
};

const ExplorerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const ToolbarContainer = styled.div`
    flex: auto 0 0;
`;
const FoldersContainer = styled.div`
    flex: 100% 1 1;
    overflow-x: hidden;
    overflow-y: auto;
`;
const FolderItem = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
    cursor: pointer;
    position: relative;
    :hover {
        background: rgb(236, 248, 242);
    }
`;
