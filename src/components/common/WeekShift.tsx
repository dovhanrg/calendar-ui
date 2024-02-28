import {getWeekShift} from "../../helpers/dates";
import React from "react";


type Props = {
    year: number;
};
const WeekShift = ({year}: Props)=> {
    return (
        <React.Fragment>{new Array(getWeekShift(year)).fill(null).map(() => <div/>)}</React.Fragment>
    );
};

export default WeekShift;
