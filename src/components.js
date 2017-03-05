import React from 'react';
const rel = React.createElement;
import mori from 'mori';

const log = (...args) => console.log(...args.map(mori.toJs));

// convert 'string representations of numbers' (like html menu values)
// to numbers if possible or just return the string.
var numberify = (val) => {
    let n = Number(val);
    return n ? n : val;
};

export function Button(props) {
    // console.log(props);
    // const { mb } = props;
    return rel('div', null, props.text);
    // <div>{props.text}</div>;
}

const TextField = (props) => rel('input', {
    type: "text",
    placeholder: props.placeholder,
    value: props.value,
    onChange: props.onChange
});

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
    let { type, options, value, keyProp, className, modifyFigure, figureIndex } = props;
    let itemToOption = item => rel('option', {value: item.value}, item.label); // <option value={item}>{item}</option>;

    let handleChange = event => modifyFigure({
        type: type,
        figureIndex: figureIndex,
        keyProp: keyProp,
        value: numberify(event.target.value)
    });

    return rel('select',
        {
            className: className,
            name: "usercard",
            // TODO: better naming needed...
            value: value.value,
            onChange: handleChange
        },
        ...options.map(itemToOption)
    );
}

export function FigureItem(props) {
    const {danceFigure, typeData, modifyFigure, figureIndex, deleteFigure} = props,

        arraysOnly = key => Array.isArray(typeData[key]),

        toMenu = key => {
            // let val = danceFigure[key].value;
            return rel(Menu,
                {
                    type: danceFigure.type,
                    options: typeData[key],
                    value: danceFigure[key],
                    keyProp: key,
                    className: "figure_item_select",
                    modifyFigure: modifyFigure,
                    figureIndex: figureIndex
                });
        },

        handleDelete = event => deleteFigure({
            figureIndex: figureIndex
        }),

        menus = Object.keys(typeData).filter(arraysOnly).map(toMenu);

    // console.log('figureItem', menus, danceFigure, typeData);

    return rel('div', null,
        danceFigure.type + '  ',
        ...menus,
        rel('div',
            {
                onClick: handleDelete,
                className: "delete_figure_button"
            },
            'X'
    ),
    ' ', danceFigure.startBeat, ' - ', danceFigure.endBeat
    );
}


var getFigureDefaults = (figureTypeData) => {
    let keys = Object.keys(figureTypeData);
    // let result = keys.map(key => figureTypeData[key].filter(obj => obj['default'] || false));
    let result = {};
    keys.forEach(key => {
        let variations = figureTypeData[key];
        let defaultInArray = variations.filter(obj => obj['default']);
        result[key] = defaultInArray[0];
    });

    console.log('result', result);
    return result;
};

export function App(props) {
  log("PROPS appState", props.appState, props);

  const { appState, addFigure, modifyFigure, deleteFigure, addNewDance, setDanceProperty } = props;

  const currentDance = mori.get(appState, 'currentDance');

  const figureButtonClick = (figureTypeData, figureName) => event => {
      console.log('figureButtonClick', figureTypeData, event);

      let danceFigure = getFigureDefaults(figureTypeData);
      danceFigure.type = figureName;
      return addFigure(danceFigure);
  };

  const onSimpleInput = (event) => {
    // console.log("onSimpleInput", event);
    const input = event.target;
    const text = input.value;
    console.log(text, input);
    const id = input.id;

    // const isEnterKey = (event.which == 13);

  };

  const dances = mori.toJs(mori.get(appState, 'dances')),
        figures = mori.toJs(mori.getIn(appState, ['dances', currentDance, 'figures'])) || [],
        figureTypes = mori.toJs(mori.get(appState, 'figureTypes')),
        figureTypesKeys = Object.keys(figureTypes);

    log('figs', figures);

    // console.log('figureTypesKeys', figureTypesKeys);

  const danceTitleOld = rel('input', {
        type: 'text',
        id: 'dance-title',
        className: 'title_field',
        placeholder: 'Dance Title...',
        onKeyUp: onSimpleInput
    });

  const danceTitle = rel(TextField, {
        value: dances[currentDance] ? dances[currentDance].title : '',
        placeholder: 'Untitled Dance',
        onChange: (event) => setDanceProperty('title', event.target.value)
    });

  const figureButtons = rel('ul',
    {
        className: 'figure_button_list'
    },
    ...figureTypesKeys.map(typeName => {
          let typeData = figureTypes[typeName];
          // add the type to the data itself
          // typeData['type'] = k;
          return rel('li',
            {
                key: typeName,
                className: 'figure_button',
                onClick: figureButtonClick(typeData, typeName)
            },
            rel(Button, {text: typeName})
        );
    }))

    const figureList = rel('ul',
        {
            className: 'figure_list'
        },
        ...figures.map((danceFigure, index) => {

            // console.log('figureTypes2', figureTypes);

            let typeData = figureTypes[danceFigure.type];

            // console.log('typeData', type, typeData);

            return rel('li',
                {
                    key: danceFigure + index,
                    className: 'figure_item_li'
                },
                rel(FigureItem,
                    {
                        danceFigure: danceFigure,
                        typeData: typeData,
                        modifyFigure: modifyFigure,
                        deleteFigure: deleteFigure,
                        figureIndex: index
                    })
                );
        }));

    const danceList = rel('ul',
        {
            className: 'dance_list'
        },
        ...Object.keys(dances).map((key, index) => {
            return rel('li',
                {
                    className: 'dance_list_item'
                },
                dances[key].title
            );
        })
    );

    const newDanceButton = rel('div',
        {
            className: 'new_dance_button',
            onClick: addNewDance
        },
        'New Dance!'
    );

  return rel('div',
      {
          className: 'app_wrapper'
      },
      danceTitle,
      figureButtons,
      figureList,
      newDanceButton,
      danceList
  );
}
