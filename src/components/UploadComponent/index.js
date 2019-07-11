import React, {Component} from 'react';
import { Upload, Icon} from 'antd';
import {CORE} from '@Config/http'
import './style.less'


export class ImgUpload extends Component {
    state = {
        loading: false,
        token:'',
        core:CORE,
        fileUrl:''
    };

    componentDidMount() {
        this.props.onRef(this)
        let token = localStorage.getItem("token")
        this.setState({token,fileUrl:this.props.fileUrl})
    }

    onSuccess=(data)=>{
        this.setState({fileUrl:data.data})
    }

    getUrl=()=>{
        return this.state.fileUrl
    }


    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {fileUrl,core,token} = this.state;
        return (
            <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`${core}/gim6d/file/common/upload`}
                headers={{'x-access-token': token}}
                onChange={this.handleChange}
                onSuccess={this.onSuccess}
            >
                {fileUrl ? <img src={fileUrl} style={{width:'inherit'}} alt="avatar" /> : uploadButton}
            </Upload>
        );
    }
}
