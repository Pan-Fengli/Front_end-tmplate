import React from 'react';
import {Button, Form} from "antd";
import "braft-editor/dist/index.css";
import BraftEditor from "braft-editor";

export default class CommentEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentState: null,
            submitting: false,
        };
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
        this.props.addComment(this.state.commentState.toHTML());
        this.setState({
            submitting: false,
            commentState: null,
        });
    }

    render() {
        return (
            <div>
                <Form.Item>
                    <BraftEditor value={this.state.commentState} onChange={this.stateChange}/>
                </Form.Item>
                <div style={{zIndex: "3"}}>
                    <Button htmlType="submit" onClick={() => this.onSubmit()} type="primary"
                            loading={this.state.submitting}>提交</Button>
                </div>
            </div>
        );
    }
}
