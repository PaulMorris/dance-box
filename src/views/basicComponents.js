// Basic components to use everywhere they are needed (e.g. menu, text field, etc.)

import React from 'react';

const rel = React.createElement;

/**
 * Button implemented as a div.
 * @arg {Object} props
 * @arg {String} props.text - The string to display in the button.
 */
export const Button = (props) => {
    return rel('div', null, props.text);
};

/**
 * @arg {Object} props
 * @arg {String} props.placeholder
 * @arg {String} props.value - May be a 'number as a string'.
 * @arg {String} props.className
 * @arg {Function} props.onChange
 */
export const TextField = (props) => rel('input', {
    type: "text",
    placeholder: props.placeholder,
    value: props.value,
    className: props.className,
    onChange: props.onChange
});

/**
 * @arg {Object} props
 * @arg {String} props.value.value
 * @arg {String} props.className
 * @arg {Function} props.handleChange
 * @arg {Object[]} props.options - Array of menu items / options.
 * @arg {String} props.options.value - The value for this item / option.
 * @arg {String} props.options.label - The visible label string.
 */
export const Menu = (props) => {
    let toOption = item => rel('option', {
            value: item.value
        },
        item.label
    );
    return rel('select', {
            className: props.className,
            // note: 'value.value' is not a typo
            value: props.value.value,
            onChange: props.handleChange
        },
        ...props.options.map(toOption)
    );
};
