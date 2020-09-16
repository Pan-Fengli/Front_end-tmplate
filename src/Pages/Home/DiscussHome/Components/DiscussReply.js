import React from 'react';
import {Avatar, Comment, Tooltip} from "antd";
import moment from "moment";
import timeMinus from "../../../../Functions/timeMinus";
import ReplyEditor from "./ReplyEditor";
import UserName from "./UserName";

export default class DiscussReply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            replyNow: false,
        };
    }

    addReply = (content) => {
        this.props.addReply(content, this.props.reply);
        this.setState({replyNow: false});
    };

    replyNow() {
        this.setState({replyNow: !this.state.replyNow});
    }

    render() {
        return (
            <div id="reply" data-cy={'discussReply'}>
                <Comment
                    author={<span><UserName user={this.props.reply.user} history={this.props.history}/>
                        {this.props.reply.toReply && <span> 回复
                            <UserName user={this.props.reply.toReply.user} history={this.props.history}/></span>}
                    </span>}
                    actions={[
                        sessionStorage.getItem('userState') === '0' &&
                        <span id="reply_add" key="reply-basic-reply-to" data-cy={'addReply'}
                              onClick={() => this.replyNow()}>{this.state.replyNow && "取消"}回复</span>,
                        (this.props.reply.user.id === parseInt(sessionStorage.getItem('userId'))
                            || parseInt(sessionStorage.getItem('userRoot')) !== 0) &&
                        <span id="reply_delete" key="reply-basic-delete" data-cy={'deleteReply'}
                              onClick={() => this.props.deleteReply(this.props.index)}>删除</span>
                    ]}
                    avatar={<Avatar src={this.props.reply.user.icon} alt="没有头像"/>}
                    content={this.props.reply.content}
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{timeMinus(this.props.reply.time)}</span>
                        </Tooltip>}
                >
                    {this.state.replyNow && <ReplyEditor addReply={this.addReply}/>}
                </Comment>
            </div>
        );
    }
}
