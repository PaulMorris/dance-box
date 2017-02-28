import React from 'react';
const rel = React.createElement;

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
    let { options, value, keyProp, className, modifyFigure, figureIndex } = props;
    let itemToOption = item => <option value={item}>{item}</option>;

    let handleChange = event => modifyFigure({
        figureIndex: figureIndex,
        keyProp: keyProp,
        value: event.target.value
    });

    return rel('select',
        {
            className: className,
            name: "usercard",
            value: value,
            onChange: handleChange
        },
        ...options.map(itemToOption)
    );
}

export function FigureItem(props) {
    const { type, danceFigure, typeVariations, modifyFigure, figureIndex, deleteFigure } = props,

        arraysOnly = key => Array.isArray(typeVariations[key]),

        toMenu = key => {
            let val = danceFigure[key];
            return rel(Menu,
                {
                    options: typeVariations[key],
                    value: val,
                    keyProp: key,
                    className: "figure_item_select",
                    modifyFigure: modifyFigure,
                    figureIndex: figureIndex
                });
        },

        handleDelete = event => deleteFigure({
            figureIndex: figureIndex
        }),

        menus = Object.keys(typeVariations).filter(arraysOnly).map(toMenu);

    console.log('figureItem', menus, danceFigure, typeVariations);

    return rel('div', null,
        danceFigure.type + '  ',
        ...menus,
        rel('div',
            {
                onClick: handleDelete,
                className: "delete_figure_button"
            },
            'X'
    ));
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



export function App(props) {
  console.log("PROPS appState", props.appState.toJS(), props);

  const { appState, addFigure, modifyFigure, deleteFigure } = props;

  const figureButtonClick = (figureTypeData, figureName) => event => {
      console.log('figureButtonClick', figureTypeData, event);

      let danceFigure = figureTypeData.defaults;
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

  const figures = appState.get('dances').get('A Demo Dance').get('figures').toJS(),
        figureTypes = appState.get('figureTypes').toJS(),
        figureTypesKeys = Object.keys(figureTypes);

    // console.log('figureTypesKeys', figureTypesKeys);

  const danceTitle = rel('input',
    {
        type: 'text',
        id: 'dance-title',
        className: 'title_field',
        placeholder: 'Dance Title...',
        onKeyUp: onSimpleInput
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

            let type = danceFigure.type,
                typeData = figureTypes[type];

            // console.log('typeData', type, typeData);

            return rel('li',
                {
                    key: danceFigure + index,
                    className: 'figure_item_li'
                },
                rel(FigureItem,
                    {
                        danceFigure: danceFigure,
                        typeVariations: typeData.variations,
                        modifyFigure: modifyFigure,
                        deleteFigure: deleteFigure,
                        figureIndex: index
                    })
                );
        }));

  return rel('div',
      {
          className: 'app_wrapper'
      },
      danceTitle,
      figureButtons,
      figureList
  );
}
