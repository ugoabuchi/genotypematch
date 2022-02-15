import React from "react";
import { StatusBar as NetworkBar } from "expo-status-bar";
import { STATUSBAR } from "../constants/constants";
import { StatusBarType } from "../types";
const StatusBar = ({hidden = STATUSBAR }: StatusBarType) => {
    return (
        <NetworkBar style="dark" hidden={hidden} />
    );
}

export default StatusBar;