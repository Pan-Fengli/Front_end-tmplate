import React from 'react';
import {Button, Form, Input} from "antd";

const {TextArea} = Input;
export default class ReplyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            replyText: "",
            submitting: false,
        }
    }

    replyTextChange(e) {
        this.setState({replyText: e.target.value});
    }

    onSubmit() {
        if (this.state.replyText === "") {
            alert("input something!");
            return;
        }
        this.setState({submitting: true});
        this.props.addReply(this.state.replyText, null);
        this.setState({
            submitting: false,
            replyText: "",
        });
    }

    render() {
        return (
            <div data-cy={'replyEditor'}>
                <Form.Item>
                    <TextArea id="reply_input" rows={4} onChange={(e) => this.replyTextChange(e)} value={this.state.replyText}/>
                </Form.Item>
                <Form.Item>
                    <Button id="submit_button" htmlType="submit" onClick={() => this.onSubmit()} type="primary"
                            loading={this.state.submitting}>
                        提交
                    </Button>
                </Form.Item>
            </div>
        );
    }
}
