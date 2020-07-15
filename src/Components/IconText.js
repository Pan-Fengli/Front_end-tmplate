import {Space} from "antd";
import React from "react";

const IconText = ({icon, text, clickFunc}) => (
    <Space onClick={clickFunc}>
        {React.createElement(icon)}
        {text}
    </Space>
);

export default IconText;
