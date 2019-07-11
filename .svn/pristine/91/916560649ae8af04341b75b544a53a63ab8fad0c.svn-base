import React from 'react';
import './style.less'
const Label= props=>(
    <label
        className="LabelComp"
        style={{
            ...props.labelStyle,
            width: props.width,
            textAlign: props.align ? props.align : ''
        }}
    >
        {props.children}
    </label>
)

Label.displayName = 'LabelComp';
Label.defaultProps = {
    labelStyle: {},
    align:'right',
    width: 100
};
export default Label;