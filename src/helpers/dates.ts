
export function getDaysInMonth(month: number, year: number) { // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
}

export function getArrayOfDays({year, month}: {year: number, month: number}) {
    console.log({year, month});
    return new Array(getDaysInMonth(month, year)).fill(null).map((_, i) => i+1);
}

export function getWeekShift({year, month}: {year: number, month: number}) {
    return new Date(year,month-1, 1).getUTCDay();
}