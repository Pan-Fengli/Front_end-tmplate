import React from "react";
import {Input, Button, Form} from 'antd';
import 'antd/dist/antd.css';
import {TaobaoCircleOutlined} from '@ant-design/icons';
import './LoginPage.css';

export default class FindPWPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ""
        }
    }

    SubmitFind() {
        if (this.state.email.length != 0)
            alert("发送一封邮件到邮箱，内含验证码，暂未实现。");
    }

    GotoLogIn() {
        this.props.history.push('/');
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
                                placeholder="注册时的邮箱"
                                onChange={(e) => {
                                    this.setState({email: e.target.value})
                                }}
                            />
                        </Form.Item>
                        <Form.Item style={{maxWidth: "200px", margin: "0 auto"}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{float: "left"}}
                                onClick={() => {
                                    this.SubmitFind()
                                }}
                            >
                                确认
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