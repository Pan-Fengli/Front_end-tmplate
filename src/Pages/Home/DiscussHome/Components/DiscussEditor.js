import React from 'react';
import {Button, Input, Modal, Select, Space} from "antd";
import "braft-editor/dist/index.css";
import BraftEditor from "braft-editor";
import {getFetch, postFetch} from "../../../../Functions/fetchRequest";

const Option = Select.Option;

export default class DiscussEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: '',
            selectedInterestIdList: [],
            interestList: [],
            searching: false,
        };
    }

    searchInterest(key) {
        getFetch('/interest/search?key=' + key, {}, (rsp) => {
            this.setState({interestList: rsp});
            this.setState({searching: false});
        });
    }

    submit() {
        let selectedInterests = this.state.selectedInterestIdList.join(',');
        postFetch('/discuss/one', {
            title: this.state.title,
            content: this.state.content,
            userId: sessionStorage.getItem("userId"),
            interests: selectedInterests
        }, (rsp) => {
            this.props.toDiscussDetail(rsp);
        });
    }

    cancel() {
        this.setState({
            content: '',
            title: '',
            selectedInterestIdList: [],
        });
        this.props.closeEditor();
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                onOk={() => this.submit()} okText={"提交"}
                onCancel={() => this.cancel()} cancelText={"取消"}
                width={1000}
            >
                <br/>
                <Space direction="vertical">
                    <div data-cy={'titleInput'}>
                        <Input addonBefore={"标题"} value={this.state.title}
                               onChange={(event) => this.setState({title: event.target.value})}/>
                    </div>
                    <Space direction="horizontal">
                        <Input id="key" placeholder={"搜索兴趣"} data-cy={'searchText'}/>
                        {this.state.searching ? <Button type="dashed" disabled={true}>搜索中</Button> :
                            <Button data-cy={'searchBtn'} type="primary" onClick={() => {
                                let key = document.getElementById("key").value;
                                this.setState({searching: true});
                                this.searchInterest(key);
                            }}>搜索</Button>}
                        <Select
                            mode="multiple"
                            style={{width: 600}}
                            placeholder="Please select interests"
                            onChange={(value) => {
                                this.setState({selectedInterestIdList: value});
                            }}
                        >
                            {this.state.interestList.map((a, i) => <Option key={i}
                                                                           value={this.state.interestList[i].id}>{this.state.interestList[i].name}</Option>)}
                        </Select>
                    </Space>
                    <BraftEditor onChange={(editorState) => this.setState(
                        {content: editorState.toHTML()})}/>
                </Space>
            </Modal>
        );
    }
}
