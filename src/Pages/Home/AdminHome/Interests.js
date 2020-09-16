import React from "react";
import {getFetch} from "../../../Functions/fetchRequest";
import Interest from "../../../Components/Interest";
import {Col, Row, Divider, Space, Input, Button, Select} from "antd";
import InterestInfo from "../../../Components/InterestInfo";

const Option = Select.Option;

export default class Interests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interestList: [],
            searching: false,
            catch: false,
            catchId: 0,
        };
    }

    searchInterest(key) {
        getFetch('/interest/search?key=' + key, {}, (rsp) => {
            this.setState({interestList: rsp});
            this.setState({searching: false});
        });
    }

    render() {
        return (
            <Row gutter={[32, 8]}>
                <Col span={12}>
                    <Divider>管理兴趣</Divider>
                    <Space direction="vertical">
                        <Space direction="horizontal">
                            <Input id="key" placeholder={"搜索兴趣"}></Input>
                            {this.state.searching ? <Button type="dashed" disabled={true}>搜索中</Button> :
                                <Button type="primary" onClick={() => {
                                    let key = document.getElementById("key").value;
                                    this.setState({searching: true});
                                    this.searchInterest(key);
                                }}>搜索</Button>}
                            <Select
                                style={{width: "150%"}}
                                placeholder="Please select interests"
                                onChange={(value) => {
                                    this.setState({
                                        catch: true,
                                        catchId: value,
                                    });
                                }}
                            >
                                {this.state.interestList.map((a, i) =>
                                    <Option key={i}
                                            value={this.state.interestList[i].id}>{this.state.interestList[i].name}
                                    </Option>)}
                            </Select>
                        </Space>
                        {this.state.catch ? <InterestInfo id={this.state.catchId}/> : <span></span>}
                    </Space>
                </Col>
                <Col span={12}>
                    <Divider>兴趣树</Divider>
                    <Interest id={1}></Interest>
                </Col>
            </Row>
        );
    }
}
