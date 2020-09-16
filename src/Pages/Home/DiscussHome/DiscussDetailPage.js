import React from 'react';
import "./DiscussDetailPage.css"
import {Col, List, Row, Modal} from "antd";
import {deleteFetch, getFetch, postFetch} from "../../../Functions/fetchRequest";
import {dislike, like} from "../../../Functions/Like";
import {formatTime} from "../../../Functions/timeMinus";
import DiscussTitle from "./Components/DiscussTitle";
import CommentEditor from "./Components/CommentEditor";
import DiscussComment from "./Components/DiscussComment";

export default class DiscussDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteRow: 0,
            sureDelete: false,
            discuss: null,
            commentList: [],
            writeComment: false,
            pageIndex: 0,
            pageSize: 5,
        };
    }

    componentDidMount() {
        getFetch('/discuss/one', {
            discussId: this.props.match.params.discussId,
            userId: sessionStorage.getItem('userId')
        }, rsp => {
            this.setState({discuss: rsp});
            this.pageChange(0)
        });
    }

    pageChange(curPageIndex) {
        getFetch('/comment/some', {
            userId: sessionStorage.getItem('userId'),
            discussId: this.state.discuss.id,
            pageSize: this.state.pageSize,
            pageIndex: curPageIndex,
        }, (rsp) => {
            this.setState({
                commentList: rsp,
                pageIndex: curPageIndex
            })
        });
    }

    likeComment = (index, isLike) => {
        let comment = this.state.commentList[index];
        if (isLike) {
            like(comment);
        } else {
            dislike(comment);
        }
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.commentList[index] = comment;
        this.setState({commentList: this.state.commentList});
        postFetch('/comment/like', {
            commentId: comment.id,
            userId: sessionStorage.getItem('userId'),
            isLike: isLike,
        }, rsp => {
        });
    };

    deleteComment(index) {
        this.setState({
            deleteRow: index,
            sureDelete: true
        });
    }

    submitDelete() {
        let deleteId = this.state.commentList[this.state.deleteRow].id;
        let newArr = this.state.commentList;
        newArr.splice(this.state.deleteRow, 1);
        this.setState({commentList: newArr});
        deleteFetch('/comment/one', {
            commentId: deleteId,
            senderId: sessionStorage.getItem('userId')
        }, () => {
            let prevN = this.state.discuss.commentNum;
            this.setState({
                discuss: {...this.state.discuss, commentNum: prevN - 1},
                sureDelete: false
            });
            if (newArr.length === 0) { //只当删完了才刷新
                this.pageChange(this.state.pageIndex);
            }
        });
    }

    addComment = (contentHTML) => {
        postFetch('/comment/one', {
            discussId: this.props.match.params.discussId,
            userId: sessionStorage.getItem('userId'),
            content: contentHTML
        }, rsp => {
            let newComment = {
                id: rsp,
                content: contentHTML,
                user: {
                    icon: sessionStorage.getItem('userIcon'),
                    username: sessionStorage.getItem('userName'),
                    id: parseInt(sessionStorage.getItem('userId'))
                },
                likeNum: 0,
                dislikeNum: 0,
                starN: 0,
                hasLike: false,
                hasDislike: false,
                time: formatTime(),
                replyNum: 0,
            };
            this.setState({
                commentList: [newComment].concat(this.state.commentList),
                writeComment: false,
                discuss: {...this.state.discuss, commentNum: this.state.discuss.commentNum + 1},
            });
        });
    };

    render() {
        return (
            <div>
                <Modal visible={this.state.sureDelete}
                       onCancel={() => this.setState({sureDelete: false})}
                       onOk={() => this.submitDelete()}
                >
                    确认删除？
                </Modal>
                <Row>
                    <Col span={19}>
                        {this.state.discuss === null ? <div>is loading</div> :
                            <div>
                                <DiscussTitle discuss={this.state.discuss} writeComment={this.state.writeComment}
                                              history={this.props.history}
                                              commentNow={() => this.setState({writeComment: !this.state.writeComment})}/>
                                {this.state.writeComment && <CommentEditor addComment={this.addComment}/>}
                                <span>共{this.state.discuss.commentNum}条评论</span>
                                <List itemLayout="vertical" size="large"
                                      pagination={{
                                          pageSize: this.state.pageSize,
                                          total: this.state.discuss.commentNum,
                                          onChange: (cur) => this.pageChange(cur - 1)
                                      }}
                                      dataSource={this.state.commentList}
                                      footer={<div><b>淘兴趣</b></div>}
                                      renderItem={(item, index) => (
                                          <DiscussComment comment={item} history={this.props.history}
                                                          deleteComment={(index) => this.deleteComment(index)}
                                                          index={index}
                                                          like={this.likeComment}/>
                                      )}
                                />
                            </div>
                        }
                    </Col>
                    <Col span={5}/>
                </Row>
            </div>
        );
    }
}
