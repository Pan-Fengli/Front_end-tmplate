import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Navigator from "./Navigator";
import {Link} from "react-router-dom";
class Followlist extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userid:"",
            username:"通过id去数据库找到的昵称",
            vid:"",
            state1:2,
            valid:false,
            headers:["名称","id","邮箱","取关"],
            data:[["Tanmay","1","560001@qq.com",""],["Tanmay","2","560001@qq.com",""]]
        }
    }
    componentWillMount() {
        let uid=this.props.match.params.uid;
        let vid=this.props.match.params.vid;
        // let vid=sessionStorage.getItem("vid");
        if(vid===uid)
        {
            this.setState({
                    valid: true,
                    userid:uid,
                    vid:vid,
                }
            )
        }
        else{
            this.setState({
                    valid: false,
                    userid:uid,
                    vid:vid,
                }
            );
            return;//return表示直接返回就不会看到下面的操作。
        }

        //去fetch到关注列表的信息
        //判断如果是valid

        fetch("http://localhost:8080/self/Follow/"+uid,{
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
                let Data=data.data;
                console.log(Data);
                let length=Data.length;
                console.log("length:"+length);//ok
                let array=new Array();
                for(let i=0;i<length;i++)
                {
                    array[i]=new Array();
                    //到这里，声明结束了。
                    //然后初始化
                    for(let j=0;j<4;j++)
                    {
                        array[i][j]="";//初始化成空，因为反正我的第四个格子也是空的
                    }
                }
                for(let i=0;i<length;i++)
                {
                    let name=Data[i].name;
                    console.log("name:"+name);
                    let id=Data[i].id;
                    let email=Data[i].email;
                    array[i][0]=name;
                    array[i][1]=id;
                    array[i][2]=email;
                }
                this.setState(
                    {
                        data:array,
                    }

                )
            })
            .catch(function (ex) {
                console.log('parsing failed', ex)
            });
    }
    render=()=>{
        return(
            <div>
                {/*<div className="jumbotron text-center" >*/}
                {/*    <h1>这里是标题 vid:{this.state.vid} uid:{this.state.userid}</h1>*/}
                {/*</div>*/}
                {/*头可以共用之后的就可以构建化了——可以修改active*/}
                <div className = "container" >
                    <Navigator username={this.state.username} userid={this.state.userid} state={this.state.state1} valid={this.state.valid} vid={this.state.vid}/>
                    {/*然后就是帖子的比如缩略内容，也可以构建化*/}
                    <br/>
                    {/*{本来这里面应该做一个判断，如果是invalid，那就不显示内容。但是这里为了debug方便。其实整合在一起之后，回到自己的入口就只用最上方导航栏的那个就可以了}*/}
                    <table className="table table-striped">
                        <caption style={{fontSize:30}}>关注列表</caption>
                        <thead>
                        <tr>{
                            this.state.headers.map(function (title, idx) {
                                return <th key={idx}>{title}</th>;
                            }, this)
                        }</tr>
                        </thead>
                        <tbody>
                        {this.state.data.map(function (row, rowidx) {
                            return (
                                <tr key={rowidx}>{
                                    row.map(function (cell, idx) {
                                        let content = cell;
                                        //let value=cell.toString();
                                        if (idx===0) {
                                            let vid=this.state.data[rowidx][1];
                                            content = (
                                                // <a href="#" onClick={this.visit.bind(this,rowidx)}>{content}</a>
                                                <a href={"/home/myHome/Selfhome/"+this.state.userid+"/"+vid}>{content}</a>
                                                // <Link to={"/"+vid }>{content}</Link>
                                            );
                                        }
                                        if (idx===3) {
                                            content = (
                                                <span className="	glyphicon glyphicon-remove" style={{color: "red"}}/>
                                            );
                                        }
                                        return <td key={idx} data-row={rowidx}>{content}</td>;
                                    }, this)}
                                </tr>
                            );
                        }, this)}
                        </tbody>
                    </table>
                </div>
                {/*<div className="jumbotron text-center" style={{marginBottom:0}}>*/}
                {/*    <p>底部内容</p>*/}
                {/*</div>*/}
            </div>)
            ;
    }
}
export default Followlist;
