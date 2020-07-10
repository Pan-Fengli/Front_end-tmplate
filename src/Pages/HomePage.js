import React from "react";
import {Layout, Menu} from 'antd';
import {TaobaoOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../Assets/assets/common.css';
import {Link, Redirect, Route, Switch} from "react-router-dom";
import DiscussHomePage from "./DiscussHomePage";
import MyHomeHomePage from "./MyHomeHomePage";

const {Header} = Layout;

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headNav: 'discuss',
        }
    }

    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo">
                        <div style={{color: "white", textAlign: "center", verticalAlign: "middle"}}>
                            <TaobaoOutlined/>&nbsp;&nbsp;淘兴趣
                        </div>
                    </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['discuss']}
                          selectedKeys={this.state.headNav} onClick={(e) => this.setState({headNav: e.key})}>
                        <Menu.Item key="discuss"><Link to={'/home/discuss'}>推荐</Link></Menu.Item>
                        <Menu.Item key="myHome"><Link to={'/home/myHome'}>我的</Link></Menu.Item>
                        <Menu.Item style={{float:"right"}} key="quit"><Link to={'/logIn'}>退出</Link></Menu.Item>
                    </Menu>
                </Header>
                <div className="subPage">
                    <Switch>
                        <Route path={'/home/discuss'} component={DiscussHomePage}/>
                        <Route path={'/home/myHome'} component={MyHomeHomePage}/>
                        <Redirect path={'/home'} to={'/home/discuss'}/>
                    </Switch>
                </div>
            </Layout>
        );
    }
}