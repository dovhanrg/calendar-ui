
export function getDaysInMonth(month: number, year: number) { // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
}

export function getArrayOfDays(year: number) {
    const arr = [];
    for (let month = 1; month <= 12; month++) {
        arr.push(new Array(getDaysInMonth(month, year)).fill(null).map((_, i) => i+1));
    }
    return arr.flat();
}

export function getWeekShift(fullYear: number) {
    return new Date(fullYear,0, 0).getDay();
}