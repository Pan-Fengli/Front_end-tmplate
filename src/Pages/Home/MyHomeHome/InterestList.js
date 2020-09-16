import React from 'react';
import 'antd/dist/antd.css';
import {List, Button, Input, Space} from 'antd';
import {Select} from 'antd';
import {getFetch, postFetch} from "../../../Functions/fetchRequest";

const {Option} = Select;

class InterestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            interestList: [],
            selectedInterestList: [],
            newInterestList: [],
            map: [],
            catchId: 0,
            isFollow: false,
            catch: false,
            idInList: 0,
        };
    }

    componentDidMount() {
        getFetch('/self/interest', {
            userId: this.props.match.params.uid
        }, rsp => {
            this.setState({
                selectedInterestList: rsp,
                newInterestList: rsp,
                loading: false,
            })
        });
    }

    submit(id, type, fun) {
        postFetch('/interest/set', {
            userId: sessionStorage.getItem("userId"),
            interestId: id,
            type: type
        }, () => {
            let a = this.state.isFollow;
            this.setState({isFollow: !a});
            fun(id);
        });
    }

    cancelInterest(id) {
        let fun = (id) => {
            let array = [];
            for (let i = 0; i < this.state.selectedInterestList.length; ++i) {
                if (this.state.selectedInterestList[i].id === id) {
                    continue;
                }
                array.push(this.state.selectedInterestList[i]);
            }
            this.setState({selectedInterestList: array});
        }
        this.submit(id, 1, fun);
    }

    addInterest(id) {
        let fun = (id) => {
            let array = this.state.selectedInterestList;
            let item = this.state.interestList[this.state.idInList];
            array.push(item);
            this.setState({selectedInterestList: array});
        }
        this.submit(id, 0, fun);
    }

    searchInterest(key) {
        getFetch('/interest/search?key=' + key, {}, (rsp) => {
            this.setState({interestList: rsp});
            this.setState({searching: false});
        });
    }

    render() {
        if (this.state.loading)
            return <div>loading</div>;
        return (
            <div>
                {this.props.match.params.uid === sessionStorage.getItem("userId") ?
                    <Space direction="horizontal"><Input id="key" placeholder={"搜索兴趣"}></Input>
                        {this.state.searching ? <Button type="dashed" disabled={true}>搜索中</Button> :
                            <Button type="primary" onClick={() => {
                                let key = document.getElementById("key").value;
                                this.setState({searching: true});
                                this.searchInterest(key);
                            }}>搜索</Button>}
                        <Select
                            style={{width: 500}}
                            placeholder="Please select interests"
                            onChange={(value, key) => {
                                let isFollow = false;
                                for (let i = 0; i < this.state.selectedInterestList.length; ++i) {
                                    if (this.state.selectedInterestList[i].id === value)
                                        isFollow = true;
                                }
                                this.setState({
                                    idInList: key.key,
                                    isFollow: isFollow,
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
                        {this.state.catch ? <Button
                                onClick={() => this.state.isFollow ? this.cancelInterest(this.state.catchId) : this.addInterest(this.state.catchId)}>{this.state.isFollow ? "移除兴趣" : "添加兴趣"}</Button> :
                            <span/>}
                    </Space> : <span/>}
                <br style={{clear: "both"}}/>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={this.state.selectedInterestList}
                    renderItem={item => (
                        <List.Item
                            actions={
                                [<Button type="primary" onClick={() => {
                                    this.props.history.push("/home/myHome/discusslist/" + item.id);
                                }}>浏览该兴趣下的讨论</Button>,
                                    (this.props.match.params.uid === sessionStorage.getItem("userId")) ?
                                        <Button type="ghost"
                                                onClick={() => this.cancelInterest(item.id)}>移除兴趣</Button> :
                                        <span></span>]
                            }
                        >
                            <List.Item.Meta title={item.name}/>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default InterestList;
