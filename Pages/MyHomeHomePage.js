import React from 'react';
import {Layout, Menu} from "antd";
import {LikeOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import MessageStatisticsView from "./MessageStatisticsView";
import PrivateChatView from "./PrivateChatView";
import MyHome from "./MyHome";
import Followlist from "./Followlist";
import Collectionlist from "./Collectionlist";
import EditSelf from "./EditSelf";
import Userlist from "./Userlist";
import Discusslist from "./Discusslist";
import Statistics from "./Statistics";

const {SubMenu} = Menu;
const {Content, Sider} = Layout;

export default class MyHomeHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNav: 'user',
            userid:1,
            // state1:0,
            // vid:1,
        }
    }

    render() {
        return (
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['user']}
                        style={{height: '100%', borderRight: 0}}
                        selectedKeys={this.state.sideNav}
                        onClick={e => this.setState({sideNav: e.key})}
                    >
                        <Menu.Item key="user" icon={<UserOutlined/>}>
                            <Link to={"/home/myHome/Selfhome/"+this.state.userid+"/"+this.state.userid}>个人资料</Link>
                        </Menu.Item>
                        {/*<Menu.Item key="myStar" icon={<LikeOutlined/>}>我的收藏</Menu.Item>*/}
                        <SubMenu key="msgCenter" icon={<NotificationOutlined/>} title="消息中心">
                            <Menu.Item key="comment"><Link
                                to="/home/myHome/MessageStatistics/3">评论</Link></Menu.Item>
                            <Menu.Item key="like"><Link
                                to="/home/myHome/MessageStatistics/4">点赞</Link></Menu.Item>
                            <Menu.Item key="star"><Link
                                to="/home/myHome/MessageStatistics/5">关注</Link></Menu.Item>
                            <Menu.Item key="chat"><Link to="/home/myHome/PrivateChat">私信</Link></Menu.Item>
                        </SubMenu>
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
                            <Route exact component={PrivateChatView} path="/home/myHome/PrivateChat"/>
                            <Route exact component={MessageStatisticsView} path="/home/myHome/MessageStatistics/:id"/>
                            <Route exact component={MyHome} path="/home/myHome/Selfhome/:uid/:vid"/>
                            <Redirect exact path={'/home/myHome/'} to={'/home/myHome/Selfhome/'+this.state.userid+"/"+this.state.userid}/>
                            <Route exact component={Followlist} path="/home/myHome/f/:uid/:vid"/>
                            <Route exact component={Collectionlist} path="/home/myHome/collection/:uid/:vid"/>
                            <Route exact component={EditSelf} path="/home/myHome/edit/:uid"/>
                            <Route exact component={Userlist} path="/home/myHome/Admin/userlist/:uid"/>
                            <Route exact component={Discusslist} path="/home/myHome/Admin/discusslist/:uid"/>
                            <Route exact component={Statistics} path="/home/myHome/Admin/statis/:uid"/>
                            {/*<Redirect path={'/home/myHome'} to={'/home/myHome/PrivateChat'}/>*/}
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
