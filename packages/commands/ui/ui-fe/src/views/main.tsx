import React from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes, useLocation } from "react-router";
import styled from "@emotion/styled";
import { Menu } from "antd";
import Init from "./init";
import Publish from "./publish";

const useRouteType = () => {
    const units = useLocation().pathname.split("/");
    return units[units.length - 1];
};

export default function MainPage(): JSX.Element {
    const routeType = useRouteType();
    return (
        <Container>
            <Aside>
                <Menu mode={"inline"} selectedKeys={[routeType]}>
                    <Menu.Item key={"init"}>
                        <Link to={"init"}>项目创建</Link>
                    </Menu.Item>
                    <Menu.Item key={"publish"}>
                        <Link to={"publish"}>项目发布</Link>
                    </Menu.Item>
                </Menu>
            </Aside>
            <Main>
                <Routes>
                    <Route path={`/init`} element={<Init />} />
                    <Route path={`/publish`} element={<Publish />} />
                    <Navigate
                        to={window.location.pathname + "/init"}
                        replace={true}
                    />
                </Routes>
            </Main>
        </Container>
    );
}

const Aside = styled.aside`
    background-color: rgb(244, 245, 247);
    display: flex;
`;

const Main = styled.div`
    box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
    display: flex;
    overflow: hidden;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
    width: 100%;
`;
