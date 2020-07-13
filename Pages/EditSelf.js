import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Edit.css'
class EditSelf extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userid:"",
            username:"通过id去数据库找到的昵称",//所谓本来的名字其实就是这个username的昵称
            state1:0,
            gender:"m",
            email:"本来的邮箱"
        }
    }
    componentWillMount() {
        let uid=this.props.match.params.uid;
        // let vid=sessionStorage.getItem("vid");
        console.log("editself");
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

                <div className = "container"  id="cont" style={{border:"dotted"}}>
                    {/*这里用头像*/}
                    <div class="row col-lg-8" style={{padding: 50}}>
                        <div className="media">
                            <div className="media-left">
                                <img src="logo192.png" className="media-object" style={{width:90}}/>
                            </div>
                            <div className="media-body" style={{fontSize: 20}}>
                                <a href="#"><sapn className="glyphicon glyphicon-pencil"/>编辑头像</a>
                            </div>
                        </div>
                        <hr/>
                        <form role="form" className="col-lg-6" >
                            <label htmlFor="name" style={{fontSize: 20,padding: 20}}>昵称</label>
                            <input type="text" className="form-control" defaultValue="本来的名字"/>
                            <label htmlFor="name" style={{fontSize: 20,padding: 20}}>性别（其实可以修改）</label>
                            <select className="form-control">
                                <option selected={this.state.gender==="m"?"selected":""}>男</option>
                                <option selected={this.state.gender==="f"?"selected":""}>女</option>
                                {/*具体的默认值是男女还要根据实际属性来一个：？语句*/}
                            </select>
                            <label htmlFor="name" style={{fontSize: 20,padding: 20}}>家乡？要不要这个属性</label>
                            <input type="text" className="form-control" defaultValue="本来的家乡"/>
                            <label htmlFor="name" style={{fontSize: 20,padding: 20}}>邮箱</label>
                            <input type="text" className="form-control" defaultValue={this.state.email}/>
                        </form>
                        <button type="button" className="btn btn-primary">提交修改</button>
                    </div>

                </div>

            </div>)
            ;
    }
}
export default EditSelf;
