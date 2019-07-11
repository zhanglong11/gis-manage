import React, {Component} from 'react';
import {LocaleProvider} from 'antd';
import {Route, HashRouter as Router} from 'react-router-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Login from '@Pages/Login';
import MenuChoose from '@Pages/MenuChoose';
import GisProject from '@Pages/Gis/ProjectChoose';
import BimProject from '@Pages/Bim/ProjectChoose';
import GisMan from '@Pages/Gis/Main';
import BimMan from '@Pages/Bim/Main';
import CisMan from '@Pages/Cis/Main';
import Home from '@Pages/Cis/Home';
import Server from '@Pages/Cis/Server';
import User from '@Pages/Cis/User';
import {rootStore} from '@Store'
import './stlye.less';

moment.locale('zh-cn');


const store=createStore(rootStore)

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <LocaleProvider locale={zh_CN}>
                    <Router>
                        <Route exact path="/" component={Login}/>
                        <Route path="/menu" component={MenuChoose}/>
                        <Route path="/gisProject" component={GisProject}/>
                        <Route path="/bimProject" component={BimProject}/>
                        <Route path="/gis" component={GisMan}/>
                        <Route path="/bim" component={BimMan}/>
                        <Route path="/cis" render={(props) =>
                            <CisMan state={props}>
                                <Route exact path='/cis' component={Home}/>
                                <Route path='/cis/server' component={Server}/>
                                <Route path='/cis/user' component={User}/>
                            </CisMan>
                        }/>
                    </Router>
                </LocaleProvider>
            </Provider>
        )
    }
}
