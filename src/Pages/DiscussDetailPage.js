import React from 'react';
import {formatTime} from "../Functions/timeMinus";
import "./DiscussDetailPage.css"
import DiscussTitle from "../Components/DiscussTitle";
import icon from "../Assets/assets/icon_test.jpg";
import DiscussComment from "../Components/DiscussComment";
import BraftEditor from "braft-editor";
import {List} from "antd";
import 'braft-editor/dist/index.css';

const discuss = {
    id: 1,
    title: '巅峰南宋和非洲部落打一架，谁赢？',
    detail: '巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？' +
        '\'巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？\'' +
        '\'巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？\'' +
        '\'巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？\'' +
        '\'巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？\'' +
        '\'巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？巅峰南宋和非洲部落打一架，谁赢？\'',
    userId: 1,
    username: '三体人',
    intro: "我来自比邻星",
    tabs: [
        {id: 1, name: '南宋'},
        {id: 2, name: '历史'},
        {id: 3, name: '撒哈拉以南非洲'}
    ]
};

const similarDiscusses = [
    {
        id: 2,
        title: '崖山海战，为何南宋十万多人宁可跳海，也不背水一战？',
        detail: '崖山海战，为何南宋十万多人宁可跳海，也不背水一战？崖山海战，为何南宋十万多人宁可跳海，' +
            '也不背水一战？崖山海战，为何南宋十万多人宁可跳海，也不背水一战？'
    },
    {
        id: 3,
        title: '非洲为什么这么穷？',
        detail: '既然有人类的起源在非洲的说法，那么非洲的人类社会应该比其他各大洲的人类发展的时间都久，' +
            '但欧亚大陆的大部分国家都已经从奴隶社会到封建社会到现代社会，还有三次工业革命，为什么非洲到近代以来连封建社会都没进入，还是原始部落？'
    }
];

const commentList = [];
for (let i = 0; i < 10; i++) {
    commentList.push({
        id: i,
        content: `这是评论 ${Math.floor(Math.random() * 100)}`,
        userIcon: icon,
        userId: i,
        username: "非洲人",
        likeN: 3,
        disLikeN: 0,
        starN: 1,
        hasLike: false,
        hasDisLike: false,
        hasStar: false,
        time: '2020/7/8T12:00:00Z'
    })
}

export default class DiscussDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            discuss: discuss,
            similarDiscusses: similarDiscusses,
            prevOffset: 0,
            titleVisible: true,
            commentList: commentList,
            writeComment: false,
            newCommentState: null
        };
    }

    submitComment() {
        let newComment = {
            id: this.state.commentList.length + 1,
            content: this.state.newCommentState.toHTML(),
            time: formatTime()
        };
        let newUser = {
            id: this.state.commentUsers.length + 1,
            name: 'sys', intro: 'a student'
        };
        let newComments = this.state.commentList.slice();
        newComments.push(newComment);
        let newUsers = this.state.commentUsers.slice();
        newUsers.push(newUser);
        this.setState({
            commentList: newComments,
            commentUsers: newUsers,
            writeComment: false,
            newCommentState: null
        });
    }

    writeOrCancel() {
        if (this.state.writeComment) {
            this.setState({newCommentState: null});
        }
        this.setState({writeComment: !this.state.writeComment});
    }

    deleteComment(index) {
        let newArr = this.state.commentList.slice();
        newArr.splice(index, 1);
        this.setState({commentList: newArr});
    }

    setCommentInList(comment, index) {
        let newArr = this.state.commentList.slice();
        newArr[index] = comment;
        this.setState({commentList: newArr});
    }

    likeComment = (index) => {
        let comment = this.state.commentList[index];
        if (comment.hasLike) {
            comment.likeN--;
            comment.hasLike = false;
        } else {
            if (comment.hasDisLike) {
                comment.disLikeN--;
                comment.hasDisLike = false;
            }
            comment.likeN++;
            comment.hasLike = true;
        }
        this.setCommentInList(comment, index);
    };

    disLikeComment = (index) => {
        let comment = this.state.commentList[index];
        if (comment.hasDisLike) {
            comment.disLikeN--;
            comment.hasDisLike = false;
        } else {
            if (comment.hasLike) {
                comment.likeN--;
                comment.hasLike = false;
            }
            comment.disLikeN++;
            comment.hasDisLike = true;
        }
        this.setCommentInList(comment, index);
    };

    starComment = (index) => {
        let comment = this.state.commentList[index];
        if (comment.hasStar) {
            comment.starN--;
            comment.hasStar = false;
        } else {
            comment.starN++;
            comment.hasStar = true;
        }
        this.setCommentInList(comment, index);
    };

    render() {
        return (
            <div>
                <div>
                    <DiscussTitle discuss={this.state.discuss} tabs={this.state.discuss.tabs}
                                  writeComment={this.state.writeComment}
                                  flipWriteComment={() => this.setState({writeComment: !this.state.writeComment})}
                                  submitComment={() => this.submitComment()}
                                  writeOrCancel={() => this.writeOrCancel()}
                    />
                </div>
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-7">
                        <span>共{this.state.commentList.length}条评论</span>
                        {
                            this.state.writeComment ?
                                <div className="commentEditor">
                                    <BraftEditor value={this.state.newCommentState} className="commentEditor"
                                                 onChange={(editorState => this.setState({newCommentState: editorState}))}/>
                                </div> : <div/>
                        }
                        <List itemLayout="vertical" size="large"
                              pagination={{pageSize: 15}}
                              dataSource={this.state.commentList}
                              footer={<div><b>淘兴趣</b></div>}
                              renderItem={(item, index) => (
                                  <DiscussComment comment={item} deleteComment={(index) => this.deleteComment(index)}
                                                  index={index} like={this.likeComment} disLike={this.disLikeComment}
                                                  star={this.starComment}/>
                              )}
                        />
                    </div>
                    {/*<div className="col-md-3 otherContainer">*/}
                    {/*    <div className="otherItem">关于作者：*/}
                    {/*        <DiscussUserCell user={this.state.user}/>*/}
                    {/*    </div>*/}
                    {/*    <div className="otherItem similarContainer">相似讨论：*/}
                    {/*        {this.state.similarDiscusses.map(discuss =>*/}
                    {/*            <div className="similarItem" key={discuss.id}>*/}
                    {/*                <DiscussCell discuss={discuss}/>*/}
                    {/*            </div>)}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}