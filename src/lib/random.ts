export function genArrayByRange(min: number, max: number) {
    // Generate an array of numbers from min to max
    let arr: number[] = [];
    for (let i = min; i <= max; i++) {
        arr.push(i);
    }
    return arr;
}