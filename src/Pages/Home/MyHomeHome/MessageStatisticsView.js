import React from "react";
import {Avatar, List} from 'antd';

class MessageStatisticsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            listData: [],
            msg: ''
        }
    }

    componentDidMount() {
        this.setContent(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setContent(nextProps.match.params.id);
    }

    setContent(id) {
        let list = [];
        if (id === 3) {//评论
            for (let i = 0; i < 23; i++) {
                list.push({
                    href: '',//跳转页面
                    title: `用户 ${i}` + (i % 2 === 0 ? `回复了你的评论` : `评论了你的讨论`),
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',//头像
                    description: '',
                    content: '讨论' + i,
                });
            }
        } else if (id === 4) {//点赞
            for (let i = 0; i < 100; i++) {
                list.push({
                    href: '',//跳转页面
                    title: `用户 ${i}点赞了你的讨论`,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',//头像
                    description: '',
                    content: '讨论' + i,
                });

            }
        } else {//关注
            for (let i = 0; i < 100; i++) {
                list.push({
                    href: '',//跳转页面
                    title: `用户 ${i}关注了你`,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',//头像
                    description: '',
                    content: ''
                });
            }
        }
        this.setState({listData: list});
    }


    render() {
        return (
            <div>
                {this.state.msg}
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={this.state.listData}
                    footer={
                        <div style={{fontSize: 16}}>
                            共<span style={{color: "red"}}>{this.state.listData.length}</span>个数据
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}/>}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default MessageStatisticsView;
