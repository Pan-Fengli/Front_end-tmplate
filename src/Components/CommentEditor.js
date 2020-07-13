import React from 'react';
import {Button, Form} from "antd";
import "braft-editor/dist/index.css";
import BraftEditor from "braft-editor";
import icon from "../Assets/assets/icon_test.jpg"

export default class CommentEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentState: null,
            submitting: false,
        }
    }

    stateChange = (editorState) => {
        this.setState({commentState: editorState});
    };

    onSubmit() {
        if (this.state.commentState === null) {
            alert("input something!");
            return;
        }
        this.setState({submitting: true});
        setTimeout(() => {
            this.props.addComment(1, '现代人', icon, this.state.commentState.toHTML());
            this.setState({
                submitting: false,
                commentState: null,
            });
        }, 1000);
    }


    render() {
        return (
            <div>
                <Form.Item style={{height: "300px"}}>
                    <BraftEditor value={this.state.commentState} onChange={this.stateChange}/>
                </Form.Item>
                <Form.Item>
                    <Button style={{zIndex:"99"}} htmlType="submit" onClick={() => this.onSubmit()} type="primary"
                            loading={this.state.submitting}>提交</Button>
                </Form.Item>
            </div>
        );
    }
}
