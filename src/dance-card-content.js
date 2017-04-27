// Handles generating dance cards from dance data.


/**
 * @arg {Object} fig - data about a figure
 * @return {String} - text to add to a dance card
 */
const makeFigureString = (fig) => {
    // duration and type are handled individually
    let keys = Object.keys(fig).filter(k => !['duration', 'type'].includes(k)),
        details = keys.map(k => fig[k]['label']).join(' '),

        figString = '(' + fig.duration.value + ') ' + fig.type  + ' ' + details + ' ';
    return figString;
};

// Each of these sections corresponds to a line on the dance card.
// (Effectively there are unnamed divisions between the named sections.)
const sections = [
    {name: 'A1', startBeat: 1, endBeat: 8},
    {name: '  ', startBeat: 9, endBeat: 16},
    {name: 'A2', startBeat: 17, endBeat: 24},
    {name: '  ', startBeat: 25, endBeat: 32},
    {name: 'B1', startBeat: 33, endBeat: 40},
    {name: '  ', startBeat: 41, endBeat: 48},
    {name: 'B2', startBeat: 49, endBeat: 56},
    {name: '  ', startBeat: 57, endBeat: 64}
];

/**
 * Create a string by combining sections (A1, A2, ...) with dance figures.
 * @arg {Object[]} sections - array of objects, one for each section
 * @arg {Object[]} figures - array of objects, one for each figure
 * @return {String} - the sections and figures part of the dance card
 */
const makeSectionsFiguresString = (sections, figures) => {
    let result = "";
    let count = 0;
    for (let sec of sections) {
        let secString = '\n' + sec.name + ' ';
        result += secString;

        while (figures[count] && figures[count].startBeat <= sec.endBeat) {
            // TODO: How to handle figures that spill over into next section?
            // Currently they start in the section they start in and there is
            // no indication that they spill over into the start of the next
            // section.  Maybe there should be?
            let fig = figures[count];
            let figString = makeFigureString(fig);
            result += figString;
            count += 1;
        }
    }
    return result;
};

/**
 * Generate a dance card string from dance data.
 * @arg {Object} danceData
 * @return {String}
 */
export const makeDanceCardContent = danceData => {
    let authors = danceData.authors ? ' by ' + danceData.authors : '',
        level = danceData.level.value !== 'Level Unset' ? ', ' + danceData.level.value : '',

        figureString = makeSectionsFiguresString(sections, danceData.figures),
        result = danceData.title +
                authors +
                '\n' + danceData.type.value +
                ', ' + danceData.form.value +
                ', ' + danceData.formation.value +
                ', ' + danceData.progression.value +
                level + '\n' +
                figureString;
    return result;
};
