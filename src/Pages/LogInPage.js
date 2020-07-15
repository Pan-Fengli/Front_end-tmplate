import React from "react";
import {Input, Space, Button, Form, Checkbox} from 'antd';
import 'antd/dist/antd.css';
import {TaobaoCircleOutlined} from '@ant-design/icons';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './LoginPage.css';
import makeURL from "../Functions/makeURL";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            PW: "",
        }
    }

    Login() {
        if (this.state.email.length > 0 && this.state.PW.length > 0) {
            const params = {
                userId: this.state.email,
                password: this.state.PW,
            };
            let url = 'http://localhost:8080/user/login';
            url = makeURL(url, params);
            console.log(url.href);
            fetch(url.href, {method: "GET"}).then(rsp => rsp.json().then(rsp => {
                if (rsp.id != 0) {
                    sessionStorage.setItem("userId", rsp.id);
                    sessionStorage.setItem("userName", rsp.username);
                    sessionStorage.setItem("userIcon", rsp.icon);
                    sessionStorage.setItem("recommendType", "recommend");
                    this.props.history.push("/home")
                }
            }))
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
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入邮箱',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                placeholder="邮箱"
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
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="密码"
                                onChange={(e) => {
                                    this.setState({PW: e.target.value})
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="/findPW">
                                忘记密码
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                onClick={() => this.Login()}
                            >
                                登录
                            </Button>
                            或者 <a href="/register">立刻注册</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
