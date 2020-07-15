import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Navigator from "./Navigator";

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
            data:[["Tanmay","1","560001@qq.com",""],["Tanmay","560002","560001@qq.com",""]]
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
    // componentDidMount() {
    //     if(this.state.vid===this.state.userid)
    //     {
    //         this.setState({
    //                 valid: true,
    //             }
    //         )
    //     }
    // }

    visit(row,event)
    {
        event.preventDefault();
        console.log(row);
        let vid=this.state.data[row][1];
        this.props.visit(vid);
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
