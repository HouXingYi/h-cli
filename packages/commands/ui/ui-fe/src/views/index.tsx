import React from "react";
import MainPage from "./main";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { Navigate, Route, Routes } from "react-router-dom";
import { resetRoute } from "utils";
import { LogsModal } from "components/logs-modal/index";

export default function Views(): JSX.Element {
    return (
        <Container>
            <PageHeader />
            <Main>
                <Routes>
                    <Route path={"/index/*"} element={<MainPage />} />
                    <Navigate to={"/index"} />
                </Routes>
            </Main>
            <LogsModal></LogsModal>
        </Container>
    );
}

const PageHeader = () => {
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type={"link"} onClick={resetRoute}>
                    h-cli 脚手架 GUI
                </ButtonNoPadding>
            </HeaderLeft>
            <HeaderRight></HeaderRight>
        </Header>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    height: 100vh;
`;
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
    display: flex;
    overflow: hidden;
`;
