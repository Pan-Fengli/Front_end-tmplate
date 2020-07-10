import React from 'react';
import "./DiscussTitle.css"
import {Button} from "antd";

export default class DiscussTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag1: false,
            flag2: false,
            flag3: false,
            prevPageOffset: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => this.listenScroll())
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => this.listenScroll());
    }

    listenScroll() {
        let curPageOffset = window.pageYOffset;
        let tabBarBottomOffset = document.getElementById("tabBar").getBoundingClientRect().bottom;
        let titleTopOffset = document.getElementById("title").getBoundingClientRect().top;
        let detailBottomOffset = document.getElementById("detail").getBoundingClientRect().bottom;
        let titleBtnTopOffset = document.getElementById("titleBtn").getBoundingClientRect().top;
        if (curPageOffset < this.state.prevPageOffset) { //向上滚
            if (tabBarBottomOffset >= 64) {
                this.setState({flag1: false});
            }
            if (detailBottomOffset >= 114) {
                this.setState({flag2: false, flag3: false})
            } else if (detailBottomOffset >= 64) {
                this.setState({flag3: false})
            }
        } else { //向下滚
            if (titleTopOffset <= 64) {
                this.setState({flag1: true});
            }
            if (titleBtnTopOffset <= 64) {
                this.setState({flag2: true, flag3: true})
            } else if (titleBtnTopOffset <= 114) {
                this.setState({flag2: true})
            }
        }
        this.setState({
            prevPageOffset: curPageOffset,
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-8">
                        {this.state.flag1 ?
                            <div
                                className={"fixTitle title" + ((this.state.flag1 && (!this.state.flag2 || this.state.flag3)) ? " wideTitle" : " narrowTitle")}>
                                <span className="title">{this.props.discuss.title}</span>
                                {this.state.flag3 ? <span className="fixBtn">
                                    <Button>关注讨论</Button>
                                    <Button
                                        onClick={() => this.props.writeOrCancel()}>{this.props.writeComment ? '取消' : '写'}评论</Button>
                                </span> : <span/>}
                            </div>
                            : <div/>}
                        <div id="tabBar">
                            {this.props.tabs.map(tab =>
                                <Button key={tab.id} type="primary">{tab.name}</Button>
                            )}
                        </div>
                        <div className="title" id="title">
                            <span className="title">{this.props.discuss.title}</span>
                        </div>
                        <div id="detail" className="detail">
                            {this.props.discuss.detail}
                        </div>
                        <div className={"rightItem"} id="titleBtn">
                            <Button type="button">关注讨论</Button>
                            <Button type="button"
                                    onClick={() => this.props.writeOrCancel()}>{this.props.writeComment ? '取消' : '写'}评论
                            </Button>
                            {this.props.writeComment ?
                                <Button type="button" onClick={() => this.props.submitComment()}>提交</Button> :
                                <div/>}
                        </div>
                    </div>
                    <div className="col-md-3"/>
                </div>
            </div>
        );
    }
}
