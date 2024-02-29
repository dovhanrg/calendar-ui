import {getWeekShift} from "../../helpers/dates";
import React from "react";


type Props = {
    monthYear: { month: number; year: number };
};
const WeekShift = ({monthYear}: Props) => {
    return (
        <React.Fragment>{new Array(getWeekShift(monthYear)).fill(null).map(() => <div/>)}</React.Fragment>
    );
};

export default WeekShift;
