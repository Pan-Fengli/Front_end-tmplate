import React from 'react';

export default class UserName extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <a onClick={()=>{this.props.history.push("/home/myHome/userHome/" + this.props.user.id)}} id={'username'}>{this.props.user.username}</a>
        );
    }
}
