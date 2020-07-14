import React from "react";
import {Input, Space, Button} from 'antd';
import 'antd/dist/antd.css';
import {TaobaoCircleOutlined} from '@ant-design/icons';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {
    Form,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    AutoComplete,
} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';

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
            phonenumber: "",
        }

    }

    GotoLogIn() {
        this.props.history.push('/login');
    }

    SubmitRegister() {
        let pw1 = document.getElementById("pw1").value;
        let pw2 = document.getElementById("pw2").value;
        if ((this.state.email.length > 0)
            && (this.state.nickname.length > 0)
            && (this.state.phonenumber.length > 0)
            && (pw1 > 0)
            && (pw2 > 0)
            && (pw1 === pw2)) {
            const registerURL = 'http://localhost:8080/user/register';
            fetch(registerURL, {
                method: 'POST',
                body: JSON.stringify({
                    userName: this.state.nickname,
                    email: this.state.email,
                    password: this.state.PW,
                    phoneNumber: this.state.phonenumber
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    sessionStorage.setItem("userId", json.id);
                    sessionStorage.setItem("userName", json.username);
                    sessionStorage.setItem("userIcon", json.icon);
                    this.props.history.push("/home");

                })

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
                            <Input.Password id="pw1" placeholder={"设置密码"}/>
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

                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password id="pw2" placeholder={"确认密码"}/>
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
                                addonBefore={prefixSelector}
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
                                type="primary"
                                htmlType="submit"
                                style={{float: "left"}}
                                onClick={() => {
                                    this.SubmitRegister()
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