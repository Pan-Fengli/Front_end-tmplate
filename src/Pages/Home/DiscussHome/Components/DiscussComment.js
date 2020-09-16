import React from 'react';
import 'antd/dist/antd.css';
import timeMinus, {formatTime} from "../../../../Functions/timeMinus";
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import IconText from "../../../../Components/IconText";
import {Avatar, Comment, List, Tooltip} from "antd";
import ReplyEditor from "./ReplyEditor";
import DiscussReply from "./DiscussReply";
import {deleteFetch, getFetch, postFetch} from "../../../../Functions/fetchRequest";
import UserName from "./UserName";

export default class DiscussComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userRoot: parseInt(sessionStorage.getItem('userRoot')),
            showReplies: false,
            replyList: [],
            writeReply: false,
            pageIndex: 0,
            pageSize: 5,
            deltaReplyNum: 0
        };
    }

    pageChange(curPageIndex) {
        this.setState({pageIndex: curPageIndex});
        getFetch('/reply/some', {
            commentId: this.props.comment.id,
            pageIndex: curPageIndex,
            pageSize: this.state.pageSize,
        }, rsp => this.setState({replyList: rsp}));
    }

    showReplies() {
        if (this.state.showReplies) {
            this.setState({
                showReplies: false,
                pageIndex: 0,
                replyList: []
            })
        } else {
            this.pageChange(0);
            this.setState({
                showReplies: true
            })
        }
    }

    replyNow() {
        this.setState({writeReply: !this.state.writeReply});
    }

    addReply = (content, toReply) => {
        this.showReplies();
        postFetch('/reply/one', {
            commentId: this.props.comment.id,
            toReplyId: toReply === null ? null : toReply.id,
            userId: sessionStorage.getItem('userId'),
            content: content
        }, rsp => {
            let newComment = {
                id: rsp,
                user: {
                    id: sessionStorage.getItem('userId'),
                    username: sessionStorage.getItem('userName'),
                    icon: sessionStorage.getItem('userIcon')
                },
                toReply: toReply,
                time: formatTime(),
                content: content
            };
            this.setState({
                replyList: [newComment].concat(this.state.replyList),
                writeReply: false,
                showReplies: true,
                deltaReplyNum: this.state.deltaReplyNum + 1
            });
        });
    };

    deleteReply(index) {
        let deleteId = this.state.replyList[index].id;
        let newArr = this.state.replyList.slice();
        newArr.splice(index, 1);
        if (this.state.replyList.length === 0) {
            this.pageChange(this.state.pageIndex);
        }
        this.setState({replyList: newArr});
        deleteFetch('/reply/one', {
            userId: sessionStorage.getItem('userId'),
            replyId: deleteId
        }, () => this.setState({deltaReplyNum: this.state.deltaReplyNum - 1}));
    }

    render() {
        let comment = this.props.comment;
        const actions = [
            <span key="comment-basic-like" data-cy={'likeComment'}>
                  <Tooltip title="点赞">
                      <IconText icon={comment.hasLike ? LikeFilled : LikeOutlined}
                                clickFunc={() => this.props.like(this.props.index, true)}
                                text={comment.likeNum} id={"like_comment"}/>
                  </Tooltip>
            </span>,
            <span key="comment-basic-dislike" data-cy={'dislikeComment'}>
                <Tooltip title="点踩">
                    <IconText icon={comment.hasDislike ? DislikeFilled : DislikeOutlined}
                              clickFunc={() => this.props.like(this.props.index, false)}
                              text={comment.dislikeNum} id={"dislike_comment"}/>
                    </Tooltip>
            </span>,
            (parseInt(sessionStorage.getItem('userState')) === 0 &&
                <span id="add_reply" data-cy={'addReply'} onClick={() => this.replyNow()}>回复</span>),
            <span key="comment-basic-splay-reply" id="show_replies" data-cy={'showReplies'}
                  onClick={() => this.showReplies()}>{this.state.showReplies ? '收起' : this.props.comment.replyNum + this.state.deltaReplyNum + '条'}回复</span>,
            (parseInt(sessionStorage.getItem('userId')) === this.props.comment.user.id || parseInt(sessionStorage.getItem('userRoot')) !== 0) &&
            <span id="delete_comment" key="comment-basic-delete" data-cy={'deleteComment'} onClick={() =>
                this.props.deleteComment(this.props.index)}>删除
            </span>
        ];
        return (
            <div data-cy={'discussComment'}>
                <Comment
                    actions={actions}
                    author={<UserName user={comment.user} history={this.props.history}/>}
                    avatar={<Avatar src={comment.user.icon} alt="没有头像"/>}
                    content={<div dangerouslySetInnerHTML={{__html: comment.content}}/>}
                    datetime={
                        <Tooltip title={timeMinus(comment.time)}>
                            <span>{timeMinus(comment.time)}</span>
                        </Tooltip>}
                >
                    {(this.state.writeReply && parseInt(sessionStorage.getItem('userState')) === 0) &&
                    <ReplyEditor id={"reply_editor"} addReply={this.addReply}/>}
                    {this.state.showReplies &&
                    <List itemLayout="vertical" size="large"
                          pagination={{
                              pageSize: this.state.pageSize,
                              total: comment.replyNum + this.state.deltaReplyNum,
                              onChange: (cur) => this.pageChange(cur - 1),
                          }}
                          dataSource={this.state.replyList}
                          footer={<div><b>共{comment.replyNum + this.state.deltaReplyNum}条回复</b></div>}
                          renderItem={(item, index) => (
                              <DiscussReply reply={item} addReply={this.addReply} history={this.props.history}
                                            deleteReply={(index) => this.deleteReply(index)} index={index}/>
                          )}
                    />}
                </Comment>
            </div>
        );
    }
}
