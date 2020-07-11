import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import AdminNav from "./AdminNav";

class Statistics extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userid:"",
            username:"还是去数据库找name吧",
            state1:2,
            headers:["类型","数量","时间"],
            data:[["发帖数","560001","2020-2-20"]]
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
                        <caption style={{fontSize:30}}>统计表（过去一周，更多的应该还可以数据库搜索？）</caption>
                        <thead>
                        <tr>
                            {
                                this.state.headers.map(function (title, idx) {
                                    return <th key={idx}>{title}</th>;
                                }, this)
                            }
                            {/*<th>类型</th>*/}
                            {/*<th>数量</th>*/}
                            {/*<th>时间</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {/*<tr>*/}
                        {/*    <td>发帖数</td>*/}
                        {/*    <td>560001</td>*/}
                        {/*    <td>2020-2-20</td>*/}
                        {/*</tr>*/}
                        {this.state.data.map(function (row, rowidx) {
                            return (
                                <tr key={rowidx}>{
                                    row.map(function (cell, idx) {
                                        return <td key={idx} data-row={rowidx}>{cell}</td>;
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
export default Statistics;
