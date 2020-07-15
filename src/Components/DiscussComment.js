import React from 'react';
import 'antd/dist/antd.css';
import timeMinus, {formatTime} from "../Functions/timeMinus";
import makeURL from "../Functions/makeURL";
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import IconText from "./IconText";
import {Avatar, Comment, List, Tooltip} from "antd";
import ReplyEditor from "./ReplyEditor";
import DiscussReply from "./DiscussReply";

export default class DiscussComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showReplies: false,
            replyList: [],
            writeReply: false,
            pageIndex: 0,
            pageSize: 5,
            deltaReplyNum: 0,
            userId: sessionStorage.getItem('userId')
        };
    }

    showReplies() {
        if (this.state.showReplies) {
            this.setState({
                showReplies: false,
                pageIndex: 0,
                replyList: []
            })
        } else {
            this.pageChange(1);
            this.setState({
                showReplies: true
            })
        }
    }

    pageChange(cur) {
        this.setState({pageIndex: cur - 1});
        let url = "http://localhost:8080/reply/list";
        let params = {
            commentId: this.props.comment.id,
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize,
        };
        url = makeURL(url, params);
        fetch(url.href, {
            method: "GET",
            mode: "cors",
        }).then(rsp => rsp.json().then(rsp => {
            this.setState({
                replyList: rsp
            });
        }));
    }

    replyNow() {
        this.setState({writeReply: !this.state.writeReply});
    }

    addReply = (content, toUser) => {
        if (toUser == null) {
            toUser = this.props.comment.user;
        }
        let url = "http://localhost:8080/reply/one";
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                commentId: this.props.comment.id,
                toUserId: toUser.id,
                userId: this.state.userId,
                content: content
            })
        }).then(rsp => rsp.json().then(rsp => {
            let id = rsp.code;
            let newComment = {
                id: id,
                user: {
                    id: this.state.userId,
                    username: sessionStorage.getItem('userName'),
                    icon: sessionStorage.getItem('userIcon')
                },
                toUser: toUser,
                time: formatTime(),
                content: content
            };
            let newReplyList = [newComment].concat(this.state.replyList);
            this.setState({
                replyList: newReplyList,
                writeReply: false,
                showReplies: true,
                deltaReplyNum: this.state.deltaReplyNum + 1
            });
        }));
    };

    deleteReply(index) {
        let deleteId = this.state.replyList[index].id;
        let newArr = this.state.replyList.slice();
        newArr.splice(index, 1);
        this.setState({replyList: newArr});
        let url = "http://localhost:8080/reply/one";
        fetch(url, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: this.state.userId,
                replyId: deleteId
            })
        }).then(() => {
            this.setState({
                deltaReplyNum: this.state.deltaReplyNum - 1
            })
        })
    }

    render() {
        let comment = this.props.comment;
        const actions = [
            <span key="comment-basic-like">
                  <Tooltip title="点赞">
                      <IconText icon={comment.hasLike ? LikeFilled : LikeOutlined}
                                clickFunc={() => this.props.like(this.props.index)}
                                text={comment.likeNum}/>
                  </Tooltip>
            </span>,
            <span key="comment-basic-dislike">
                <Tooltip title="点踩">
                    <IconText icon={comment.hasDislike ? DislikeFilled : DislikeOutlined}
                              clickFunc={() => this.props.disLike(this.props.index)}
                              text={comment.dislikeNum}/>
                    </Tooltip>
            </span>,
            <span key="comment-basic-splay-reply"
                  onClick={() => this.showReplies()}>{this.state.showReplies ? '收起' : this.props.comment.replyNum + this.state.deltaReplyNum + '条'}回复</span>,
            <span key="comment-basic-reply-to"
                  onClick={() => this.replyNow()}>{this.state.writeReply ? "取消" : ""}回复</span>,
            (this.state.userId === this.props.comment.user.id) ? <span key="comment-basic-delete" onClick={() =>
                this.props.deleteComment(this.props.index)}>删除</span> : <span/>
        ];
        return (
            <Comment
                actions={actions}
                author={<span>{comment.user.username}</span>}
                avatar={<Avatar src={comment.user.icon} alt="没有头像"/>}
                content={<div dangerouslySetInnerHTML={{__html: comment.content}}/>}
                datetime={
                    <Tooltip title={timeMinus(comment.time)}>
                        <span>{timeMinus(comment.time)}</span>
                    </Tooltip>}
            >
                {this.state.writeReply ? <ReplyEditor addReply={this.addReply}/> : <span/>}
                {this.state.showReplies ?
                    <List itemLayout="vertical" size="large"
                          pagination={{
                              pageSize: this.state.pageSize,
                              total: comment.replyNum + this.state.deltaReplyNum,
                              onChange: (cur) => this.pageChange(cur),
                          }}
                          dataSource={this.state.replyList}
                          footer={<div><b>共{comment.replyNum + this.state.deltaReplyNum}条回复</b></div>}
                          renderItem={(item, index) => (
                              <DiscussReply reply={item} addReply={this.addReply}
                                            deleteReply={(index) => this.deleteReply(index)} index={index}/>
                          )}
                    /> : <></>}
            </Comment>
        );
    }
}
