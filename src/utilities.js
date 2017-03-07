// utility functions

export var getDefaultsFromArrayOfObjects = (dataObject) => {
    // let result = keys.map(key => figureTypeData[key].filter(obj => obj['default'] || false));
    let result = {};
    Object.keys(dataObject).forEach(key => {
        let itemsArray = dataObject[key];
        console.log('itemsArray', itemsArray);
        let defaultInArray = itemsArray.filter(obj => obj['default']);
        let def = defaultInArray[0];
        result[key] = def;
    });

    console.log('defaults', result);
    return result;
};

var getFigureDefaults = (figureTypeData) => {
    // let result = keys.map(key => figureTypeData[key].filter(obj => obj['default'] || false));
    let result = {};
    Object.keys(figureTypeData).forEach(key => {
        let variations = figureTypeData[key];
        let defaultInArray = variations.filter(obj => obj['default']);
        result[key] = defaultInArray[0];
    });

    console.log('result', result);
    return result;
};
