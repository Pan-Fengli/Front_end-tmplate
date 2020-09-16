import React from "react";
import {getFetch, postFetch} from "../Functions/fetchRequest";
import {Card, Modal, Input} from "antd";

export default class InterestInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            fatherName: "",
            childInterests: [],
            isAdd: false,
            data: "",
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id !== prevProps.id) {
            getFetch('/interest/getOne?id=' + this.props.id, {}, (rsp) => {
                this.setState({
                    name: rsp.name,
                    fatherName: rsp.fatherName,
                });
            });
            getFetch('/interest/getChildren?id=' + this.props.id, {}, (rsp) => {
                if (this.state.id == 1)
                    rsp.shift();
                this.setState({
                    childInterests: rsp
                })
            });
        }
    }

    componentDidMount() {
        getFetch('/interest/getOne?id=' + this.props.id, {}, (rsp) => {
            this.setState({
                name: rsp.name,
                fatherName: rsp.fatherName,
            });
        });
        getFetch('/interest/getChildren?id=' + this.props.id, {}, (rsp) => {
            if (this.state.id == 1)
                rsp.shift();
            this.setState({
                childInterests: rsp
            })
        });
    }

    updateState = (e) => {
        this.setState({data: e.target.value})
    }

    submitAdd() {
        let name = document.getElementById("new").value;
        postFetch('/interest/add', {
            id: this.props.id,
            name: name,
        }, () => {
        });
        this.setState({
            data: "",
            isAdd: false,
        });
    }

    render() {
        return (
            <div>
                <Modal closable={false} visible={this.state.isAdd} onCancel={() => this.setState({isAdd: false})}
                       onOk={() => this.submitAdd()}>
                    <Input id="new" value={this.state.data} onChange={this.updateState} placeholder={"兴趣名"}></Input>
                </Modal>
                <Card title={this.state.name} extra={<a onClick={() => {
                    this.setState({isAdd: true})
                }}>添加子兴趣</a>} style={{width: 600}}>
                    <h2>父兴趣：</h2>
                    <h3>{this.state.fatherName}</h3>
                    <h2>子兴趣：</h2>
                    {this.state.childInterests.map(interest => <p>{interest.name}</p>)}
                </Card>
            </div>
        );
    }
}