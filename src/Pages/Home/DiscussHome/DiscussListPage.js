import React from "react";
import {Button, Col, Input, List, Row, Space, Switch} from "antd";
import 'antd/dist/antd.css';
import DiscussItem from "./Components/DiscussItem";
import {dislike, like, star} from "../../../Functions/Like";
import {getFetch, postFetch} from "../../../Functions/fetchRequest";
import DiscussEditor from "./Components/DiscussEditor";

const {Search} = Input;

export default class DiscussListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorVisible: false,
            discussList: [],
            changeSearch: true,
            searchText: '',
            isDeep: false,
            pageSize: 5,
            pageIndex: 0,
        };
    }

    componentDidMount() {
        this.getPage(0);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.type !== prevProps.match.params.type) {
            this.getPage(0);
            this.setState({
                pageIndex: 0,
                discussList: [],
            });
        }
    }

    getPage(curPageIndex) {
        getFetch('/discuss/some', {
            userId: sessionStorage.getItem('userId'),
            type: this.state.isDeep ? "deep" : this.props.match.params.type,
            searchText: this.state.searchText,
            pageSize: this.state.pageSize,
            pageIndex: curPageIndex,
        }, (rsp) => {
            this.setState({changeSearch: false});
            if (rsp.length === 0) {
                alert("no such discusses");
            } else {
                if (curPageIndex !== 0) {
                    this.setState({
                        discussList: this.state.discussList.concat(rsp),
                        pageIndex: curPageIndex
                    });
                } else {
                    this.setState({
                        discussList: rsp,
                        pageIndex: curPageIndex,
                    });
                }
            }
        });
    }

    searchTextChange(text) {
        if (this.state.searchText !== text) {
            this.setState({
                changeSearch: true
            })
        }
        this.setState({searchText: text});
    }

    toDiscussDetail(discussId) {
        this.props.history.push('/home/discuss/discussDetail/' + discussId);
    };

    getMore() {
        let curPageIndex = !this.state.changeSearch ? this.state.pageIndex + 1 : 0;
        this.getPage(curPageIndex)
    }

    likeDiscuss = (index, isLike) => {
        let discuss = this.state.discussList[index];
        if (isLike) {
            like(discuss);
        } else {
            dislike(discuss);
        }
        this.state.discussList[index] = discuss;
        this.setState({discussList: this.state.discussList});
        postFetch('/discuss/like', {
            userId: sessionStorage.getItem('userId'),
            discussId: discuss.id,
            isLike: isLike
        }, () => {
        })
    };

    starDiscuss = (index) => {
        let discuss = this.state.discussList[index];
        star(discuss);
        this.state.discussList[index] = discuss;
        this.setState({discussList: this.state.discussList});
        postFetch('/discuss/star', {
            userId: sessionStorage.getItem('userId'),
            discussId: discuss.id
        }, () => {
        });
    };

    render() {
        return (
            <div>
                <DiscussEditor visible={this.state.editorVisible}
                               toDiscussDetail={this.toDiscussDetail.bind(this)}
                               closeEditor={() => this.setState({editorVisible: false})}/>
                <Row>
                    <Col span={1}/>
                    <Col span={15} data-cy={'searchDiscuss'}>
                        <Search placeholder="输入关键词" onSearch={() => this.getPage(0)} value={this.state.searchText}
                                onChange={e => this.searchTextChange(e.target.value)} enterButton/>
                    </Col>
                    {sessionStorage.getItem('userState') === '0' ?
                        <Col span={8}>
                            <Space>
                                <Switch checkedChildren="搜索内容" unCheckedChildren="仅搜标题" defaultUnChecked
                                        checked={this.state.isDeep}
                                        onClick={() => this.setState({isDeep: !this.state.isDeep})}/>
                                <Button onClick={() => this.setState({editorVisible: true})}
                                        data-cy={'addDiscuss'}>发起讨论</Button>
                            </Space>
                        </Col> : <></>}
                </Row>
                <Row>
                    <Col span={20}>
                        <List itemLayout="vertical"
                              size="large"
                              dataSource={this.state.discussList}
                              footer={
                                  <div style={{textAlign: "center"}}>
                                      <Button onClick={() => this.getMore()}>加载更多</Button>
                                  </div>
                              }
                              renderItem={(item, index) => (
                                  <DiscussItem
                                      index={index} discuss={item} history={this.props.history}
                                      like={this.likeDiscuss} star={this.starDiscuss}
                                  />
                              )}/>
                    </Col>
                    <Col span={4}/>
                </Row>
            </div>
        )
    }
}
