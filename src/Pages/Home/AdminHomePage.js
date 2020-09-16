import React from 'react';
import {Layout, Menu} from "antd";
import {MailOutlined, UserOutlined, EditOutlined} from "@ant-design/icons";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import UserAudit from "./AdminHome/UserAudit";
import DateSelector from "./AdminHome/DateSelector";
import OrderedListOutlined from "@ant-design/icons/lib/icons/OrderedListOutlined";
import LineChartOutlined from "@ant-design/icons/lib/icons/LineChartOutlined";
import BookOutlined from "@ant-design/icons/lib/icons/BookOutlined";
import DiscussList from "./AdminHome/List/DiscussList";
import UserList from "./AdminHome/List/UserList";
import Interests from "./AdminHome/Interests";

const {SubMenu} = Menu;
const {Content, Sider} = Layout;

export default class AdminHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNav: 'userList'
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
                        {sessionStorage.getItem('userRoot') === '2' ?
                            <Menu.Item key="Audit" icon={<MailOutlined/>}><Link
                                to={'/home/admin/userAudit'}>审核</Link></Menu.Item> : <></>}
                        <SubMenu key="list" icon={<OrderedListOutlined/>} title="列表">
                            <Menu.Item key="userList" icon={<UserOutlined/>}>
                                <Link to='/home/admin/userList'>用户列表</Link>
                            </Menu.Item>
                            <Menu.Item key="discussList" icon={<BookOutlined/>}>
                                <Link to='/home/admin/discussList'>讨论列表</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="statistics" icon={<LineChartOutlined/>} title="统计">
                            <Menu.Item key="discusses"><Link
                                to={"/home/admin/dateSelector/discussStatistics"}>讨论数统计</Link></Menu.Item>
                            <Menu.Item key="register"><Link
                                to={"/home/admin/dateSelector/registerStatistics"}>注册统计</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="interests" icon={<EditOutlined/>}>
                            <Link to={'/home/admin/interests'}>
                                兴趣管理
                            </Link>
                        </Menu.Item>
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
                            <Route path='/home/admin/discussList' component={DiscussList}/>
                            <Route path='/home/admin/userList' component={UserList}/>
                            <Route path="/home/admin/userAudit" component={UserAudit}/>
                            <Route path="/home/admin/dateSelector/:type" component={DateSelector}/>
                            <Route path="/home/admin/interests" component={Interests}/>
                            <Redirect path={"/home/admin"} to='/home/admin/userList'/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
