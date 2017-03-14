import React from 'react';
import mori from 'mori';
import { DancesView } from './dances';
import { DanceView } from './dance';

const rel = React.createElement;

// for logging mori data structures
const log = (...args) => console.log(...args.map(mori.toJs));

export const App = (props) => {
    log("props.state, then props:", props.state, props);

    const uiState = mori.toJs(mori.get(props.state, 'uiState')),
        dances = mori.toJs(mori.get(props.state, 'dances'));

    if (uiState.mode === 'dances') {
        return rel(DancesView, {
            dispatch: props.dispatch,
            dances: dances
        });

    } else if (uiState.mode === 'editDance') {
        return rel(DanceView, {
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
