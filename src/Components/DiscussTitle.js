import React from 'react';
import "./DiscussTitle.css"
import {Button, Space, Tooltip} from "antd";
import IconText from "./IconText";
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import {dislike, like, star} from "../Functions/Like";

export default class DiscussTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag1: false,
            flag2: false,
            flag3: false,
            prevPageOffset: 0,
            discuss: props.discuss,
            userId: sessionStorage.getItem('userId')
        };
    }

    // componentDidMount() {
    //     window.addEventListener('scroll', this.listenScroll)
    // }
    //
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.listenScroll);
    // }
    //
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

    likeDiscuss() {
        let discuss = this.state.discuss;
        like(discuss);
        this.setState({discuss: discuss});
        let url = "http://localhost:8080/discuss/like";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: this.state.userId,
                discussId: discuss.id,
                isLike: true
            })
        })
    }

    dislikeDiscuss() {
        let discuss = this.state.discuss;
        dislike(discuss);
        this.setState({discuss: discuss});
        let url = "http://localhost:8080/discuss/like";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: this.state.userId,
                discussId: discuss.id,
                isLike: false
            })
        })
    }

    starDiscuss() {
        let discuss = this.state.discuss;
        star(discuss);
        this.setState({discuss: discuss});
        let url = "http://localhost:8080/discuss/star";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: this.state.userId,
                discussId: discuss.id,
            })
        })
    }

    render() {
        let discuss = this.state.discuss;
        if (discuss == null) {
            return (<div>loading</div>);
        }
        return (
            <div>
                {/*{this.state.flag1 ?*/}
                {/*    <div*/}
                {/*        className={"fixTitle title" + ((this.state.flag1 && (!this.state.flag2 || this.state.flag3)) ? " wideTitle" : " narrowTitle")}>*/}
                {/*        <span className="title">{this.state.discuss.title}</span>*/}
                {/*        {this.state.flag3 ? <span className="fixBtn">*/}
                {/*                    <Button>关注讨论</Button>*/}
                {/*                    <Button*/}
                {/*                        onClick={() => this.props.commentNow()}>{this.props.writeComment ? '取消' : '写'}评论</Button>*/}
                {/*                </span> : <span/>}*/}
                {/*    </div>*/}
                {/*    : <div/>}*/}
                <Space id="tabBar">
                    {this.state.discuss.tabItemList.map(tab =>
                        <Button key={tab.id} type="primary">{tab.name}</Button>
                    )}
                </Space>
                <div className="title" id="title">
                    <span className="title">{this.state.discuss.title}</span>
                </div>
                <div id="detail" className="detail">
                    {<div dangerouslySetInnerHTML={{__html: this.state.discuss.content}}/>}
                </div>
                <div className={"rightItem"} id="titleBtn">
                    <Space>
                        <span>
                            <Tooltip title="点赞">
                                <IconText icon={discuss.hasLike ? LikeFilled : LikeOutlined}
                                          clickFunc={() => this.likeDiscuss()}
                                          text={discuss.likeNum}/>
                            </Tooltip>
                        </span>
                        <span>
                            <Tooltip title="点踩">
                                <IconText icon={discuss.hasDislike ? DislikeFilled : DislikeOutlined}
                                          clickFunc={() => this.dislikeDiscuss()}
                                          text={discuss.dislikeNum}/>
                            </Tooltip>
                        </span>
                        <span>
                            <Tooltip title="收藏">
                                <IconText icon={discuss.hasStar ? StarFilled : StarOutlined}
                                          clickFunc={() => this.starDiscuss()}
                                          text={discuss.starNum}/>
                            </Tooltip>
                        </span>
                        <span onClick={() => this.props.commentNow()}>{this.props.writeComment ? '取消' : '写'}评论</span>
                    </Space>
                </div>
            </div>
        );
    }
}
