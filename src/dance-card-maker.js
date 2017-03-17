
/**
 * Generate a dance card string from dance data
 * @arg cardData
 */
export const makeDanceCard = danceData => {
    // console.log('danceData', danceData);

    let level = danceData.level.value !== 'Level Unset' ? ', ' + danceData.level.value : '';
    let authors = danceData.authors ? ' by ' + danceData.authors : '';

    let figstr = danceData.figures.map(fig => fig.type);
    return danceData.title +
        authors +
        '\n' + danceData.type.value +
        ', ' + danceData.form.value +
        ', ' + danceData.formation.value +
        ', ' + danceData.progression.value +
        level + '\n\n' +
        'A1 ' + figstr.toString();
}
