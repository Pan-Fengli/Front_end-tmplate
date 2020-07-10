import React from 'react';
import 'antd/dist/antd.css';
import {Avatar, Comment, List, Space, Tooltip} from 'antd';
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, StarFilled, StarOutlined} from '@ant-design/icons';
import moment from 'moment';
import timeMinus, {formatTime} from "../Functions/timeMinus";
import icon from '../Assets/assets/icon_test.jpg';
import DiscussReply from "./DiscussReply";
import ReplyEditor from "./ReplyEditor";


const replyList = [];
for (let i = 0; i < 1; i++) {
    replyList.push({
        id: i,
        content: `这是回复 ${i}`,
        userIcon: icon,
        userId: i,
        username: '宋人',
        time: '2020/7/9T12:00:00Z',
        toUserId: i,
        toUsername: '非洲人',
    });
}

export default class DiscussComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showReplies: false,
            replyList: replyList,
            replyNow: false,
        };
    }

    showReplies() {
        this.setState({showReplies: !this.state.showReplies});
    }

    replyNow() {
        this.setState({replyNow: !this.state.replyNow});
    }

    addReply = (userId, username, userIcon, content) => {
        this.setState({
            replyList: [{
                id: this.state.replyList[this.state.replyList.length - 1].id + 1,
                content: content,
                userIcon: userIcon,
                userId: userId,
                username: username,
                time: formatTime(),
                toUserId: this.props.comment.userId,
                toUsername: this.props.comment.username,
            }, ...this.state.replyList],
            replyNow: false
        });
    };

    addReplyReply = (reply) => {
        this.setState({
            replyList: [
                Object.assign(reply, {
                    id: this.state.replyList[this.state.replyList.length - 1].id + 1,
                    time: formatTime(),
                }), ...this.state.replyList
            ],
            replyNow: false
        })
    };

    deleteReply(index) {
        let newArr = this.state.replyList.slice();
        newArr.splice(index, 1);
        this.setState({replyList: newArr});
    }

    render() {
        let comment = this.props.comment;
        const IconText = ({icon, text, clickFunc}) => (
            <Space>
                {React.createElement(icon, {onClick: clickFunc})}
                {text}
            </Space>
        );
        const actions = [
            <span key="comment-basic-like">
                  <Tooltip title="点赞">
                      <IconText icon={comment.hasLike ? LikeFilled : LikeOutlined}
                                clickFunc={() => this.props.like(this.props.index)}
                                text={comment.likeN}/>
                  </Tooltip>
            </span>,
            <span key="comment-basic-dislike">
                <Tooltip title="点踩">
                    <IconText icon={comment.hasDisLike ? DislikeFilled : DislikeOutlined}
                              clickFunc={() => this.props.disLike(this.props.index)}
                              text={comment.disLikeN}/>
                    </Tooltip>
            </span>,
            <span key="comment-basic-star">
                <Tooltip title="收藏">
                    <IconText icon={comment.hasStar ? StarFilled : StarOutlined}
                              clickFunc={() => this.props.star(this.props.index)}
                              text={comment.starN}/>
                </Tooltip>
            </span>,
            <span key="comment-basic-splay-reply"
                  onClick={() => this.showReplies()}>{this.state.showReplies ? '收起' : this.state.replyList.length + '条'}回复</span>,
            <span key="comment-basic-reply-to"
                  onClick={() => this.replyNow()}>{this.state.replyNow ? "取消" : ""}回复</span>,
            <span key="comment-basic-delete" onClick={() =>
                this.props.deleteComment(this.props.index)}>删除</span>
        ];
        return (
            <Comment
                actions={actions}
                author={<span>{comment.username}</span>}
                avatar={<Avatar src={comment.userIcon} alt="没有头像"/>}
                content={<p>{comment.content}</p>}
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{timeMinus(comment.time)}</span>
                    </Tooltip>}
            >
                {this.state.replyNow ? <ReplyEditor addReply={this.addReply}/> : <span/>}
                {this.state.showReplies ?
                    <List itemLayout="vertical" size="large"
                          pagination={{pageSize: 10}}
                          dataSource={this.state.replyList}
                          footer={<div><b>共{this.state.replyList.length}条回复</b></div>}
                          renderItem={(item, index) => (
                              <DiscussReply reply={item} addReplyReply={this.addReplyReply}
                                            deleteReply={(index) => this.deleteReply(index)} index={index}/>
                          )}
                    /> : <></>}
            </Comment>
        )
    }
}
