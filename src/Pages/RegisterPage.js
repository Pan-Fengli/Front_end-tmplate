import React from "react";
import {Button, Form, Input, Select} from 'antd';
import 'antd/dist/antd.css';
import {TaobaoCircleOutlined} from '@ant-design/icons';
import {postFetch} from "../Functions/fetchRequest";
import {logIn} from "../Functions/login";

const {Option} = Select;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            style={{
                width: 70,
            }}
        >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);

export default class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            nickname: "",
            PW: "",
            pw1: "",
            pw2: "",
            phonenumber: "",
        }

    }

    GotoLogIn() {
        this.props.history.push('/login');
    }


    submitRegister() {
        if ((this.state.email.length > 0)
            && (this.state.nickname.length > 0)
            && (this.state.phonenumber.length > 0)
            && (this.state.PW.length > 0)) {
            postFetch('/user/register',
                {
                    userName: this.state.nickname,
                    email: this.state.email,
                    password: this.state.PW,
                    phoneNumber: this.state.phonenumber
                }, (rsp) => {
                    logIn(this.state.email, this.state.PW, this.props.history);
                }
            );
        }
    }

    render() {
        return (
            <div>
                <div style={{
                    maxWidth: "500px",
                    padding: "15px",
                    margin: "0 auto"
                }}>
                    <div style={{fontSize: "80px", color: "black", textAlign: "center", verticalAlign: "middle"}}>
                        <TaobaoCircleOutlined/>淘兴趣
                    </div>
                    <Form
                        style={{
                            maxWidth: "300px",
                            margin: "0 auto"
                        }}
                        name="register"
                        initialValues={{
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: '邮箱格式不规范',
                                },
                                {
                                    required: true,
                                    message: '请输入邮箱',
                                },
                            ]}
                        >
                            <Input
                                id="emailInput"
                                placeholder={"输入邮箱"}
                                onChange={(e) => {
                                    this.setState({email: e.target.value})
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                id="pw1"
                                onChange={(e) => {
                                    if (e.target.value === this.state.pw2) {
                                        this.setState({
                                            pw1: e.target.value,
                                            PW: e.target.value
                                        });
                                    } else {
                                        this.setState({
                                            pw1: e.target.value
                                        });
                                    }
                                }}
                                placeholder={"设置密码"}/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请确认密码',
                                },
                                ({getFieldValue}) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('两次输入不一致');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                id="pw2"
                                onChange={(e) => {
                                    if (e.target.value === this.state.pw1) {
                                        this.setState({
                                            pw2: e.target.value,
                                            PW: e.target.value
                                        });
                                    } else {
                                        this.setState({
                                            pw2: e.target.value
                                        });
                                    }
                                }}
                                placeholder={"确认密码"}/>
                        </Form.Item>

                        <Form.Item
                            name="nickname"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入昵称',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                id="nameInput"
                                placeholder={"设置昵称"}
                                onChange={(e) => {
                                    this.setState({nickname: e.target.value})
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号',
                                },
                            ]}
                        >
                            <Input
                                id="numberInput"
                                placeholder={"手机号码"}
                                style={{
                                    width: '100%',
                                }}
                                onChange={(e) => {
                                    this.setState({phonenumber: e.target.value})
                                }}
                            />
                        </Form.Item>

                        <Form.Item style={{maxWidth: "200px", margin: "0 auto"}}>
                            <Button
                                id="submitButton"
                                type="primary"
                                htmlType="submit"
                                style={{float: "left"}}
                                onClick={() => {
                                    this.submitRegister()
                                }}
                            >
                                注册
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{float: "right"}}
                                onClick={() => this.GotoLogIn()}
                            >
                                返回
                            </Button>

                        </Form.Item>
                    </Form>

                </div>
            </div>
        )
    }
}
