import React from "react";
import {getFetch} from "../Functions/fetchRequest";
import {Button} from "antd";

export default class Interest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interests: [],
            id: this.props.id,
            loading: true,
            evolve: false
        };
    }

    componentDidMount() {
        getFetch('/interest/getChildren?id=' + this.state.id, {}, (rsp) => {
            if (this.state.id == 1)
                rsp.shift();
            this.setState({
                interests: rsp,
                loading: false
            })
        });
    }

    render() {
        if (this.state.loading)
            return (
                <div>
                    加载中
                </div>
            );
        if (this.state.id == 1)
            return (
                <div>
                    {
                        <ul>
                            {this.state.interests.map(interest =>
                                <li>
                                    {interest.name}
                                    <Interest id={interest.id}></Interest>
                                </li>
                            )}
                        </ul>
                    }
                </div>

            );
        return (
            <div>
                {
                    this.state.evolve ? <ul>
                        {this.state.interests.map(interest =>
                            <li>
                                {interest.name}
                                <Interest id={interest.id}></Interest>
                            </li>
                        )}
                    </ul> : <a onClick={() => this.setState({evolve: true})}>加载子兴趣</a>
                }
            </div>

        );
    }
}