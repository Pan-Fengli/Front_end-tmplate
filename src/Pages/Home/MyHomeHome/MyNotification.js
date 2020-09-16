import React from 'react';
import {getFetch, postFetch} from "../../../Functions/fetchRequest";
import {Avatar, Button, List} from "antd";

export default class MyNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationList: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        getFetch('/messageCenter/notifications', {
            userId: sessionStorage.getItem('userId')
        }, rsp => {
            this.setState({notificationList: rsp});
        })
    }

    hasRead(index) {
        getFetch('/messageCenter/clearNotification', {
            nId: this.state.notificationList[index].id,
            userId: sessionStorage.getItem('userId')
        }, () => {
            this.state.notificationList.splice(index, 1);
            this.setState({notificationList: this.state.notificationList});
        });
    }

    readAll() {
        getFetch('/messageCenter/clearNotifications', {
            userId: sessionStorage.getItem('userId')
        }, () => {
            this.setState({notificationList: []});
        })
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.readAll()}>全部已读</Button>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.notificationList}
                    renderItem={(item, index) => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <Button onClick={() => this.hasRead(index)}>已读</Button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.sender.icon}/>}
                                title={<span>{item.sender.username}</span>}
                                description={item.content}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
