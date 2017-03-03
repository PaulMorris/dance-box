import React from 'react';
const rel = React.createElement;

// convert 'string representations of numbers' (like html menu values)
// to numbers if possible or just return the string.
var numberify = (val) => {
    let n = Number(val);
    return n ? n : val;
};

/*
export function Todo(props) {
  const { todo } = props,
        // todo.text
        txt = todo.text; // todo.get('text');

  if(todo.isDone) { // todo.get('isDone')
    return <strike>{txt}</strike>;
  } else {
    return <span>{txt}</span>;
  }
}
*/

export function Button(props) {
    // console.log(props);
    // const { mb } = props;
    return rel('div', null, props.text);
    // <div>{props.text}</div>;
}

/*
React.createElement(Dropdown, {
    keyprop: "repeat",
    value: this.state.repeat,
    options: this.props.repeatList,
    onInput: this.handleSimpleChange
}),
*/


var TextField = React.createClass({
    handleChange: function(event) {
        this.props.onInput(this.props.keyprop, event.target.value);
    },
    render: function() {
        return rel('input',
            {
                type: "text",
                // placeholder: "New Dance"
                value: this.props.value,
                onChange: this.handleChange
            });
    }
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

export function Menu(props) {
    console.log('menu', props);
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

    console.log('figureItem', menus, danceFigure, typeData);

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
/*
export function FigureList(props) {
    console.log(props);
    const { figures } = props;

    return (
        <ul className='figures_list'>
            {figures.map(m => (
              <li key={''}
                  className='figureItem'
                  onClick={''}>
                <FigureItem item={m.toJS()} />
              </li>
            ))}
        </ul>
    );

}
*/

/*
const toggleClick = id => event => {
    console.log("toggleClick");
    return toggleTodo(id);
};
*/

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
  console.log("PROPS appState", props.appState.toJS(), props);

  const { appState, addFigure, modifyFigure, deleteFigure, addNewDance, setDanceProperty } = props;

  const currentDance = appState.get('currentDance');

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
    // const isLongEnough = text.length > 0;
    /*
    if(isEnterKey && isLongEnough) {
      input.value = '';
      addTodo(text);
    }
    */
  };

  const figures = appState.get('dances').get(currentDance).get('figures').toJS(),
        figureTypes = appState.get('figureTypes').toJS(),
        figureTypesKeys = Object.keys(figureTypes);

    // console.log('figureTypesKeys', figureTypesKeys);

  const danceTitleOld = rel('input', {
        type: 'text',
        id: 'dance-title',
        className: 'title_field',
        placeholder: 'Dance Title...',
        onKeyUp: onSimpleInput
    });

  const danceTitle = rel(TextField, {
        keyprop: "dance-title",
        value: currentDance,
        onInput: (event) => {
            setDanceProperty('dance-title', event.target)
        }
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
        ...appState.get('dances').map((dance, index) => {
            return rel('li',
                {
                    className: 'dance_list_item'
                },
                dance.title
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
