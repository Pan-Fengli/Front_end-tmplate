import React from 'react';
import IconText from "../../../../Components/IconText";
import {Avatar, Comment, Tooltip} from "antd";
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import moment from "moment";
import timeMinus from "../../../../Functions/timeMinus";
import "bootstrap/dist/css/bootstrap-theme.css"

export default class DiscussItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: parseInt(sessionStorage.getItem('userId'))
        };
    }

    toDiscussDetail(discussId) {
        this.props.history.push('/home/discuss/discussDetail/'+discussId);
    };

    render() {
        let discuss = this.props.discuss;
        let actions = [
            <span key="comment-basic-like" data-cy={'likeDiscuss'}>
                  <Tooltip title="点赞">
                      <IconText icon={discuss.hasLike ? LikeFilled : LikeOutlined}
                                clickFunc={() => this.props.like(this.props.index, true)}
                                text={discuss.likeNum}/>
                  </Tooltip>
            </span>,
            <span key="comment-basic-dislike" data-cy={'dislikeDiscuss'}>
                <Tooltip title="点踩">
                    <IconText icon={discuss.hasDislike ? DislikeFilled : DislikeOutlined}
                              clickFunc={() => this.props.like(this.props.index, false)}
                              text={discuss.dislikeNum}/>
                    </Tooltip>
            </span>,
            <span key="comment-basic-star" data-cy={'starDiscuss'}>
                <Tooltip title="收藏">
                    <IconText icon={discuss.hasStar ? StarFilled : StarOutlined}
                              clickFunc={() => this.props.star(this.props.index)}
                              text={discuss.starNum}/>
                </Tooltip>
            </span>,
            <span>
                <Tooltip>{discuss.commentNum}条评论</Tooltip>
            </span>
        ];
        return (
            <div data-cy={'discussItem'}>
                <Comment
                    actions={actions}
                    avatar={<Avatar size="large" src={discuss.user.icon} alt="没有头像"/>}
                    author={<span style={{fontSize: "15px"}}>{discuss.user.username}</span>}
                    content={
                        <div>
                            <a data-cy={'title'}
                                onClick={() => this.toDiscussDetail(discuss.id)}>{discuss.title}</a>
                            <div dangerouslySetInnerHTML={{__html: discuss.content}}/>
                        </div>
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{timeMinus(discuss.time)}</span>
                        </Tooltip>}
                />
            </div>
        );
    }
}
