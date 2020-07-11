import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Navigator from "./Navigator";
class Collectionlist extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userid:"",
            username:"通过id去数据库找到的昵称",
            state1:3,
            vid:"",
            valid:false,
            headers:["题目","id","兴趣tag","内容","发布时间","取消收藏"],
            data:[["Tanmay","1233","#游戏#生活","魔兽世界...（缩略）","2020-2-20",""]],
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
            )
        }
    }

    render=()=>{
        return(
            <div>
                {/*<div className="jumbotron text-center" >*/}
                {/*    <h1>这里是标题</h1>*/}
                {/*</div>*/}
                {/*头可以共用之后的就可以构建化了——可以修改active*/}
                <div className = "container" >
                    <Navigator username={this.state.username} userid={this.state.userid} state={this.state.state1} valid={this.state.valid} vid={this.state.vid}/>
                    {/*然后就是帖子的比如缩略内容，也可以构建化*/}
                    <br/>
                    <table className="table table-striped">
                        <caption style={{fontSize:30}}>收藏列表</caption>
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
                                            content = (
                                                <a href="#">{content}</a>
                                            );
                                        }
                                        if (idx===5) {
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
export default Collectionlist;
