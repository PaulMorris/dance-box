import React from 'react';
const rel = React.createElement;
import mori from 'mori';
import { getDefaultsFromArrayOfObjects } from './utilities';

const log = (...args) => console.log(...args.map(mori.toJs));

/**
 * convert 'string representations of numbers' (like html menu values)
 * to numbers, if possible, or just return the string.
 * @arg {String} val
 * @returns {String|Number}
 */
var numberify = (val) => {
    let n = Number(val);
    return n ? n : val;
};

/**
 * Button implemented as a div.
 * @arg {Object} props
 * @arg {String} props.text - The string to display in the button.
 */
const Button = (props) => {
    return rel('div', null, props.text);
};

/**
 * @arg {Object} props
 * @arg {String} props.placeholder
 * @arg {String} props.value - May be a 'number as a string'.
 * @arg {String} props.className
 * @arg {Function} props.onChange
 */
const TextField = (props) => rel('input', {
    type: "text",
    placeholder: props.placeholder,
    value: props.value,
    className: props.className,
    onChange: props.onChange
});

/**
 * @arg {Object} props
 * @arg {String} props.value.value
 * @arg {String} props.className
 * @arg {Function} props.handleChange
 * @arg {Object[]} props.options - Array of menu items / options.
 * @arg {String} props.options.value - The value for this item / option.
 * @arg {String} props.options.label - The visible label string.
 */
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
            handleChange: event => {
                props.dispatch({
                    type: 'MODIFY_FIGURE',
                    payload: {
                        type: props.figure.type,
                        figureIndex: props.figureIndex,
                        keyProp: key,
                        value: numberify(event.target.value)
                    }
                })
            }
        });

    const handleDelete = event => props.dispatch({
        type: 'DELETE_FIGURE',
        // TODO: nesting not needed
        payload: {
            figureIndex: props.figureIndex
        }
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
};

const FigureList = (props) => {

    const figToLi = (fig, index) => rel('li', {
                key: fig + index,
                className: 'figure_item_li'
            },
            rel(FigureItem, {
                dispatch: props.dispatch,
                figure: fig,
                typeData: props.figureTypes[fig.type],
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

    const makeFigureButtonClick = (figName, figData, addFigure) => event => {
        // console.log('figureButtonClick', figureTypeData, event);
        let danceFigure = getDefaultsFromArrayOfObjects(figData);
        danceFigure.type = figName;
        return props.dispatch({
            type: 'ADD_FIGURE',
            payload: danceFigure
        });
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
                onClick: makeFigureButtonClick(figName, figData, props.addFigure)
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
                    handleChange: event => {
                        props.dispatch({
                            type: 'SET_DANCE_MENU_PROPERTY',
                            payload: {prop: key, value: numberify(event.target.value)}
                        })
                    }
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
                    className: 'link',
                    onClick: props.dispatch.bind(null, {
                        type: 'EDIT_DANCE',
                        payload: key
                    })
                },
                'Edit'
            ),
            ' ',
            rel('a', {
                    className: 'link',
                    onClick: props.dispatch.bind(null, {
                        type: 'DELETE_DANCE',
                        payload: key
                    })
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
};

const DancesScreen = (props) => rel('div', {
        className: 'app_wrapper'
    },

    // screen title
    rel('h1', null, 'Dances'),

    // new dance button
    rel('input', {
        type: 'button',
        value: 'New Dance',
        className: 'button',
        onClick: props.dispatch.bind(null, {
            type: 'ADD_NEW_DANCE'
        })
    }),

    // dance list
    rel(DanceList, {
        dispatch: props.dispatch,
        dances: props.dances

    })
);

const EditDanceScreen = (props) => rel('div', {
        className: 'app_wrapper'
    },

    // "back to dances list" link
    rel('div', null,
        rel('a', {
                onClick: props.dispatch.bind(null, {
                        type: 'SWITCH_UI_MODE',
                        payload: 'dances'
                    }),
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
            value: props.dances[props.currentDance] ? props.dances[props.currentDance].title : '',
            placeholder: 'Untitled Dance',
            className: 'dance_title_text_field',
            onChange: event => {
                props.dispatch({
                    type: 'SET_DANCE_PROPERTY',
                    payload: {prop: 'title', value: event.target.value}
                })
            }
        }),

        // authors
        ' by ',
        rel(TextField, {
            value: props.dances[props.currentDance] ? props.dances[props.currentDance].authors : '',
            placeholder: 'Author(s)',
            className: 'dance_authors_text_field',
            onChange: event => {
                props.dispatch({
                    type: 'SET_DANCE_PROPERTY',
                    payload: {prop: 'authors', value: event.target.value}
                })
            }
        }),
    ),

    // dance menus
    rel(DanceMenus, {
        dispatch: props.dispatch,
        // TODO: handle initialization better
        currentDanceData: props.dances[props.currentDance] || [],
        danceMenusData: props.danceMenusData
    }),

    rel('h3', null, 'Figures'),

    // figure buttons
    rel(FigureButtons, {
        dispatch: props.dispatch,
        figureTypes: props.figureTypes
    }),

    rel(FigureList, {
        dispatch: props.dispatch,
        figures: props.figures,
        figureTypes: props.figureTypes
    }),
);

export const App = (props) => {
    log("props.state then props", props.state, props);

    const uiState = mori.toJs(mori.get(props.state, 'uiState')),
        dances = mori.toJs(mori.get(props.state, 'dances'));

    if (uiState.mode === 'dances') {
        return rel(DancesScreen, {
            dispatch: props.dispatch,
            dances: dances
        });

    } else if (uiState.mode === 'editDance') {
        return rel(EditDanceScreen, {
            dispatch: props.dispatch,
            dances: dances,
            currentDance: uiState.currentDance,
            figures: dances[uiState.currentDance].figures,
            figureTypes: mori.toJs(mori.get(props.state, 'figureTypes')),
            danceMenusData: mori.toJs(mori.get(props.state, 'danceMenusData'))
        });

    } else {
        return rel('h1', null, 'Oops!  We have a problem...');
    }
};
