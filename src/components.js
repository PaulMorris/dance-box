import React from 'react';

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
    return <div>{props.text}</div>;
}

export function MenuItem(props) {
    return null;
}

export function Menu(props) {
    console.log('menu', props);
    let { options, value, className } = props;
    let itemToOption = item => <option value={item}>{item}</option>;

    return (
        <select className={className} name="usercard" value={value}>
          {options.map(itemToOption)}
        </select>
    );
}

export function FigureItem(props) {
    const { data, typeData } = props,

        arraysOnly = key => Array.isArray(data[key]),

        toMenu = key => {
            let val = data[key];
            return <Menu options={val} value={val} className="figure_item_select" />;
        },

        menus = Object.keys(typeData).filter(arraysOnly).map(toMenu);

    console.log('figureItem', menus); // , data, typeData);

    return <div>{data.type} {menus} </div>;
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
  console.log("PROPS appState", props.appState.toJS());
  const { appState, addFigure } = props;

  const figureButtonClick = data => event => {
      console.log('figureButtonClick', data, event);
      return addFigure(data);
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

  return (
    <div className='app_wrapper'>

      <input type='text'
             id='dance-title'
             className='title_field'
             placeholder='Dance Title...'
             onKeyUp={onSimpleInput} />

      <ul className='figure_button_list'>
        {figureTypesKeys.map(k => {
              let typeData = figureTypes[k];
              // add the type to the data itself
              // typeData['type'] = k;
              return (
                  <li key={k}
                      className='figure_button'
                      onClick={figureButtonClick(typeData)}>
                    <Button data={typeData}
                            text={k} />
                  </li>
              );
        })}
      </ul>

      <ul className='figure_list'>
        {figures.map((figure, index) => {
            console.log('figureTypes2', figureTypes);

            let type = figure.type,
                typeData = figureTypes[type];

            console.log('typeData', type, typeData);
            return (
                <li key={figure + index}
                    className='figure_item_li'
                    onClick=''>
                    <FigureItem data={figure} typeData={typeData} />
                </li>
            );
        })}
      </ul>

    </div>
  );
}
// .get(figure.type)
