import React from 'react';
import {Avatar, Comment, Tooltip} from "antd";
import moment from "moment";
import timeMinus from "../Functions/timeMinus";
import ReplyEditor from "./ReplyEditor";

export default class DiscussReply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            replyNow: false,
            userId:sessionStorage.getItem('userId')
        };
        console.log(props.reply)
    }

    addReply = (content) => {
        this.props.addReply(content, this.props.reply.user);
        this.setState({replyNow: false});
    };

    replyNow() {
        this.setState({replyNow: !this.state.replyNow});
    }

    render() {
        return (
            <Comment
                author={<a>{this.props.reply.user.username} 回复 {this.props.reply.toUser.username}</a>}
                actions={[
                    <span key="reply-basic-reply-to"
                          onClick={() => this.replyNow()}>{this.state.replyNow ? "取消" : ""}回复</span>,
                    (this.props.reply.user.id === this.state.userId) ?
                        <span key="reply-basic-delete"
                              onClick={() => this.props.deleteReply(this.props.index)}>删除</span> : <span/>
                ]}
                avatar={<Avatar src={this.props.reply.user.icon} alt="没有头像"/>}
                content={this.props.reply.content}
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{timeMinus(this.props.reply.time)}</span>
                    </Tooltip>}
            >
                {this.state.replyNow ? <ReplyEditor addReply={this.addReply}/> : <></>}
            </Comment>
        );
    }
}
