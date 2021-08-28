import React from "react";
import {
    ScreenContainer,
    FlodConatiner,
    ButtonConatiner,
} from "components/lib";
import { FolderExplorer } from "components/folder-explorer/index";
import { PublishStart } from "components/publish-start/index";

export default function Views(): JSX.Element {
    return (
        <ScreenContainer>
            <FlodConatiner>
                <FolderExplorer></FolderExplorer>
            </FlodConatiner>
            <ButtonConatiner>
                <PublishStart></PublishStart>
            </ButtonConatiner>
        </ScreenContainer>
    );
}
