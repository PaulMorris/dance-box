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

export function Button(props) {
    // console.log(props);
    // const { mb } = props;
    return rel('div', null, props.text);
};

const TextField = (props) => rel('input', {
    type: "text",
    placeholder: props.placeholder,
    value: props.value,
    className: props.className,
    onChange: props.onChange
});

/*
var Dropdown = React.createClass({
    handleChange: function(event) {
        this.props.onInput(this.props.keyprop, event.target.value);
    },
    render: function() {
        return React.DOM.select({
            value: this.props.value,
            onChange: this.handleChange
        }, this.props.options.map((option, index) => {
            return React.DOM.option({
                // could use option[0] here instead of index...
                key: this.props.keyprop + "Option" + index,
                onChange: this.handleChange,
                value: option[0],
                disabled: this.props.disabled || false
            }, option[1]);
        }));
    }
});
*/

/*
React.createElement(Dropdown, {
    keyprop: "repeat",
    value: this.state.repeat,
    options: this.props.repeatList,
    onInput: this.handleSimpleChange
}),
*/

export function Menu(props) {
    // console.log('menu', props);
    const { options, value, className, handleChange } = props;
    let toOption = item => rel('option', {
            value: item.value
        },
        item.label
    );
    return rel('select', {
            className: className,
            value: value.value,
            onChange: handleChange
            // name: ""
        },
        ...options.map(toOption)
    );
};

export function FigureItem(props) {
    const { figure, typeData, modifyFigure, figureIndex, deleteFigure } = props,

        arraysOnly = key => Array.isArray(typeData[key]),

        toMenu = key => {
            // let val = danceFigure[key].value;
            return rel(Menu, {
                options: typeData[key],
                value: figure[key],
                className: "figure_item_select",
                handleChange: event => modifyFigure({
                    type: figure.type,
                    figureIndex: figureIndex,
                    keyProp: key,
                    value: numberify(event.target.value)
                })
            });
        },

        handleDelete = event => deleteFigure({
            figureIndex: figureIndex
        }),

        menus = Object.keys(typeData).filter(arraysOnly).map(toMenu);

    // console.log('figureItem', menus, danceFigure, typeData);

    return rel('div', null,
        figure.type + '  ',
        ...menus,
        rel('span', {
                className: 'figure_item_right'
            },
            rel('span', {
                    className: 'start_end_beats'
                },
                figure.startBeat, ' - ', figure.endBeat, ' '
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

export function FigureList(props) {
    const { figures, figureTypes, modifyFigure, deleteFigure } = props;

    return rel('ul', {
        className: 'figure_list'
    },
    ...figures.map((fig, index) => {
        let typeData = figureTypes[fig.type];
        // console.log('figureTypes2', figureTypes);
        // console.log('typeData', type, typeData);

        return rel('li', {
                key: fig + index,
                className: 'figure_item_li'
            },
            rel(FigureItem, {
                figure: fig,
                typeData: typeData,
                modifyFigure: modifyFigure,
                deleteFigure: deleteFigure,
                figureIndex: index
            })
        );
    }));
};

export function FigureButtons(props) {
    const { figureTypes, addFigure } = props;

    const figureButtonClick = (figName, figData, addFigure) => event => {
        // console.log('figureButtonClick', figureTypeData, event);
        let danceFigure = getDefaultsFromArrayOfObjects(figData);
        danceFigure.type = figName;
        return addFigure(danceFigure);
    };

    return rel('ul', {
            className: 'figure_button_list'
        },
        ...Object.keys(figureTypes).map(figName => {
            let figData = figureTypes[figName];
            // add the type to the data itself
            return rel('li', {
                    key: figName,
                    className: 'figure_button_li'
                },
                rel('input', {
                    type: 'button',
                    value: figName,
                    className: 'button',
                    onClick: figureButtonClick(figName, figData, addFigure)
                })
            );
        })
    );
};

export function DanceMenus(props) {
    const { setDanceMenuProperty, currentDanceData, danceMenusData } = props,

        arraysOnly = key => Array.isArray(danceMenusData[key]),

        toMenu = key => {
            return rel(Menu, {
                    options: danceMenusData[key],
                    // TODO: handle initialization better
                    value: currentDanceData[key] || '',
                    className: "dance_data_menu",
                    handleChange: event => setDanceMenuProperty(key, numberify(event.target.value))
                }
            );
        },

        menus = Object.keys(danceMenusData).filter(arraysOnly).map(toMenu);

        log('currentDanceData', currentDanceData);
    // console.log('figureItem', menus, danceFigure, typeData);

    return rel('div', {
        className: 'dance_menus'
    }, ...menus);
};

export function DanceList(props) {
    const { dances, editDance } = props;
    return rel('ul', {
        className: 'dance_list'
    },
    ...Object.keys(dances).map((key, index) => {
        return rel('li', {
                className: 'dance_list_item'
            },
            dances[key].title,
            ' by ',
            dances[key].authors,
            ' ',
            rel('a', {
                    onClick: editDance.bind(null, key),
                    className: 'link'
                },
                'Edit'
            )
        );
    }));
}

export function App(props) {
    log("PROPS appState", props.appState, props);
    const {
        appState,
        addFigure,
        modifyFigure,
        deleteFigure,
        addNewDance,
        setDanceProperty,
        setDanceMenuProperty,
        editDance,
        switchUiMode
    } = props;

    const uiState = mori.toJs(mori.get(appState, 'uiState')),
        currentDance = mori.getIn(appState, ['uiState', 'currentDance']),
        dances = mori.toJs(mori.get(appState, 'dances')),
        // TODO: handle initialization better
        figures = mori.toJs(mori.getIn(appState, ['dances', currentDance, 'figures'])) || [],
        figureTypes = mori.toJs(mori.get(appState, 'figureTypes')),
        danceMenusData = mori.toJs(mori.get(appState, 'danceMenusData'));

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
                onClick: addNewDance
            }),

            // dance list
            rel(DanceList, {
                dances: dances,
                editDance: editDance
            })
        );

    } else if (uiState.mode === 'editDance') {
        return rel('div', {
                className: 'app_wrapper'
            },

            // back to dances list

            rel('div', null,
                rel('a', {
                        onClick: switchUiMode.bind(null, 'dances'),
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
                    onChange: (event) => setDanceProperty('title', event.target.value)
                }),

                // authors
                ' by ',
                rel(TextField, {
                    value: dances[currentDance] ? dances[currentDance].authors : '',
                    placeholder: 'Authors',
                    className: 'dance_authors_text_field',
                    onChange: (event) => setDanceProperty('authors', event.target.value)
                }),
            ),

            // dance menus
            rel(DanceMenus, {
                setDanceMenuProperty: setDanceMenuProperty,
                // TODO: handle initialization better
                currentDanceData: dances[currentDance] || [],
                danceMenusData: danceMenusData
            }),

            rel('h3', null, 'Figures'),

            // figure buttons
            rel(FigureButtons, {
                figureTypes: figureTypes,
                addFigure: addFigure
            }),

            rel(FigureList, {
                figures: figures,
                figureTypes: figureTypes,
                modifyFigure: modifyFigure,
                deleteFigure: deleteFigure
            }),
        );

    } else {
        return rel('h1', 'Oops!');
    }
};

/*
  const danceTitleOld = rel('input', {
        type: 'text',
        id: 'dance-title',
        className: 'title_field',
        placeholder: 'Dance Title...',
        onKeyUp: onSimpleInput
    });
*/

/*
    const onSimpleInput = (event) => {
        // console.log("onSimpleInput", event);
        const input = event.target;
        const text = input.value;
        console.log(text, input);
        const id = input.id;
        // const isEnterKey = (event.which == 13);
    };
*/
