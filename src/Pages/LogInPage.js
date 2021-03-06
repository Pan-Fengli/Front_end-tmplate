import React from "react";
import {Button, Checkbox, Form, Input} from 'antd';
import 'antd/dist/antd.css';
import {LockOutlined, TaobaoCircleOutlined, UserOutlined} from '@ant-design/icons';
import './LoginPage.css';
import {logIn} from "../Functions/login";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            PW: "",
        }
    }

    Login() {
        if (this.state.email.length > 0 && this.state.PW.length > 0) {
            logIn(this.state.email, this.state.PW, this.props.history);
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
                                id="emailInput"
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
                                id="pwInput"
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

                            <a className="login-form-forgot">
                                <span onClick={()=>this.props.history.push("/findPW")}>
                                    忘记密码
                                </span>
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                data-cy="login"
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                onClick={() => this.Login()}
                            >
                                登录
                            </Button>
                            或者 <a data-cy="goToRegister"><span
                            onClick={() => this.props.history.push("/register")}>立刻注册
                            </span>
                        </a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
