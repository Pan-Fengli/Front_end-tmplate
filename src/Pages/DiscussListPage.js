import React from "react";
import {Avatar, Button, Input, List, Modal, Space, Row, Col} from "antd";
import 'antd/dist/antd.css';
import {LikeOutlined, StarOutlined} from '@ant-design/icons';
import BraftEditor from "braft-editor";
import 'braft-editor/dist/index.css';

const {Search} = Input;

const listData = [];
for (let i = 0; i < 1000; i++) {
    listData.push({
        id: i,
        title: `推荐内容 ${i}`,
        content:
            '这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容' +
            '这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容这是推荐内容' +
            '这是推荐内容这是推荐内容这是推荐内容这...',
        star: 0,
        like: 0
    });
}

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export default class DiscussListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            page: 0,
            // type: props.location.state.type,
            newDiscuss: {
                title: '',
                detail: null
            }
        };
        console.log(props)
    }

    toDiscussDetail(discussId) {
        this.props.history.push({pathname: '/discussDetail', state: {discussId: discussId}})
    }

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
                          dataSource={listData}
                          footer={<div><b>淘兴趣</b></div>}
                          renderItem={item => (
                              <List.Item
                                  key={item.id}
                                  actions={[
                                      <IconText icon={StarOutlined} text={item.star}
                                                key="list-vertical-star-o"/>,
                                      <IconText icon={LikeOutlined} text={item.like}
                                                key="list-vertical-like-o"/>,
                                  ]}
                              >
                                  <List.Item.Meta
                                      avatar={<Avatar src={item.icon}/>}
                                      title={<div onClick={() => this.toDiscussDetail(item.id)}>{item.title}</div>}
                                  />
                                  <div>{item.content}</div>
                              </List.Item>
                          )}/>
                </div>
            </div>
        )
    }
}
