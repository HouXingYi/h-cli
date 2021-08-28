// import { send } from "io";
import React from "react";
import {
    ScreenContainer,
    FlodConatiner,
    ButtonConatiner,
} from "components/lib";
import { FolderExplorer } from "components/folder-explorer/index";
import { InitStart } from "components/init-start/index";

export default function Views(): JSX.Element {
    return (
        <ScreenContainer>
            <FlodConatiner>
                <FolderExplorer></FolderExplorer>
            </FlodConatiner>
            <ButtonConatiner>
                <InitStart></InitStart>
            </ButtonConatiner>
        </ScreenContainer>
    );
}
