import React from 'react';
import 'antd/dist/antd.css';
import {List, Skeleton} from 'antd';
import {getFetch} from "../../../Functions/fetchRequest";

class DiscussList2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        }
    }

    componentDidMount() {
        getFetch("/self/discuss?userId=" + this.props.match.params.uid, {}, (rsp) => {
            this.setState({
                data: rsp,
                loading: false,
            })
        });
    }

    toDiscuss = (discussId) => {
        this.props.history.push('/home/discuss/discussDetail/' + discussId);
    };


    render = () => {
        if (this.state.loading)
            return null;
        else {
            return <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item>
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={<a onClick={() => this.toDiscuss(item.id)}>{item.title}</a>}
                                description={item.content}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />;
        }
    }
}

export default DiscussList2;