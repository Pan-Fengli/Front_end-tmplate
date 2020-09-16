import {Space} from "antd";
import React from "react";

const IconText = ({icon, text, clickFunc}) => (
    <Space onClick={clickFunc}>
        {React.createElement(icon)}
        <div data-cy={'iconText'}>{text}</div>
    </Space>
);

export default IconText;
