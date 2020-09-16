import React from 'react';
import {Layout, Menu} from "antd";
import {NotificationOutlined, UserOutlined} from "@ant-design/icons";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import MessageStatisticsView from "./MyHomeHome/MessageStatisticsView";
import PrivateChatView from "./MyHomeHome/PrivateChatView";
import MyHome from "./MyHomeHome/MyHome";
import Followlist from "./MyHomeHome/Followlist";
import InterestList from "./MyHomeHome/InterestList";
import DiscussListPage from "./DiscussHome/DiscussListPage";
import MyNotification from "./MyHomeHome/MyNotification";
import Discusslist from "./MyHomeHome/Discusslist";
import DiscussList2 from "./MyHomeHome/DiscussList2";
import FollowList2 from "./MyHomeHome/FollowList2";

const {SubMenu} = Menu;
const {Content, Sider} = Layout;

export default class MyHomeHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNav: 'user',
        }
    }

    render() {
        return (
            <Layout>
                <Sider width={200} className="site-layout-background" style={{position: 'fixed'}}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['user']}
                        style={{height: '100%', borderRight: 0}}
                        selectedKeys={this.state.sideNav}
                        onClick={e => this.setState({sideNav: e.key})}
                    >
                        <SubMenu key="userCenter" icon={<UserOutlined/>} title="个人资料">
                            <Menu.Item key="userHome"><Link
                                to={"/home/myHome/userHome/" + sessionStorage.getItem('userId')}>个人主页</Link></Menu.Item>
                            <Menu.Item key="userFollow"><Link
                                to={"/home/myHome/follow/" + sessionStorage.getItem('userId')}>我的关注</Link></Menu.Item>
                            <Menu.Item key="followMe"><Link
                                to={"/home/myHome/follow2/" + sessionStorage.getItem('userId')}>关注我的</Link></Menu.Item>
                            <Menu.Item key="userInterest"><Link
                                to={"/home/myHome/interest/" + sessionStorage.getItem('userId')}>我的兴趣</Link></Menu.Item>
                            <Menu.Item key="userStar"><Link
                                to={"/home/myHome/myDiscuss/my"}>我的讨论</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="notification" icon={<NotificationOutlined/>}><Link
                            to="/home/myHome/notification">通知</Link></Menu.Item>
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
                            <Route exact component={PrivateChatView} path="/home/myHome/PrivateChat"/>
                            <Route exact component={MessageStatisticsView} path="/home/myHome/MessageStatistics/:id"/>
                            <Route exact component={MyHome} path="/home/myHome/userHome/:uid"/>
                            <Route exact component={Followlist} path="/home/myHome/follow/:uid"/>
                            <Route exact component={FollowList2} path="/home/myHome/follow2/:uid"/>
                            <Route exact component={DiscussListPage} path="/home/myHome/myDiscuss/:type"/>
                            <Route exact component={InterestList} path="/home/myHome/interest/:uid"/>
                            <Route exact component={MyNotification} path="/home/myHome/notification"/>
                            <Route exact component={Discusslist} path="/home/myHome/discusslist/:uid"/>
                            <Route exact component={DiscussList2} path="/home/myHome/discuss/:uid"/>
                            <Redirect exact path={'/home/myHome/'}
                                      to={'/home/myHome/userHome/' + sessionStorage.getItem('userId')}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
