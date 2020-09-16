import React from 'react';
import TextArea from "antd/es/input/TextArea";
import {Modal} from "antd";

export default class ContentEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }
    }

    submit = () => {
        this.props.submit(this.state.content);
    };
    cancel = () => {
        this.setState({content: ""});
        this.props.cancel();
    };

    render() {
        return (
            <div>
                <Modal
                    title="Content input."
                    visible={this.props.visible}
                    onOk={this.submit}
                    onCancel={this.cancel}
                >
                    <TextArea value={this.state.content} onChange={(e) => this.setState({content: e.target.value})}/>
                </Modal>
            </div>
        )
    }
}
