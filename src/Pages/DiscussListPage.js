import React from "react";
import {Button, Col, Input, List, Modal, Row} from "antd";
import 'antd/dist/antd.css';
import BraftEditor from "braft-editor";
import icon from '../Assets/assets/icon_test.jpg';
import DiscussItem from "../Components/DiscussItem";

const {Search} = Input;

const listData = [];
for (let i = 0; i < 1000; i++) {
    listData.push({
        id: i,
        title: `推荐内容 ${i}`,
        userId: 1,
        userIcon: icon,
        content:
            '这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容' +
            '这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容' +
            '这是推荐内容这是推荐内容这是推荐内容这...',
        starN: 1,
        likeNumber: 22,
        disLikeN: 2,
        hasStar: false,
        hasLike: false,
        hasDisLike: false,
        time: "2020/7/3T12:00:00Z"
    });
}


export default class DiscussListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            page: 0,
            // type: props.history.location.state.type,
            newDiscuss: {
                title: '',
                detail: null
            },
            discussList: listData
        };
    }

    setDiscussInList(discuss, index) {
        let newArr = this.state.discussList.slice();
        newArr[index] = discuss;
        this.setState({discussList: newArr});
    }

    likeDiscuss = (index) => {
        let discuss = this.state.discussList[index];
        if (discuss.hasLike) {
            discuss.likeNumber--;
            discuss.hasLike = false;
        } else {
            if (discuss.hasDisLike) {
                discuss.disLikeN--;
                discuss.hasDisLike = false;
            }
            discuss.likeNumber++;
            discuss.hasLike = true;
        }
        this.setDiscussInList(discuss, index);
    };

    dislikeDiscuss = (index) => {
        let discuss = this.state.discussList[index];
        if (discuss.hasDisLike) {
            discuss.disLikeN--;
            discuss.hasDisLike = false;
        } else {
            if (discuss.hasLike) {
                discuss.likeNumber--;
                discuss.hasLike = false;
            }
            discuss.disLikeN++;
            discuss.hasDisLike = true;
        }
        this.setDiscussInList(discuss, index);
    };

    starDiscuss = (index) => {
        let discuss = this.state.discussList[index];
        if (discuss.hasStar) {
            discuss.starN--;
            discuss.hasStar = false;
        } else {
            discuss.starN++;
            discuss.hasStar = true;
        }
        this.setDiscussInList(discuss, index);
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
