import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

class AdminNav extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userid:this.props.userid,
            username:this.props.username,
            state1:this.props.state1,
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
                        <h4 className="media-heading">管理员:{this.state.username}</h4>
                        <a href={"/home/myHome/edit/"+this.state.userid}><sapn className="glyphicon glyphicon-pencil"/>编辑资料</a>
                        <p>这里可以附加一些其他信息</p>
                    </div>
                </div>
                <ul className="nav nav-tabs">
                    <li className={this.state.state1===0?"active":""}><a href={"/home/myHome/Admin/userlist/"+this.state.userid}>
                        <sapn className="	glyphicon glyphicon-user"/>
                        用户列表</a></li>
                    <li className={this.state.state1===1?"active":""}><a href={"/home/myHome/Admin/discusslist/"+this.state.userid}>
                        <sapn className="	glyphicon glyphicon-comment"/>
                        讨论列表</a></li>
                    <li className={this.state.state1===2?"active":""}><a href={"/home/myHome/Admin/statis/"+this.state.userid}>
                        <sapn className="glyphicon glyphicon-stats"/>
                        统计</a></li>
                    {/*<li><a href="#">Java</a></li>*/}
                    {/*<li><a href="#">PHP</a></li>*/}
                </ul>
                <br/>
            </div>)
            ;
    }
}
export default AdminNav;
