import React from 'react';
import {Layout, Menu} from "antd";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import DiscussListPage from "./DiscussListPage";
import DiscussDetailPage from "./DiscussDetailPage";

const {Content, Sider} = Layout;

export default class DiscussHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNav: 'recommend'
        }
    }

    render() {
        return (
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['recommend']}
                        style={{height: '100%', borderRight: 0}}
                        selectedKeys={this.state.sideNav}
                        onClick={e => this.setState({sideNav: e.key})}
                    >
                        <Menu.Item key="recommend"><Link to={{
                            pathname: "/home/discuss/discussList",
                            state: {type: "recommend"}
                        }}>推荐</Link></Menu.Item>
                        <Menu.Item key="star"><Link to={{
                            pathname: "/home/discuss/discussList",
                            state: {type: "star"}
                        }}>关注</Link></Menu.Item>
                        <Menu.Item key="hot"><Link to={{
                            pathname: "/home/discuss/discussList",
                            state: {type: "hot"}
                        }}>热榜</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{padding: '24px 24px 24px'}}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path="/home/discuss/discussList" component={DiscussListPage}/>
                            <Route path={"/home/discuss/discussDetail"} component={DiscussDetailPage}/>
                            <Redirect path={"/home/discuss"} to={{pathname: "/home/discuss/discussList", type: 1}}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
