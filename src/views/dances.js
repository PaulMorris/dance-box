// Components for the view of a single dance
// for inspecting and editing that dance

import React from 'react';
const rel = React.createElement;

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

export const DancesView = (props) => rel('div', {
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
