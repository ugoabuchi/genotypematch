import React from "react";
import { StatusBar as Networkbarr } from "react-native";
import { STATUSBAR } from "../constants/constants";
import { StatusBarType } from "../types";
const StatusBar = ({ theme, hidden = STATUSBAR }: StatusBarType) => {
    const Theme = theme;
    return (
        <Networkbarr backgroundColor={Theme.GenralComponentColors.PRIMARY} hidden={hidden} />
    );
}

export default StatusBar;