import React from 'react';
import {Layout, Menu} from "antd";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import DiscussListPage from "./DiscussHome/DiscussListPage";
import DiscussDetailPage from "./DiscussHome/DiscussDetailPage";

const {Content, Sider} = Layout;

export default class DiscussHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNav: 'all',
        }
    }

    render() {
        return (
            <Layout>
                <Sider width={200} className="site-layout-background" style={{position: 'fixed'}}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['all']}
                        style={{height: '100%', borderRight: 0}}
                        selectedKeys={this.state.sideNav}
                        onClick={e => {
                            this.setState({sideNav: e.key});
                            sessionStorage.setItem("recommendType", e.key);
                        }}
                    >
                        <Menu.Item key="all"><Link to="/home/discuss/discussList/all">全部</Link></Menu.Item>
                        <Menu.Item key="recommend"><Link to="/home/discuss/discussList/recommend">推荐</Link></Menu.Item>
                        <Menu.Item key="star"><Link to="/home/discuss/discussList/star">关注</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{padding: '24px 24px 24px', marginLeft: 200}}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path="/home/discuss/discussList/:type" component={DiscussListPage}/>
                            <Route path={"/home/discuss/discussDetail/:discussId"} component={DiscussDetailPage}/>
                            <Redirect path={"/home/discuss"} to={"/home/discuss/discussList/all"}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
