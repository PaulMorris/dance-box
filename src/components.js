import React from 'react';
const rel = React.createElement;
import mori from 'mori';
import { getDefaultsFromArrayOfObjects } from './utilities';

const log = (...args) => console.log(...args.map(mori.toJs));

// convert 'string representations of numbers' (like html menu values)
// to numbers, if possible, or just return the string.
var numberify = (val) => {
    let n = Number(val);
    return n ? n : val;
};

const Button = (props) => {
    return rel('div', null, props.text);
};

const TextField = (props) => rel('input', {
    type: "text",
    placeholder: props.placeholder,
    value: props.value,
    className: props.className,
    onChange: props.onChange
});

const Menu = (props) => {
    let toOption = item => rel('option', {
            value: item.value
        },
        item.label
    );
    return rel('select', {
            className: props.className,
            // note: 'value.value' is not a typo
            value: props.value.value,
            onChange: props.handleChange
        },
        ...props.options.map(toOption)
    );
};

const FigureItem = (props) => {
    const arraysOnly = key => Array.isArray(props.typeData[key]);

    const toMenu = key => rel(Menu, {
            options: props.typeData[key],
            value: props.figure[key],
            className: "figure_item_select",
            handleChange: event => props.modifyFigure({
                type: props.figure.type,
                figureIndex: props.figureIndex,
                keyProp: key,
                value: numberify(event.target.value)
            })
        });

    const handleDelete = event => props.deleteFigure({
        figureIndex: props.figureIndex
    });

    const menus = Object.keys(props.typeData).filter(arraysOnly).map(toMenu);

    // console.log('figureItem', menus, danceFigure, props.typeData);

    return rel('div', null,
        props.figure.type + '  ',
        ...menus,
        rel('span', {
                className: 'figure_item_right'
            },
            rel('span', {
                    className: 'start_end_beats'
                },
                props.figure.startBeat, ' - ', props.figure.endBeat, ' '
            ),
            rel('input', {
                    type: 'button',
                    onClick: handleDelete,
                    className: "delete_figure_button",
                    value: 'X'
                }
            )
        )
    );
}

const FigureList = (props) => {

    const figToLi = (fig, index) => rel('li', {
                key: fig + index,
                className: 'figure_item_li'
            },
            rel(FigureItem, {
                figure: fig,
                typeData: props.figureTypes[fig.type],
                modifyFigure: props.modifyFigure,
                deleteFigure: props.deleteFigure,
                figureIndex: index
            })
        );

    return rel('ul', {
            className: 'figure_list'
        },
        ...props.figures.map(figToLi)
    );
};

const FigureButtons = (props) => {

    const figureButtonClick = (figName, figData, addFigure) => event => {
        // console.log('figureButtonClick', figureTypeData, event);
        let danceFigure = getDefaultsFromArrayOfObjects(figData);
        danceFigure.type = figName;
        return addFigure(danceFigure);
    };

    const figNameToLi = (figName) => {
        let figData = props.figureTypes[figName];
        return rel('li', {
                key: figName,
                className: 'figure_button_li'
            },
            rel('input', {
                type: 'button',
                value: figName,
                className: 'button',
                onClick: figureButtonClick(figName, figData, props.addFigure)
            })
        );
    };

    const figItems = Object.keys(props.figureTypes).map(figNameToLi);

    return rel('ul', {
            className: 'figure_button_list'
        },
        ...figItems
    );
};

const DanceMenus = (props) => {
    const arraysOnly = key => Array.isArray(props.danceMenusData[key]);

    const toMenu = key => rel(Menu, {
                    options: props.danceMenusData[key],
                    // TODO: handle initialization better
                    value: props.currentDanceData[key] || '',
                    className: "dance_data_menu",
                    handleChange: event => props.setDanceMenuProperty(key, numberify(event.target.value))
                });

    const menus = Object.keys(props.danceMenusData).filter(arraysOnly).map(toMenu);

    // log('currentDanceData', props.currentDanceData);
    // console.log('figureItem', menus, danceFigure, typeData);

    return rel('div', {
            className: 'dance_menus'
        },
        ...menus
    );
};

const DanceList = (props) => {

    const danceItems = Object.keys(props.dances).map((key, index) => {
        return rel('li', {
                className: 'dance_list_item'
            },
            props.dances[key].title,
            ' by ',
            props.dances[key].authors,
            ' ',
            rel('a', {
                    onClick: props.editDance.bind(null, key),
                    className: 'link'
                },
                'Edit'
            ),
            ' ',
            rel('a', {
                    onClick: props.deleteDance.bind(null, key),
                    className: 'link'
                },
                'Delete'
            ),
        );
    });

    return rel('ul', {
            className: 'dance_list'
        },
        ...danceItems
    );
}

export const App = (props) => {
    log("props.state then props", props.state, props);

    const uiState = mori.toJs(mori.get(props.state, 'uiState')),
        currentDance = mori.getIn(props.state, ['uiState', 'currentDance']),
        dances = mori.toJs(mori.get(props.state, 'dances')),
        // TODO: handle initialization better
        figures = mori.toJs(mori.getIn(props.state, ['dances', currentDance, 'figures'])) || [],
        figureTypes = mori.toJs(mori.get(props.state, 'figureTypes')),
        danceMenusData = mori.toJs(mori.get(props.state, 'danceMenusData'));

    if (uiState.mode === 'dances') {
        return rel('div', {
                className: 'app_wrapper'
            },

            // screen title
            rel('h1', null, 'Dances'),

            // new dance button
            rel('input', {
                type: 'button',
                value: 'New Dance',
                className: 'button',
                onClick: props.addNewDance
            }),

            // dance list
            rel(DanceList, {
                dances: dances,
                editDance: props.editDance,
                deleteDance: props.deleteDance
            })
        );

    } else if (uiState.mode === 'editDance') {
        return rel('div', {
                className: 'app_wrapper'
            },

            // back to dances list

            rel('div', null,
                rel('a', {
                        onClick: props.switchUiMode.bind(null, 'dances'),
                        className: 'link'
                    },
                    '<< Back to Dances List'
                ),
            ),

            rel('h1', null, 'Edit Dance'),

            // dance title and authors
            rel('div', {
                    className: 'dance_title_author'
                },
                rel(TextField, {
                    value: dances[currentDance] ? dances[currentDance].title : '',
                    placeholder: 'Untitled Dance',
                    className: 'dance_title_text_field',
                    onChange: (event) => props.setDanceProperty('title', event.target.value)
                }),

                // authors
                ' by ',
                rel(TextField, {
                    value: dances[currentDance] ? dances[currentDance].authors : '',
                    placeholder: 'Author(s)',
                    className: 'dance_authors_text_field',
                    onChange: (event) => props.setDanceProperty('authors', event.target.value)
                }),
            ),

            // dance menus
            rel(DanceMenus, {
                setDanceMenuProperty: props.setDanceMenuProperty,
                // TODO: handle initialization better
                currentDanceData: dances[currentDance] || [],
                danceMenusData: danceMenusData
            }),

            rel('h3', null, 'Figures'),

            // figure buttons
            rel(FigureButtons, {
                figureTypes: figureTypes,
                addFigure: props.addFigure
            }),

            rel(FigureList, {
                figures: figures,
                figureTypes: figureTypes,
                modifyFigure: props.modifyFigure,
                deleteFigure: props.deleteFigure
            }),
        );

    } else {
        return rel('h1', 'Oops!');
    }
};
