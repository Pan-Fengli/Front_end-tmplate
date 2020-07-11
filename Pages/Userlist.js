import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import AdminNav from "./AdminNav";

class Userlist extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userid:"",
            username:"还是去数据库找name吧",
            state1:0,
            headers:["名称","id","邮箱","解禁/禁用"],
            data:[["Tanmay","560001","560001@qq.com","解禁"],["Tanmay","560002","560001@qq.com","禁用"]]
        }
    }
    componentWillMount() {
        let uid=this.props.match.params.uid;
        // let vid=sessionStorage.getItem("vid");
        console.log("admmin");
        this.setState({
            userid:uid,
        })
    }
    render=()=>{
        return(
            <div>
                {/*<div className="jumbotron text-center" >*/}
                {/*    <h1>这里是标题</h1>*/}
                {/*    /!*<p>重置浏览器窗口大小查看效果！</p>*!/*/}
                {/*</div>*/}
                {/*头可以共用之后的就可以构建化了——可以修改active*/}
                <div className = "container" >
                    <AdminNav state1={this.state.state1} username={this.state.username} userid={this.state.userid}/>
                    <table className="table table-striped">
                        <caption style={{fontSize:30}}>用户列表</caption>
                        <thead >
                        <tr>{
                            this.state.headers.map(function (title, idx) {
                                return <th key={idx}>{title}</th>;
                            }, this)
                        }</tr>
                        </thead>
                        {/*<thead>*/}
                        {/*<tr>*/}
                        {/*    <th>名称</th>*/}
                        {/*    <th>id</th>*/}
                        {/*    <th>邮箱</th>*/}
                        {/*    <th>解禁/禁用</th>*/}
                        {/*</tr>*/}
                        {/*</thead>*/}
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
                                                <a href={"/home/myHome/Selfhome/"+this.state.userid+"/"+vid}>{content}</a>
                                                //实际上？这里应该是传递一个id到外面然后生成页面？
                                            );
                                        };
                                        if (idx===3) {
                                            //cell=cell-0;
                                            //let forbid=cell?"解禁":"禁用";//cell=1表示被禁用，需要解禁
                                            content = (
                                                <a href="#">{content}</a>
                                                // <form>
                                                //     <input type="button"  value={forbid} onClick={this.forbide.bind(this,rowidx)}/>
                                                //     {/*<input type="text"  value={forbid}/>*/}
                                                //     {/*<input type="button"  value="+" onClick={this.plus.bind(this,rowidx)}/>*/}
                                                // </form>
                                            );
                                        }
                                        return <td key={idx} data-row={rowidx}>{content}</td>;
                                    }, this)}
                                </tr>
                            );
                        }, this)}
                        {/*<tr>*/}
                        {/*    <td><a href="/">Tanmay</a></td>*/}
                        {/*    <td>560001</td>*/}
                        {/*    <td>560001@qq.com</td>*/}
                        {/*    <td><a href="#">解禁</a></td>*/}
                        {/*</tr>*/}
                        </tbody>
                    </table>
                    <br/>
                </div>
                {/*<div className="jumbotron text-center" style={{marginBottom:0}}>*/}
                {/*    <p>底部内容</p>*/}
                {/*</div>*/}
            </div>)
            ;
    }
}
export default Userlist;
