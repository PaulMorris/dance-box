// Components for the view of a single dance
// for inspecting and editing that dance

import React from 'react';
const rel = React.createElement;
import { DanceCard } from './basicComponents';

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
            rel(DanceCard, {
                className: 'dance_card_small',
                value: props.dances[key].danceCard || '',
                readOnly: true
            }),
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

    rel('input', {
        type: 'button',
        value: 'Delete Everything and Start Over',
        className: 'button',
        onClick: props.dispatch.bind(null, {
            type: 'REBOOT_STATE'
        })
    }),

    // dance list
    rel(DanceList, {
        dispatch: props.dispatch,
        dances: props.dances

    })
);
