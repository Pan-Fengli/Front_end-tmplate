import React from 'react';
import 'antd/dist/antd.css';
import {Avatar, Button, List, Skeleton} from 'antd';
import {getFetch} from "../../../Functions/fetchRequest";

class FollowList2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        }
    }

    componentDidMount() {
        getFetch('/self/followed', {
            userId: this.props.match.params.uid,
        }, rsp => {
            this.setState({
                data: rsp,
                loading: false,
            })
        });
    }

    render() {
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
                            title={<a onClick={() => {
                                this.props.history.push("/home/myHome/userHome/" + item.id)
                            }}>{item.username}</a>}
                            description={(item.intro == null) ? "暂无个人介绍" : item.intro}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />;

    }
}

export default FollowList2;
