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
            username:this.props.username,//先这样吧，当作一个默认的值
            state1:this.props.state,
            valid:this.props.valid,
            vid:this.props.vid,
            intro:"",
            icon:"",
        }
    }
    componentWillMount() {
        let id=this.state.userid;
        fetch("http://localhost:8080/self/Info/"+id,{
            method:'GET',
            mode:"cors",
            headers:{'Content-Type':'application/json'},
            referrerPolicy: 'no-referrer',
            // body:JSON.stringify(data),
        })
            .then((response) =>
                response.json()
            )
            .then((data) => {
                // alert("data:" + data);
                console.log('success:',data);
                let name=data.username;
                let intro=data.intro;
                let icon=data.icon;
                // let length=data.length;
                // console.log(length);
                this.setState({
                    username:name,
                    intro:intro,
                    icon:icon,
                });
            })
            .catch(function (ex) {
                console.log('parsing failed', ex)
            })
    }

    render=()=>{
        return(
            <div>
                <div className="media">
                    <div className="media-left">
                        <img src={this.state.icon} className="media-object" style={{width:90}}/>
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
                        <p>{this.state.intro}</p>
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
