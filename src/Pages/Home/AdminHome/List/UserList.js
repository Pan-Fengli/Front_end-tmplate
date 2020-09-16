import React from "react";
import {Button, Col, Input, Row, Space, Table, Tag} from "antd";
import {UndoOutlined, WarningOutlined} from "@ant-design/icons";
import StopOutlined from "@ant-design/icons/lib/icons/StopOutlined";
import {getFetch, postFetch} from "../../../../Functions/fetchRequest";
import ContentEditor from "../ContentEditor";

const {Search} = Input;
export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auditState: null, auditRow: -1,
            writeContent: false,
            userList: [],
            pageSize: 10,
            pageIndex: 0,
            tags: [
                {text: "自由", color: "green"}, //0 2
                {text: "禁言", color: "yellow"},//1 2
                {text: "封禁", color: "red"},//4
            ],
            actions: [
                {text: "禁言", icon: <WarningOutlined/>, func: (row) => this.setUserState(row, 1)},
                {text: "取消禁言", icon: <UndoOutlined/>, func: (row) => this.setUserState(row, 0)},
                {text: "封禁", icon: <StopOutlined/>, func: (row) => this.setUserState(row, 2)},
                {text: "取消封禁", icon: <UndoOutlined/>, func: (row) => this.setUserState(row, 0)},
            ],
            columns: [
                {
                    title: "用户名",
                    dataIndex: "username",
                    render: (username, record) => <span
                        onClick={() => this.toUserDetail(record.id)}><a>{username}</a></span>
                },
                {
                    title: "用户状态",
                    dataIndex: "state",
                    render: (state, user) => this.renderState(state)
                },
                {
                    title: "处理",
                    dataIndex: "",
                    render: (user, record, index) => {
                        if (user.waiting) {
                            return <Tag color={"blue"}>待处理</Tag>
                        }
                        switch (user.state) {
                            case 0:
                                return <Space>
                                    {this.renderAction(0, index)}
                                    {this.renderAction(2, index)}
                                </Space>;
                            case 1:
                                return <Space>
                                    {this.renderAction(1, index)}
                                    {this.renderAction(2, index)}
                                </Space>;
                            case 2:
                                return <Space>
                                    {this.renderAction(3, index)}
                                </Space>;
                            default:
                                return <></>
                        }
                    }
                }
            ]
        }
    }

    componentDidMount() {
        this.fetchData(0);
    }

    toUserDetail(id) {
        this.props.history.push('/home/myHome/userHome/' + id);
    }

    renderState(state) {
        return (<Tag color={this.state.tags[state].color}>{this.state.tags[state].text}</Tag>);
    }

    renderAction(i, row) {
        return (
            <Button onClick={() => this.state.actions[i].func(row)}>
                <Space>
                    {this.state.actions[i].icon}{this.state.actions[i].text}
                </Space>
            </Button>
        );
    }

    setUserState(row, state) {
        let userRoot = parseInt(sessionStorage.getItem('userRoot'));
        if (userRoot === 2) {
            let userId = this.state.userList[row].id
            console.log({
                senderId: sessionStorage.getItem('userId'),
                getterId: userId,
                state: state,
            })
            postFetch('/admin/state', {
                senderId: sessionStorage.getItem('userId'),
                getterId: userId,
                state: state,
                pageSize: this.state.pageSize,
                pageIndex: this.state.pageIndex
            }, rsp => {
                this.state.userList[row].state = state;
                this.setState({userList: this.state.userList});
            })
        } else {
            this.setState({
                writeContent: true,
                auditState: state,
                auditRow: row,
            });
        }
    };

    submitAudit = (content) => {
        let userId = this.state.userList[this.state.auditRow].id;
        postFetch('/audit/one', {
            senderId: sessionStorage.getItem('userId'),
            userId: userId,
            state: this.state.auditState,
            content: content,
        }, rsp => {
            let newArr = this.state.userList.slice();
            newArr[this.state.auditRow].waiting = true;
            this.setState({
                writeContent: false,
                userList: newArr
            });
        })
    };

    fetchData = (index) => {
        getFetch('/admin/userList', {
            searchText: this.state.searchText,
            userId: sessionStorage.getItem('userId'),
            pageSize: this.state.pageSize,
            pageIndex: index
        }, rsp => {
            this.setState({pageIndex: index, userList: rsp});
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Search value={this.state.searchText}
                                onChange={e => this.setState({searchText: e.target.value})}
                                onSearch={() => this.fetchData(0)} enterButton placeholder="输入用户名"/>
                    </Col>
                </Row>
                <ContentEditor visible={this.state.writeContent} submit={this.submitAudit}
                               cancel={() => this.setState({writeContent: false})}/>
                <Table dataSource={this.state.userList} columns={this.state.columns} pagination={false}/>
                <Space>
                    <Button onClick={() => {
                        this.fetchData(this.state.pageIndex - 1);
                    }}>上一页</Button>
                    <Button onClick={() => {
                        console.log(this.state.pageIndex)
                        this.fetchData(this.state.pageIndex + 1);
                    }}>下一页</Button>
                </Space>
            </div>
        );
    }
}
