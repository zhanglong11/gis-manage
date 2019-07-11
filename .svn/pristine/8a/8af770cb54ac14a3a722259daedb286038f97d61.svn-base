import React,{Component} from 'react';
import {Input,InputNumber } from 'antd';
export class InputC extends Component{
    static defaultProps={
        width:200
    }

    change = (e) => {
        const {onChange} = this.props;
        if(onChange)
            onChange(e.target.value)
    }


    render() {
        return (
            <div>
                <Input allowClear {...this.props} style={{width:this.props.width}} onChange={e => {
                    this.change(e)
                }}/>
            </div>
        );
    }
}

export class NumberInput extends Component{
    static defaultProps={
        width:200
    }

    change = val => {
        const {onChange} = this.props;
        if(onChange)
            onChange(val)
    }


    render() {
        return (
            <div>
                <InputNumber allowClear {...this.props} style={{width:this.props.width}} onChange={val => {
                    this.change(val)
                }}/>
            </div>
        );
    }
}
