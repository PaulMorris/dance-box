import React from 'react';
import { DancesView } from './dances';
import { DanceView } from './dance';
import { fromJS } from 'immutable';
import { immLog } from '../utilities';

const rel = React.createElement;

export const App = (props) => {
    immLog("props.state, then props:", props.state, props);

    const uiState = props.state.get('uiState').toJS(),
        dances = props.state.get('dances').toJS();

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
            figureTypes: props.state.get('figureTypes').toJS(),
            danceMenusData: props.state.get('danceMenusData').toJS()
        });

    } else {
        return rel('h1', null, 'Oops!  We have a problem...');
    }
};
