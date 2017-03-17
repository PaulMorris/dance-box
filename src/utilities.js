// Utility functions.

// for logging immutable data structures
export const immLog = (...args) => console.log(...args.map(x => {
    return x.toJS ? x.toJS() : x;
}));

/**
 * convert 'string representations of numbers' (like html menu values)
 * to numbers, if possible, or just return the string.
 * @arg {String} val
 * @returns {String|Number}
 */
export const numberify = (val) => {
    let n = Number(val);
    return n ? n : val;
};

export const getDefaultsFromArrayOfObjects = (dataObject) => {
    let result = {};
    Object.keys(dataObject).forEach(key => {
        let itemsArray = dataObject[key];
        let defaultInArray = itemsArray.filter(obj => obj['default']);
        let def = defaultInArray[0];
        result[key] = def;
    });
    return result;
};
