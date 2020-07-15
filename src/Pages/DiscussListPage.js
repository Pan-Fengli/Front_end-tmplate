import React from "react";
import {Button, Col, Input, List, Modal, Row} from "antd";
import 'antd/dist/antd.css';
import BraftEditor from "braft-editor";
import DiscussItem from "../Components/DiscussItem";
import makeURL from "../Functions/makeURL";
import {dislike, like, star} from "../Functions/Like";

const {Search} = Input;

class DiscussListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            page: 0,
            newDiscuss: {
                title: '',
                detail: null
            },
            discussList: [],
        };
        let recommendType = sessionStorage.getItem("recommendType");
        const params = {
            userId: sessionStorage.getItem("userId")
        };
        let url = "http://localhost:8080/user/" + recommendType;
        url = makeURL(url, params);
        let listData = [];

        fetch(url.href, {method: "GET"}).then(rsp => rsp.json().then(rsp => {
            console.log("rsp", rsp);
            listData = rsp;
            this.setState({
                discussList: listData
            });
        }));
    }

    setDiscussInList(discuss, index) {
        let newArr = this.state.discussList.slice();
        newArr[index] = discuss;
        this.setState({discussList: newArr});
    }

    likeDiscuss = (index) => {
        let discuss = this.state.discussList[index];
        like(discuss);
        this.setDiscussInList(discuss, index);
        let url = "http://localhost:8080/discuss/like";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: sessionStorage.getItem('userId'),
                discussId: discuss.id,
                isLike: true
            })
        })
    };

    dislikeDiscuss = (index) => {
        let discuss = this.state.discussList[index];
        dislike(discuss);
        this.setDiscussInList(discuss, index);
        let url = "http://localhost:8080/discuss/like";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: sessionStorage.getItem('userId'),
                discussId: discuss.id,
                isLike: false
            })
        })
    };

    starDiscuss = (index) => {
        let discuss = this.state.discussList[index];
        star(discuss);
        this.setDiscussInList(discuss, index);
        let url = "http://localhost:8080/discuss/star";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: sessionStorage.getItem('userId'),
                discussId: discuss.id,
            })
        })
    };

    toDiscussDetail = (discussId) => {
        this.props.history.push({pathname: '/home/discuss/discussDetail', state: {discussId: discussId}});
    };

    submit() {
        //submit
        this.cancel();
    }

    cancel() {
        this.setState({
            newDiscuss: {
                title: '', detail: null
            },
            visible: false
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Modal
                        visible={this.state.visible}
                        onOk={() => this.submit()}
                        onCancel={() => this.cancel()}
                        width={1000}
                        okText={"提交"} cancelText={"取消"}>
                        <br/>
                        <Input addonBefore={"标题"} onChange={(text) => this.setState(
                            {newDiscuss: {name: text}, ...this.state.newDiscuss})}/>
                        <BraftEditor onChange={(state) => this.setState(
                            {newDiscuss: {...this.state.newDiscuss, detail: state}})}/>
                    </Modal>
                </div>
                <Row>
                    <Col span={1}/>
                    <Col span={19}>
                        <Search placeholder="输入关键词" onSearch={value => console.log(value)} enterButton/>
                    </Col>
                    <Col span={4}>
                        <Button onClick={() => this.setState({visible: true})}>发起讨论</Button>
                    </Col>
                </Row>
                <div>
                    <List itemLayout="vertical"
                          size="large"
                          pagination={{
                              pageSize: 15,
                          }}
                          dataSource={this.state.discussList}
                          footer={<div><b>淘兴趣</b></div>}
                          renderItem={(item, index) => (
                              <DiscussItem
                                  index={index}
                                  discuss={item}
                                  toDiscussDetail={this.toDiscussDetail}
                                  like={this.likeDiscuss}
                                  dislike={this.dislikeDiscuss}
                                  star={this.starDiscuss}
                              />
                          )}/>
                </div>
            </div>
        )
    }
}

export default (props) => <DiscussListPage {...props} key={props.location.pathname}/>
