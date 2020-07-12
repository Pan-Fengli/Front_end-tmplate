import React from 'react';
import "./DiscussDetailPage.css"
import DiscussTitle from "../Components/DiscussTitle";
import icon from "../Assets/assets/icon_test.jpg";
import DiscussComment from "../Components/DiscussComment";
import {Col, List, Row} from "antd";
import CommentEditor from "../Components/CommentEditor";
import {formatTime} from "../Functions/timeMinus";

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
        contentHTML: "<div>这是评论" + Math.floor(Math.random() * 100) + "</div>",
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
            discussTitle: discuss,
            similarDiscussList: similarDiscusses,
            commentList: commentList,
            writeComment: false,
        };
    }

    commentNow() {
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

    addComment = (userId, username, userIcon, contentHTML) => {
        this.setState({
            commentList: [{
                id: this.state.commentList[this.state.commentList.length - 1].id + 1,
                contentHTML: contentHTML,
                userIcon: userIcon,
                userId: userId,
                username: username,
                likeN: 0,
                disLikeN: 0,
                starN: 0,
                hasLike: false,
                hasDisLike: false,
                hasStar: false,
                time: formatTime()
            }, ...this.state.commentList],
            writeComment: false
        })
    };

    render() {
        return (
            <Row>
                <Col span={19}>
                    <div>
                        <DiscussTitle discuss={this.state.discussTitle} tabs={this.state.discussTitle.tabs}
                                      writeComment={this.state.writeComment}
                                      commentNow={() => this.commentNow()}
                        />
                    </div>
                    <div>
                        {this.state.writeComment ? <CommentEditor addComment={this.addComment}/> : <></>}
                        <span>共{this.state.commentList.length}条评论</span>
                        <List itemLayout="vertical" size="large"
                              pagination={{pageSize: 15}}
                              dataSource={this.state.commentList}
                              renderItem={(item, index) => (
                                  <DiscussComment comment={item}
                                                  deleteComment={(index) => this.deleteComment(index)}
                                                  index={index} like={this.likeComment}
                                                  disLike={this.disLikeComment}
                                                  star={this.starComment}/>
                              )}
                        />
                    </div>
                </Col>
                <Col span={5}>
                    这里加类似讨论链接。
                </Col>
            </Row>
        );
    }
}

