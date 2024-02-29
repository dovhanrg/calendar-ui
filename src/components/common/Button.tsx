/** @jsxImportSource @emotion/react */

import {css as makeCss} from "@emotion/react";
import React from "react";

type Props = {
    onClick: () => void;
    label: string;
}
const Button = ({onClick, label}: Props) => {
    return (
        <button css={makeCss({
            height: '30px',
            color: '#172b4d',
            border: "none",
            boxShadow: "none",
            cursor: "pointer",
            backgroundColor: '#e2e4ea',
            fontWeight: 500,
            borderRadius: '3px',
            '&:hover': {
                backgroundColor: '#091e4224',
            }
        })} onClick={onClick}>{label}</button>
    );
};

export default Button;
