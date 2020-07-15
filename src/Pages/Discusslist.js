import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import AdminNav from "./AdminNav";

class Discusslist extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userid:"",
            username:"还是去数据库找name吧",
            state1:1,
            headers:["题目","id","兴趣tag","内容","发布时间","删除"],
            data:[["Tanmay","1233","#游戏#生活","魔兽世界...（缩略）","2020-2-20",""]],

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
                <div className="jumbotron text-center" >
                    <h1>这里是标题</h1>
                    {/*<p>重置浏览器窗口大小查看效果！</p>*/}
                </div>
                {/*头可以共用之后的就可以构建化了——可以修改active*/}
                <div className = "container" >
                    <AdminNav state1={this.state.state1} username={this.state.username} userid={this.state.userid}/>
                    <table className="table table-striped">
                        <caption style={{fontSize:30}}>讨论列表</caption>
                        <thead>
                        <tr>{
                            this.state.headers.map(function (title, idx) {
                                return <th key={idx}>{title}</th>;
                            }, this)
                        }</tr>
                        {/*<tr>*/}
                        {/*    <th>题目</th>*/}
                        {/*    <th>兴趣tag</th>*/}
                        {/*    <th>内容</th>*/}
                        {/*    <th>发布时间</th>*/}
                        {/*    <th>删除</th>*/}
                        {/*</tr>*/}
                        </thead>
                        <tbody>
                            {/*<tr>*/}
                            {/*    /!*<td><a href="#">Tanmay</a></td>*!/*/}
                            {/*    /!*<td>1233</td>*!/*/}
                            {/*    /!*<td>#游戏#生活</td>*!/*/}
                            {/*    /!*<td>魔兽世界...（缩略）</td>*!/*/}
                            {/*    /!*<td>2020-2-20</td>*!/*/}
                            {/*    /!*<td><span class="glyphicon glyphicon-trash" style={{color:"red"}}/></td>*!/*/}
                            {/*</tr>*/}
                        {this.state.data.map(function (row, rowidx) {
                            return (
                                <tr key={rowidx}>{
                                    row.map(function (cell, idx) {
                                        let content = cell;
                                        //let value=cell.toString();
                                        if (idx===0) {
                                            content = (
                                                <a href="#">{content}</a>
                                            );
                                        }
                                        if (idx===5) {
                                            content = (
                                                <span className="glyphicon glyphicon-trash" style={{color: "red"}}/>
                                            );
                                        }
                                        return <td key={idx} data-row={rowidx}>{content}</td>;
                                    }, this)}
                                </tr>
                            );
                        }, this)}
                        </tbody>
                    </table>
                    <br/>
                </div>
                <div className="jumbotron text-center" style={{marginBottom:0}}>
                    <p>底部内容</p>
                </div>
            </div>)
            ;
    }
}
export default Discusslist;
