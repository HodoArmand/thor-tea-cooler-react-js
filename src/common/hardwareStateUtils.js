export const formatFloat = (stringValue) => {
    let parsedValue = parseFloat(stringValue);
    return parsedValue.toFixed(2);
};