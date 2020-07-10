import React from 'react';
import {Button, Form, Input} from "antd";

import icon from "../Assets/assets/icon_test.jpg";

const {TextArea} = Input;

export default class CommentEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentState: null,
            submitting: false,
        }
    }

    replyTextChange(e) {
        this.setState({commentState: e.target.value});
    }

    onSubmit() {
        if (this.state.commentState === null) {
            alert("input something!");
            return;
        }
        this.setState({submitting: true});
        setTimeout(() => {
            this.props.addComment(1, '现代人', icon, this.state.replyText);
            this.setState({
                submitting: false,
                replyText: "",
            });
        }, 1000);
    }


    render() {
        return (
            <>
                <Form.Item>
                    <TextArea rows={4} onChange={(e) => this.replyTextChange(e)} value={this.state.replyText}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" onClick={() => this.onSubmit()} type="primary"
                            loading={this.state.submitting}>
                        提交
                    </Button>
                </Form.Item>
            </>
        );
    }
}
