import React from 'react';
import 'antd/dist/antd.css';
import {Avatar, Button, Descriptions, Input, Space, Upload} from 'antd';
import {getFetch, postFetch} from "../../../Functions/fetchRequest";

class MyHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            email: "",
            phoneNumber: "",
            hometown: "",
            state: 0,
            interest: [],
            selfIntro: "",
            edit: false,
            follow: false,
            icon: "",
            newIcon: false
        }
    }

    componentWillMount() {
        getFetch("/self/Info/" + this.props.match.params.uid,
            {},
            (rsp) => {
                this.setState({
                    userName: rsp.username,
                    email: rsp.email,
                    state: rsp.isAdmin,
                    selfIntro: rsp.intro,
                    phoneNumber: rsp.phoneNumber,
                    hometown: rsp.hometown,
                    icon: rsp.icon
                })
            }
        );
        postFetch(
            "/self/checkfollow/" + sessionStorage.getItem("userId"),
            {"id": this.props.match.params.uid},
            (rsp) => {
                this.setState({follow: rsp.result});
            })
    }

    reRender() {
        getFetch("/self/Info/" + this.props.match.params.uid,
            {},
            (rsp) => {

                this.setState({
                    userName: rsp.username,
                    email: rsp.email,
                    state: rsp.isAdmin,
                    selfIntro: rsp.intro,
                    phoneNumber: rsp.phoneNumber,
                    hometown: rsp.hometown,
                    icon: rsp.icon
                })
            }
        );
    }

    followOrDisFollow(followId, isFollow) {
        postFetch(isFollow ? "/self/disFollow" : "/self/follow", {
            followId: followId,
            userId: sessionStorage.getItem("userId")
        }, (rsp) => {
            this.setState({follow: !this.state.follow})
        });
    }

    Submit() {
        let body = {
            "username": document.getElementById("name").value,
            "email": document.getElementById("email").value,
            "phoneNumber": document.getElementById("phone").value,
            "intro": document.getElementById("intro").value,
            "hometown": document.getElementById("hometown").value,
        };
        postFetch("/self/Info/" + sessionStorage.getItem("userId"), body, this.reRender.bind(this));
    }

    setIcon = (info) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({icon: reader.result, newIcon: this.state.icon});
        });
        reader.readAsDataURL(info.file.originFileObj);
    }

    postIcon = () => {
        postFetch("/user/icon", {
            icon: this.state.icon
        }, () => {
            this.setState({newIcon: false})
        });
    }

    render() {
        if (sessionStorage.getItem("userId") === this.props.match.params.uid) {
            return (
                <div>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={this.setIcon}
                    >
                        <img src={this.state.icon} alt="avatar" style={{width: '100%'}}/>
                    </Upload>
                    {this.state.newIcon && <Button onClick={this.postIcon}>上传新头像</Button>}
                    <hr/>
                    <Descriptions bordered column={3}>
                        <Descriptions.Item label="用户名">{this.state.edit ?
                            <Input id="name"
                                   defaultValue={this.state.userName}/> : this.state.userName}</Descriptions.Item>
                        <Descriptions.Item label="邮箱">{this.state.edit ?
                            <Input id="email" defaultValue={this.state.email}/> : this.state.email}</Descriptions.Item>
                        <Descriptions.Item label="手机号">{this.state.edit ?
                            <Input id="phone"
                                   defaultValue={this.state.phoneNumber}/> : this.state.phoneNumber}</Descriptions.Item>
                        <Descriptions.Item label="用户权限">{this.state.state ? "管理员" : "用户"}</Descriptions.Item>
                        <Descriptions.Item label="家乡" span={2}>{this.state.edit ?
                            <Input id="hometown"
                                   defaultValue={this.state.hometown}/> : this.state.hometown}</Descriptions.Item>
                        <Descriptions.Item label="自我介绍" span={3}>
                            {this.state.edit ?
                                <Input id="intro" defaultValue={this.state.selfIntro}/> : this.state.selfIntro}
                        </Descriptions.Item>
                    </Descriptions>
                    <hr/>
                    <Button type={this.state.edit ? "primary" : "ghost"}
                            onClick={() => {
                                if (this.state.edit) {
                                    this.Submit();
                                    this.setState({edit: false});
                                } else {
                                    this.setState({edit: true});
                                }
                            }}>{this.state.edit ? "提交修改" : "修改资料"}</Button>
                </div>);
        } else
            return (
                <div>
                    <Avatar shape="square" size={64} src={this.state.icon}/>
                    <hr/>
                    <Descriptions bordered>
                        <Descriptions.Item label="用户名">{this.state.userName}</Descriptions.Item>
                        <Descriptions.Item label="邮箱">{this.state.email}</Descriptions.Item>
                        <Descriptions.Item label="手机号">{this.state.phoneNumber}18621600626</Descriptions.Item>
                        <Descriptions.Item label="用户权限">{this.state.state ? "管理员" : "用户"}</Descriptions.Item>
                        <Descriptions.Item label="家乡" span={2}>{this.state.hometown}</Descriptions.Item>
                        <Descriptions.Item label="自我介绍" span={3}>
                            {this.state.selfIntro}
                        </Descriptions.Item>
                    </Descriptions>
                    <hr/>
                    <Space direction="horizontal">
                        <Button onClick={() => this.followOrDisFollow(this.props.match.params.uid, this.state.follow)}
                                type={this.state.follow ? "dashed" : "primary"}>
                            {this.state.follow ? "取消关注" : "关注"}
                        </Button>
                        <Button type="primary" onClick={() => {
                            this.props.history.push("/home/myHome/follow/" + this.props.match.params.uid)
                        }}>TA关注的人</Button>
                        <Button type="primary" onClick={() => {
                            this.props.history.push("/home/myHome/interest/" + this.props.match.params.uid)
                        }}>TA的兴趣</Button>
                        <Button type="primary" onClick={() => {
                            this.props.history.push("/home/myHome/discusslist/" + this.props.match.params.uid);
                        }}>TA的讨论</Button>
                    </Space>
                </div>
            );
    }
}

export default MyHome;
