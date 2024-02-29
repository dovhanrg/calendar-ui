/** @jsxImportSource @emotion/react */

import React from "react";
import {css as makeCss} from "@emotion/react";

const css = makeCss({
    minHeight:'170px',
    boxSizing: 'border-box',
    padding: '4px',
    margin: '2px',
    backgroundColor: '#eee9e9',
    borderRadius: '2px',
});
const DummyDay = () => {
    return (
        <div css={css}/>
    );
};

export default DummyDay;
