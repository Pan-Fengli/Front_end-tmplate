import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import './bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// import App from "./App";
import { Link} from "react-router-dom";
class Navigator extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userid:this.props.userid,
            username:this.props.username,
            state1:this.props.state,
            valid:this.props.valid,
            vid:this.props.vid,
        }
    }
    render=()=>{
        return(
            <div>
                <div className="media">
                    <div className="media-left">
                        <img src="logo192.png" className="media-object" style={{width:90}}/>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">{this.state.username}</h4>
                        {
                            this.state.valid===true?<a href={"/home/myHome/edit/"+this.state.userid}><sapn className="glyphicon glyphicon-pencil"/>编辑资料</a>
                                :
                                <div>
                                    <button type="button" className="btn btn-danger">关注</button>
                                    <button type="button" className="btn btn-primary">私信</button>
                                </div>
                        }
                        <p>这里可以附加一些其他信息</p>
                    </div>
                </div>
                <ul className="nav nav-tabs">
                    <li className={this.state.state1===0?"active":""}>
                        {this.state.valid===true?
                            <a href={"/home/myHome/Selfhome/"+this.state.userid+"/"+this.state.vid}>
                                <sapn className="glyphicon glyphicon-home"/>
                                我的主页
                            </a>
                            :
                            <a href={"/home/myHome/Selfhome/"+this.state.userid+"/"+this.state.vid}>
                                <sapn className="glyphicon glyphicon-home"/>
                                主页
                            </a>
                        }
                    </li>
                    {/*{*/}
                    {/*    this.state.valid===true?<li ><a href="#">*/}
                    {/*        <sapn className="glyphicon glyphicon-envelope"/>*/}
                    {/*        回复我的</a></li>*/}
                    {/*        :*/}
                    {/*        <li/>*/}
                    {/*}*/}

                            <li className={this.state.state1===2?"active":""}>
                                <a href={"/home/myHome/f/"+this.state.userid+"/"+this.state.vid}>
                                    <sapn className="glyphicon glyphicon-heart"/>
                                    可能是follow</a></li>
                    {
                        this.state.valid===true?
                            <li className={this.state.state1===3?"active":""}>
                                <a href={"/home/myHome/collection/"+this.state.userid+"/"+this.state.vid}>
                                <sapn className="glyphicon glyphicon-star"/>
                                可能是收藏</a></li>
                            :
                            <li/>
                    }

                    {/*<li><a href="#">Java</a></li>*/}
                    {/*<li><a href="#">PHP</a></li>*/}
                </ul>
                <br/>
            </div>)
            ;
    }
}
export default Navigator;
