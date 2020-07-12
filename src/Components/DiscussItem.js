import React from 'react';
import IconText from "./IconText";
import {Avatar, Comment, Space, Tooltip} from "antd";
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import moment from "moment";
import timeMinus from "../Functions/timeMinus";

export default class DiscussItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let discuss = this.props.discuss;
        const IconText = ({icon, text, clickFunc}) => (
            <Space>
                {React.createElement(icon, {onClick: clickFunc})}
                {text}
            </Space>
        );
        const actions = [
            <span key="comment-basic-like">
                  <Tooltip title="点赞">
                      <IconText icon={discuss.hasLike ? LikeFilled : LikeOutlined}
                                clickFunc={() => this.props.like(this.props.index)}
                                text={discuss.likeNumber}/>
                  </Tooltip>
            </span>,
            <span key="comment-basic-dislike">
                <Tooltip title="点踩">
                    <IconText icon={discuss.hasDisLike ? DislikeFilled : DislikeOutlined}
                              clickFunc={() => this.props.dislike(this.props.index)}
                              text={discuss.disLikeN}/>
                    </Tooltip>
            </span>,
            <span key="comment-basic-star">
                <Tooltip title="收藏">
                    <IconText icon={discuss.hasStar ? StarFilled : StarOutlined}
                              clickFunc={() => this.props.star(this.props.index)}
                              text={discuss.starN}/>
                </Tooltip>
            </span>,
        ];
        return (
            <div>
                <Comment
                    actions={actions}
                    avatar={<Avatar size="large" src={discuss.userIcon} alt="没有头像"/>}
                    author={<span style={{fontSize:"15px"}}>{discuss.username}</span>}
                    content={
                        <div>
                            <h4>
                                <a onClick={() => this.props.toDiscussDetail(discuss.id)}>
                                    {discuss.title}
                                </a>
                            </h4>
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
