/** @jsxImportSource @emotion/react */

import React from "react";
import {css as makeCss} from "@emotion/react";

const css = makeCss`
            width: 100%;
            border: 1px solid;
            border-color: #f0f;
            min-height: 170px;
            `;
const DummyDay = () => {
    return (
        <div css={css}/>
    );
};

export default DummyDay;
