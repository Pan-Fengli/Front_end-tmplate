import React from 'react';
import "./DiscussDetailPage.css"
import DiscussComment from "../Components/DiscussComment";
import {Col, List, Row} from "antd";
import CommentEditor from "../Components/CommentEditor";
import {formatTime} from "../Functions/timeMinus";
import makeURL from "../Functions/makeURL";
import DiscussTitle from "../Components/DiscussTitle";
import {dislike, like} from "../Functions/Like";

export default class DiscussDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            discuss: null,
            commentList: null,
            writeComment: false,
            pageIndex: 0,
            pageSize: 5,
            userId: sessionStorage.getItem('userId')
        };
        const params1 = {
            discussId: props.location.state.discussId,
            userId: this.state.userId
        };
        let url1 = "http://localhost:8080/discuss/one";
        url1 = makeURL(url1, params1);
        fetch(url1.href, {
            method: "GET"
        }).then(rsp => rsp.json().then(rsp => {
            this.setState({
                discuss: rsp,
            });
            this.pageChange(1)
        }));
    }

    commentNow() {
        this.setState({writeComment: !this.state.writeComment});
    }

    pageChange(cur) {
        this.setState({pageIndex: cur - 1});
        const params2 = {
            userId: this.state.userId,
            discussId: this.state.discuss.id,
            pageSize: this.state.pageSize,
            pageIndex: cur - 1,
        };
        let url2 = 'http://localhost:8080/comment/list';
        url2 = makeURL(url2, params2);
        fetch(url2.href, {
            method: "GET",
        }).then(rsp => rsp.json().then(rsp => {
            this.setState({
                commentList: rsp,
            });
        }));
    }

    deleteComment(index) {
        let deleteId = this.state.commentList[index].id;
        let newArr = this.state.commentList.slice();
        newArr.splice(index, 1);
        this.setState({commentList: newArr});
        let url = "http://localhost:8080/comment/one";
        url = makeURL(url);
        fetch(url.href, {
            method: "DELETE",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentId: deleteId,
                userId: this.state.userId
            })
        }).then(() => {
            let prevN = this.state.discuss.commentNum;
            this.setState({discuss: {...this.state.discuss, commentNum: prevN - 1}});
        })
    }

    setCommentInList(comment, index) {
        let newArr = this.state.commentList.slice();
        newArr[index] = comment;
        this.setState({commentList: newArr});
    }

    likeComment = (index) => {
        let comment = this.state.commentList[index];
        like(comment);
        this.setCommentInList(comment, index);
        let url = "http://localhost:8080/comment/like";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                commentId: comment.id,
                userId: this.state.userId,
                isLike: true,
            })
        })
    };

    disLikeComment = (index) => {
        let comment = this.state.commentList[index];
        dislike(comment);
        this.setCommentInList(comment, index);
        let url = "http://localhost:8080/comment/like";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                commentId: comment.id,
                userId: this.state.userId,
                isLike: false,
            })
        })
    };

    addComment = (contentHTML) => {
        let url = "http://localhost:8080/comment/one";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                discussId: this.props.location.state.discussId,
                userId: this.state.userId,
                content: contentHTML
            })
        }).then(rsp => {
            rsp.json().then(rsp => {
                if (rsp.code === 0) {
                    return;
                }
                let id = rsp.code;
                let prevN = this.state.discuss.commentNum;
                this.setState({
                    commentList: [{
                        id: id,
                        content: contentHTML,
                        user: {
                            icon: sessionStorage.getItem('userIcon'),
                            username: sessionStorage.getItem('userName'),
                            id: this.state.userId
                        },
                        likeNum: 0,
                        dislikeNum: 0,
                        starN: 0,
                        hasLike: false,
                        hasDislike: false,
                        time: formatTime(),
                        replyNum: 0,
                    }, ...this.state.commentList],
                    writeComment: false,
                    discuss: {...this.state.discuss, commentNum: prevN + 1},
                });
            })
        });
    };

    render() {
        return (
            <Row>
                <Col span={19}>
                    <div>
                        {this.state.discuss === null ? <div>is loading</div> :
                            <DiscussTitle discuss={this.state.discuss} writeComment={this.state.writeComment}
                                          commentNow={() => this.commentNow()}/>
                        }
                    </div>
                    {
                        this.state.commentList === null ? <div>is loading</div> :
                            <div>
                                {this.state.writeComment ? <CommentEditor addComment={this.addComment}/> : <></>}
                                <span>共{this.state.discuss.commentNum}条评论</span>
                                <List itemLayout="vertical" size="large"
                                      pagination={{
                                          pageSize: this.state.pageSize,
                                          total: this.state.discuss.commentNum,
                                          onChange: (cur) => this.pageChange(cur)
                                      }}
                                      dataSource={this.state.commentList}
                                      footer={<div><b>淘兴趣</b></div>}
                                      renderItem={(item, index) => (
                                          <DiscussComment comment={item}
                                                          deleteComment={(index) => this.deleteComment(index)}
                                                          index={index} like={this.likeComment}
                                                          disLike={this.disLikeComment}/>

                                      )}
                                />
                            </div>
                    }
                </Col>
                <Col span={5}>
                </Col>
            </Row>
        );
    }
}
