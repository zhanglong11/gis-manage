import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Layout,Menu} from 'antd';


const {Content, Sider} = Layout;

const SubMenu = Menu.SubMenu;
const menuList = [
    {
        title: '首页',
        key: '/cis'
    },
    {
        title: '服务',
        key: '/cis/server'
    },

    {
        title: '员工管理',
        key: '/cis/user'
    },
    {
        title: '车辆地图',
        key: '/cis/map'
    }
];

class Main extends Component {
    state = {
        treeData: [],
        id: null,
        pId: 0,
        key: 'folder',
        addFolder: false,
        defaultId: null,
        projectId:'',
        SelectedKeys:[]
    }

    changeRoute=(key)=>{
        console.log(key)
        this.props.history.push({
            pathname: `${key}`
        })
    }

    // 菜单渲染
    renderMenu = (MenuConfig) => {
        return MenuConfig.map(item => {
            if (item.children) {
                return (
                    <SubMenu title={item.title}  key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item title={item.title} key={item.key} onClick={()=>{this.changeRoute(item.key)}}>
                    {item.title}
                </Menu.Item>
            );
        });
    };


    render() {
        const {location}=this.props.history;
        return (
            <Layout style={{height: '100%'}}>
                <Sider theme='light'>
                    <div className='main-logo-wrapper'><h1 className='main-logo'/></div>
                    <Menu onClick={this.handleClick}
                          onOpenChange={this.handleOpenChange}
                          selectedKeys={[location.pathname]}
                          mode="inline">
                        {this.renderMenu(menuList)}
                    </Menu>
                </Sider>
                <Content style={{padding: '0 16px', height: '100%', position: 'relative'}}>
                    {this.props.children}
                </Content>
            </Layout>
        );
    }
}

export default withRouter(Main)

