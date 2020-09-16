import React from 'react';
import {deleteFetch, getFetch} from "../../../../Functions/fetchRequest";
import 'antd/dist/antd.css';
import {Button, DatePicker, Modal, Table} from "antd";
import UserName from "../../DiscussHome/Components/UserName";

const {RangePicker} = DatePicker;

export default class DiscussList extends React.Component {
    constructor(props) {
        super(props);
        let day1 = new Date(), day2 = new Date();
        day2.setTime(day1.getTime() - 604800000);
        this.state = {
            isDelete: false,
            deleteRow: 0,
            startTime: day2.format('Y-m-d'),
            endTime: day1.format('Y-m-d'),
            columns: [
                {
                    title: "讨论标题",
                    dataIndex: "",
                    render: item => <span onClick={() => this.toDetailItem(item)}><a>{item.title}</a></span>
                },
                {
                    title: "讨论发起者",
                    dataIndex: "user",
                    render: user => <UserName user={user} history={this.props.history}/>
                },
                {
                    title: "发起时间",
                    dataIndex: "time",
                    render: time => <span>{time.toString().slice(0, 10)}</span>
                },
                {
                    title: "点赞数",
                    dataIndex: "likeNum",
                    sorter: (a, b) => a.likeNum - b.likeNum,
                },
                {
                    title: "点踩数",
                    dataIndex: "dislikeNum",
                    sorter: (a, b) => a.dislikeNum - b.dislikeNum,
                },
                {
                    title: "收藏数",
                    dataIndex: "starNum",
                    sorter: (a, b) => a.starNum - b.starNum,
                },
                {
                    title: "处理",
                    dataIndex: "",
                    render: (item, record, index) => <Button onClick={() => this.deleteDiscuss(index)}>删除</Button>
                }
            ]
        }
    }

    componentDidMount() {
        this.fetchData(this.state.startTime, this.state.endTime);
    }

    fetchData(startTime, endTime) {
        getFetch('/admin/discussList', {
            startTime: startTime,
            endTime: endTime,
            userId: sessionStorage.getItem('userId'),
        }, rsp => {
            this.setState({discussList: rsp})
        });
    }

    deleteDiscuss(row) {
        this.setState({
            isDelete: true,
            deleteRow: row,
        })
    }

    submitDelete() {
        let newArr = this.state.discussList.slice();
        newArr.splice(this.state.deleteRow, 1);
        this.setState({
            isDelete: false,
            discussList: newArr,
        });
        let discussId = this.state.discussList[this.state.deleteRow].id;
        deleteFetch('/discuss/one', {
            senderId: sessionStorage.getItem('userId'),
            discussId: discussId,
        }, () => {
        });
    }

    toDetailItem(item) {
        this.props.history.push({pathname: "/home/discuss/discussDetail", state: {discussId: item.id}});
    }

    timeChange = (date, time) => {
        this.setState({
            startTime: time[0].slice(0, 10),
            endTime: time[1].slice(0, 10)
        });
        this.fetchData(time[0].slice(0, 10), time[1].slice(0, 10));
    };

    render() {
        return (
            <div>
                <Modal visible={this.state.isDelete} onCancel={() => this.setState({isDelete: false})}
                       onOk={() => this.submitDelete()}>
                    确认删除？
                </Modal>
                <RangePicker onChange={this.timeChange}/>
                <Table columns={this.state.columns} dataSource={this.state.discussList}/>
            </div>
        );
    }
}
