import React from 'react';
import 'antd/dist/antd.css';
import {Avatar, Button, List, Skeleton} from 'antd';
import {getFetch, postFetch} from "../../../Functions/fetchRequest";

class Followlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        }
    }

    componentDidMount() {
        getFetch('/self/follow', {
            userId: this.props.match.params.uid,
        }, rsp => {
            this.setState({
                data: rsp,
                loading: false,
            })
        });
    }

    cancelFollow(index) {
        postFetch('/self/disFollow', {
            userId: sessionStorage.getItem("userId"),
            followId: this.state.data[index].id
        }, rsp => {
            let newArr = this.state.data;
            newArr.splice(index, 1);
            this.setState({data: newArr});
        })
    }

    render() {
        if(this.props.match.params.uid===sessionStorage.getItem("userId")){
            return <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={this.state.data}
                loading={this.state.loading}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<Button type="primary" onClick={() => {
                            this.props.history.push("/home/myHome/interest/" + item.id)
                        }}>TA的兴趣</Button>, <Button type="primary" onClick={() => {
                            this.props.history.push("/home/myHome/discuss/" + item.id);
                        }}>TA的讨论</Button>,
                            <Button type="dashed" onClick={() => {
                                this.cancelFollow(index);
                            }}>取消关注</Button>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.icon}/>
                                }
                                title={<a onClick={()=>{this.props.history.push("/home/myHome/userHome/" + item.id)}}>{item.username}</a>}
                                description={(item.intro == null) ? "暂无个人介绍" : item.intro}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />;
        }
        else{
            return <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={this.state.data}
                loading={this.state.loading}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<Button type="primary" onClick={() => {
                            this.props.history.push("/home/myHome/interest/" + item.id)
                        }}>TA的兴趣</Button>, <Button type="primary" onClick={() => {
                            this.props.history.push("/home/myHome/discuss/" + item.id);
                        }}>TA的讨论</Button>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.icon}/>
                                }
                                title={<a onClick={()=>{this.props.history.push("/home/myHome/userHome/" + item.id)}}>{item.username}</a>}
                                description={(item.intro == null) ? "暂无个人介绍" : item.intro}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />;
        }

    }
}

export default Followlist;
