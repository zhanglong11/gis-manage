import React, {Component} from "react";
import {Button, message} from "antd";
import {InputC, NumberInput} from '@Components/Form'
import Label from '@Components/Label'
import {post} from "@Fetch";
import {CORE_URL, CORE} from "@Config/http";
import Loading from '@Components/Loading'
import './style.less'



export default class elementClass extends Component {
    static defaultProps={
        type:'add'
    }

    state = {
        name: '',
        allowance: '',
        minX: '',
        maxX: '',
        minY: '',
        maxY: '',
        minZ: '',
        maxZ: '',
        longitude: '',
        latitude: '',
        type:'',
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
            this.setState({id: nextProps.id}, () => {
                this.getData();
            })
        }

        if (this.props.pId != nextProps.pId) {
            this.setState({pId: nextProps.pId})
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
            allowance: '',
            minX: '',
            maxX: '',
            minY: '',
            maxY: '',
            minZ: '',
            maxZ: '',
            longitude: '',
            latitude: ''
        })
    }


    getData = () => {
        this.setState({isLoading:true})
        const {id} = this.state;
        post(`${CORE}/gim6d/layerCategory/get/${id}`, {}).then(data => {
            let project = data.data;
            this.setState({
                isLoading:false,
                name: project.name,
                type:project.type,
                allowance: project.allowance,
                minX: project.minX,
                maxX: project.maxX,
                minY: project.minY,
                maxY: project.maxY,
                minZ: project.minZ,
                maxZ: project.maxZ,
                longitude: project.longitude,
                latitude: project.latitude
            })
        })
    }


    saveData = (param) => {
        const {id, handleType,pId,projectId} = this.state;
        const {onGetTree} = this.props;
        if (handleType == 'modify')
            post(`${CORE}/gim6d/layerCategory/update/${id}`, param).then(data => {
                if (data.code != 200) {
                    message.error(data.message)
                    return;
                }
                if(onGetTree)
                    onGetTree();
                message.success(data.message)
            })


        if (handleType == 'add')
            post(`${CORE}/gim6d/layerCategory/add`, {...param, ...{pid:pId,projectId}}).then(data => {
                if (data.code != 200) {
                    message.error(data.message)
                    return;
                }
                if(onGetTree)
                    onGetTree();
                message.success(data.message)
            })
    }


    save = () => {
        const {name, allowance, minX, maxX, minY, maxY,minZ,maxZ,longitude, latitude} = this.state;
        if (!name) {
            message.error('请输入名称');
            return;
        }
        //
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
        this.saveData({name, allowance, minX, maxX, minY, maxY,minZ,maxZ, longitude, latitude})
    }

    render() {
        if(this.state.isLoading)
            return (<Loading />)
        return (<div className='class-wrapper'>
            <h3 className='class-title'>要素数据集</h3>
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
                </div>
            </div>
            <div className='class-list'>
                <h6 className='class-list-title'>
                    精度
                </h6>
                <div className='class-list-item'>
                    <div className='class-list-content'>
                        <Label>容差:</Label>
                        <NumberInput
                            precision={3}
                            value={this.state.allowance}
                            onChange={val => {
                                this.setState({allowance: val})
                            }}/>
                    </div>
                </div>
            </div>
            <div className='class-list'>
                <h6 className='class-list-title'>
                    范围
                </h6>
                <div className='class-list-item'>
                    <div className='class-list-content'>
                        <Label>X最小值:</Label>
                        <NumberInput
                            precision={3}
                            value={this.state.minX}
                            onChange={val => {
                                this.setState({minX: val})
                            }}/>
                    </div>
                    <div className='class-list-content'>
                        <Label>X最大值:</Label>
                        <NumberInput
                            precision={3}
                            value={this.state.maxX}
                            onChange={val => {
                                this.setState({maxX: val})
                            }}/>
                    </div>
                </div>

                <div className='class-list-item'>
                    <div className='class-list-content'>
                        <Label>Y最小值:</Label>
                        <NumberInput
                            precision={3}
                            width={200}
                            value={this.state.minY}
                            onChange={val => {
                                this.setState({minY: val})
                            }}/>
                    </div>
                    <div className='class-list-content'>
                        <Label>Y最大值:</Label>
                        <NumberInput
                            precision={3}
                            width={200}
                            value={this.state.maxY}
                            onChange={val => {
                                this.setState({maxY: val})
                            }}/>
                    </div>
                </div>

                <div className='class-list-item'>
                    <div className='class-list-content'>
                        <Label>Z最小值:</Label>
                        <NumberInput
                            precision={3}
                            value={this.state.minZ}
                            onChange={val => {
                                this.setState({minZ: val})
                            }}/>
                    </div>
                    <div className='class-list-content'>
                        <Label>Z最大值:</Label>
                        <NumberInput
                            precision={3}
                            value={this.state.maxZ}
                            onChange={val => {
                                this.setState({maxZ: val})
                            }}/>
                    </div>
                </div>
            </div>
            <div className='class-list' style={{flex:1}}>
                <h6 className='class-list-title'>
                    经纬度
                </h6>
                <div className='class-list-item'>
                    <div className='class-list-content'>
                        <Label>经度:</Label>
                        <NumberInput
                            precision={8}
                            value={this.state.longitude}
                            onChange={val => {
                                this.setState({longitude: val})
                            }}/>
                    </div>
                    <div className='class-list-content'>
                        <Label>纬度:</Label>
                        <NumberInput
                            precision={8}
                            value={this.state.latitude}
                            onChange={val => {
                                this.setState({latitude: val})
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