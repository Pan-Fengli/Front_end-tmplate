import React from 'react';
import "./DiscussTitle.css"
import {Avatar, Button, Modal, Space, Tooltip} from "antd";
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import {dislike, like, star} from "../../../../Functions/Like";
import {deleteFetch, postFetch} from "../../../../Functions/fetchRequest";
import IconText from "../../../../Components/IconText";
import UserName from "./UserName";

export default class DiscussTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            flag1: false,
            flag2: false,
            flag3: false,
            prevPageOffset: 0,
        };
    }

    // componentDidMount() {
    //     window.addEventListener('scroll', this.listenScroll)
    // }
    //
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.listenScroll);
    // }

    // listenScroll = () => {
    //     let curPageOffset = window.pageYOffset;
    //     let tabBarBottomOffset = document.getElementById("tabBar").getBoundingClientRect().bottom;
    //     let titleTopOffset = document.getElementById("title").getBoundingClientRect().top;
    //     let detailBottomOffset = document.getElementById("detail").getBoundingClientRect().bottom;
    //     let titleBtnTopOffset = document.getElementById("titleBtn").getBoundingClientRect().top;
    //     if (curPageOffset < this.state.prevPageOffset) { //向上滚
    //         if (tabBarBottomOffset >= 64) {
    //             this.setState({flag1: false});
    //         }
    //         if (detailBottomOffset >= 114) {
    //             this.setState({flag2: false, flag3: false})
    //         } else if (detailBottomOffset >= 64) {
    //             this.setState({flag3: false})
    //         }
    //     } else { //向下滚
    //         if (titleTopOffset <= 64) {
    //             this.setState({flag1: true});
    //         }
    //         if (titleBtnTopOffset <= 64) {
    //             this.setState({flag2: true, flag3: true})
    //         } else if (titleBtnTopOffset <= 114) {
    //             this.setState({flag2: true})
    //         }
    //     }
    //     this.setState({
    //         prevPageOffset: curPageOffset,
    //     });
    // };

    likeDiscuss(isLike) {
        let discuss = this.props.discuss;
        if (isLike) {
            like(discuss);
        } else {
            dislike(discuss)
        }
        this.setState({discuss: discuss});
        postFetch('/discuss/like', {
            userId: sessionStorage.getItem('userId'),
            discussId: discuss.id,
            isLike: isLike
        }, () => {
        })
    }

    starDiscuss() {
        let discuss = this.props.discuss;
        star(discuss);
        this.setState({discuss: discuss});
        postFetch('/discuss/star', {
            userId: sessionStorage.getItem('userId'),
            discussId: discuss.id,
        }, () => {
        });
    }

    deleteDiscuss() {
        deleteFetch('/discuss/one', {
            senderId: sessionStorage.getItem('userId'),
            discussId: this.props.discuss.id
        }, rsp => {
            this.props.history.goBack();
        });

    }

    render() {
        let discuss = this.props.discuss;
        if (discuss == null) {
            return (<div>loading</div>);
        }
        return (
            <div data-cy={'discussTitle'}>
                <div data-cy={'discussModal'}>
                    <Modal visible={this.state.showModal} onCancel={() => this.setState({showModal: false})}
                           onOk={() => this.deleteDiscuss()} title="sure to delete the discuss"/>
                </div>
                {/*{this.state.flag1 ?*/}
                {/*    <div*/}
                {/*        className={"fixTitle title" + ((this.state.flag1 && (!this.state.flag2 || this.state.flag3)) ? " wideTitle" : " narrowTitle")}>*/}
                {/*        <span className="title">{discuss.title}</span>*/}
                {/*        {this.state.flag3 ? <span className="fixBtn">*/}
                {/*                    <Button>关注讨论</Button>*/}
                {/*                    <Button*/}
                {/*                        onClick={() => this.props.commentNow()}>{this.props.writeComment ? '取消' : '写'}评论</Button>*/}
                {/*                </span> : <span/>}*/}
                {/*    </div>*/}
                {/*    : <div/>}*/}
                <Space id="tabBar">
                    {discuss.tabItemList !== undefined ? discuss.tabItemList.map(tab =>
                        <Button key={tab.id} type="primary">{tab.name}</Button>
                    ) : <></>}
                </Space>
                <div className="title" id="title">
                    <div className="title" data-cy={'title'}>{discuss.title}</div>
                </div>
                <div id="detail" className="detail">
                    {<div dangerouslySetInnerHTML={{__html: discuss.content}}/>}
                </div>
                <Space>
                    <Avatar src={discuss.user.icon}/>
                    <UserName user={discuss.user} history={this.props.history}/>
                </Space>
                <div className={"rightItem"} id="titleBtn">
                    <Space>
                        <span data-cy={'likeDiscuss'}>
                            <Tooltip title="点赞">
                            <IconText icon={discuss.hasLike ? LikeFilled : LikeOutlined}
                                      clickFunc={() => this.likeDiscuss(true)} text={discuss.likeNum}/>
                            </Tooltip>
                        </span>
                        <span data-cy={'dislikeDiscuss'}>
                            <Tooltip title="点踩">
                            <IconText icon={discuss.hasDislike ? DislikeFilled : DislikeOutlined}
                                      clickFunc={() => this.likeDiscuss(false)} text={discuss.dislikeNum}/>
                            </Tooltip>
                        </span>
                        <span data-cy={'starDiscuss'}>
                            <Tooltip title="收藏">
                            <IconText icon={discuss.hasStar ? StarFilled : StarOutlined}
                                      clickFunc={() => this.starDiscuss()} text={discuss.starNum}/>
                            </Tooltip>
                        </span>
                        {sessionStorage.getItem('userState') === '0' ? <a id="add_comment" data-cy={'addComment'}
                                                                          onClick={() => this.props.commentNow()}>{this.props.writeComment ? '取消' : '写'}评论</a> : <></>}
                        {parseInt(sessionStorage.getItem('userId')) === this.props.discuss.user.id ||
                        parseInt(sessionStorage.getItem('userRoot')) > 0 ?
                            <a data-cy={'deleteDiscuss'} onClick={() => this.setState({showModal: true})}>删除</a> : <></>}
                    </Space>
                </div>
            </div>
        );
    }
}
