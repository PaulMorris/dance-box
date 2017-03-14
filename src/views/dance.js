// Components for the view of a list of dances

import React from 'react';
import { Menu, TextField } from './basicComponents';
import { numberify, getDefaultsFromArrayOfObjects } from '../utilities';

const rel = React.createElement;

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

export const DanceView = (props) => rel('div', {
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
