import React from 'react';
import {Avatar, Comment, Tooltip} from "antd";
import moment from "moment";
import timeMinus from "../Functions/timeMinus";
import ReplyEditor from "./ReplyEditor";

export default class DiscussReply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            replyNow: false
        }
    }

    addReply = (userId, username, userIcon, content) => {
        console.log(content)
        this.props.addReplyReply({
            userId: userId,
            username: username,
            userIcon: userIcon,
            content: content,
            toUserId: this.props.reply.userId,
            toUsername: this.props.reply.username,
        });
        this.setState({replyNow: false});
    };

    replyNow() {
        this.setState({replyNow: !this.state.replyNow});
    }

    render() {
        return (
            <Comment
                author={<a>{this.props.reply.username} 回复 {this.props.reply.toUsername}</a>}
                actions={[
                    <span key="reply-basic-reply-to"
                          onClick={() => this.replyNow()}>{this.state.replyNow ? "取消" : ""}回复</span>,
                    <span key="reply-basic-delete"
                          onClick={() => this.props.deleteReply(this.props.index)}>删除</span>
                ]}
                avatar={<Avatar src={this.props.reply.userIcon} alt="没有头像"/>}
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
