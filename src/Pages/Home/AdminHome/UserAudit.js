import React from 'react';
import {Avatar, Button, Space, Table, Tag} from "antd";
import {getFetch, postFetch} from "../../../Functions/fetchRequest";
import ContentEditor from "./ContentEditor";

export default class UserAudit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            writeContent: false,
            auditRow: 0,
            tags: [
                {text: "自由", color: "green"},
                {text: "禁言", color: "yellow"},
                {text: "封禁", color: "red"}
            ],
            columns: [
                {
                    title: "待处理用户",
                    dataIndex: "userItem",
                    render: (user) => this.renderUser(user)
                },
                {
                    title: "处理发起者",
                    dataIndex: "senderItem",
                    render: (user) => this.renderUser(user)
                },
                {
                    title: "请求状态",
                    dataIndex: "state",
                    render: (state) => this.renderState(state)
                },
                {
                    title: "说明",
                    dataIndex: "content",
                },
                {
                    title: "处理",
                    dataIndex: "state",
                    render: (state, record, index) => this.renderActions(state, index)
                }
            ],
            auditList: []
        }
    }

    componentDidMount() {
        getFetch('/audit/list', {
            userId: sessionStorage.getItem('userId')
        }, rsp => this.setState({auditList: rsp}))
    }

    renderUser(user) {
        return (
            <span onClick={() => this.props.history.push("/home/myHome/userHome/" + user.id)}>
                <Space>
                    <Avatar src={user.icon}/>
                    <a>{user.username}</a>
                </Space>
            </span>
        )
    }

    renderState(state) {
        return (<Tag color={this.state.tags[state].color}>{this.state.tags[state].text}</Tag>);
    }

    renderActions(state, row) {
        return (
            <Space>
                <Button onClick={() => this.handleAudit(row, true)}>接受</Button>
                <Button onClick={() => this.handleAudit(row, false)}>忽略</Button>
            </Space>
        )
    }

    handleAudit(row, accept) {
        if (!accept) {
            this.setState({
                writeContent: true,
                auditRow: row
            });
            return;
        }
        let auditId = this.state.auditList[row].id;
        let newArr = this.state.auditList.slice();
        newArr.splice(row, 1);
        this.setState({auditList: newArr});
        postFetch('/audit/process', {
            senderId: sessionStorage.getItem('userId'),
            auditId: auditId,
            accept: true,
            content: ""
        }, () => {
        });
    }

    responseAudit = (content) => {
        let auditId = this.state.auditList[this.state.auditRow].id;
        let newArr = this.state.auditList.slice();
        newArr.splice(this.state.auditRow, 1);
        this.setState({
            auditList: newArr,
            writeContent: false,
        });
        postFetch('/audit/process', {
            senderId: sessionStorage.getItem('userId'),
            auditId: auditId,
            accept: false,
            content: content
        }, () => {
        })
    };

    render() {
        return (
            <div>
                <ContentEditor visible={this.state.writeContent} submit={this.responseAudit}
                               cancel={() => this.setState({writeContent: false})}/>
                <Table dataSource={this.state.auditList} columns={this.state.columns}/>
            </div>
        )
    }
}
