import React, {Component} from "react";
import {Button, message} from "antd";
import {InputC,NumberInput} from '@Components/Form'
import Label from '@Components/Label'
import {post} from "@Fetch";
import {CORE_URL, CORE} from "@Config/http";
import Loading from '@Components/Loading'


export default class AddOne extends Component {
    state = {
        name: '',
        version:'',
        projectId:this.props.projectId,
        handleType: this.props.type,
        id: this.props.id,
        pId: this.props.pId,
        isLoading:false
    }

    componentDidMount() {
        const {handleType} = this.state;
        if (handleType == 'modify')
            this.getData();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.id != nextProps.id && nextProps.type == 'modify') {
            this.setState({id: nextProps.id, pId: nextProps.id}, () => {
                this.getData();
            })
        }
        if (this.props.type != nextProps.type) {
            this.setState({handleType: nextProps.type})
        }


        if (this.props.projectId != nextProps.projectId) {
            this.setState({projectId: nextProps.projectId})
        }

        if (nextProps.type == 'add') {
            this.reset();
        }
    }
    reset = () => {
        this.setState({
            name: '',
            version:''
        })
    }


    getData = () => {
        this.setState({isLoading:true})
        const {id} = this.state;
        post(`${CORE}/gim6d/bimModel/get/${id}`, {}).then(data => {
            let project = data.data;
            this.setState({
                name: project.name,
                version:project.version
            })
        }).finally(() => {
            this.setState({isLoading: false})
        })
    }


    saveData = (param) => {
        const {id, handleType,pId,projectId} = this.state;
        const {onGetTree} = this.props;
        if (handleType == 'modify')
            post(`${CORE}/gim6d/bimModel/update`, {...param,...{id,projectId}}).then(data => {
                if (data.code != 200) {
                    message.error(data.message)
                    return;
                }
                if(onGetTree)
                    onGetTree();
                message.success(data.message)
            })


        if (handleType == 'add')
            post(`${CORE}/gim6d/bimModel/add`, {...param, ...{categoryId:pId,projectId}}).then(data => {
                if (data.code != 200) {
                    message.error(data.message)
                    return;
                }
                if(onGetTree)
                    onGetTree('add');
                message.success(data.message)
            })
    }


    save = () => {
        const {name,version} = this.state;
        if (!name) {
            message.error('请输入名称');
            return;
        }

        // if (!allowance) {
        //     message.error('请输入容差');
        //     return;
        // }
        //
        // if (!minX) {
        //     message.error('请输入X最小值')
        //     return;
        // }
        //
        // if (!maxX) {
        //     message.error('请输入X最大值');
        //     return;
        // }
        //
        // if (!minY) {
        //     message.error('请输入Y最小值');
        //     return;
        // }
        //
        // if (!maxY) {
        //     message.error('请输入Y最大值');
        //     return;
        // }
        // if (!longitude) {
        //     message.error('请输入经度');
        //     return;
        // }
        // if (!latitude) {
        //     message.error('请输入纬度');
        //     return;
        // }
        this.saveData({name,version})
    }

    render() {
        if(this.state.isLoading)
            return (<Loading />)
        return (<div className='class-wrapper'>
            <h3 className='class-title'>单体</h3>
            <div className='class-list'>
                <h6 className='class-list-title'>
                    常规
                </h6>
                <div className='class-list-item'>
                    <div className='class-list-content'>
                        <Label>名称:</Label>
                        <InputC
                            value={this.state.name}
                            onChange={val => {
                                this.setState({name: val})
                            }}/>
                    </div>
                    <div className='class-list-content'>
                        <Label>版本:</Label>
                        <NumberInput
                            value={this.state.version}
                            onChange={val => {
                                this.setState({version: val})
                            }}/>
                    </div>
                </div>
                <div className='class-btn'>
                    <Button type="primary" onClick={this.save}>保存</Button>
                </div>
            </div>
        </div>)
    }
}