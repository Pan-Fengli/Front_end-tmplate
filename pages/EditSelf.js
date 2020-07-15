import React from 'react';
import './Edit.css'
class EditSelf extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userid:"",
            username:"通过id去数据库找到的昵称",//所谓本来的名字其实就是这个username的昵称
            state1:0,
            gender:"m",
            email:"本来的邮箱",
            hometowm:"家乡",
            intro:"",
            phoneNumber:"",
            msg:""
        }
    }
    componentWillMount() {
        let uid=this.props.match.params.uid;
        // let vid=sessionStorage.getItem("vid");
        console.log("editself");
        this.setState({
            userid:uid,
        });
        // let id=this.state.userid;
        fetch("http://localhost:8080/self/Info/"+uid,{
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
                let gender=data.gender;
                let icon=data.icon;
                document.getElementById("input1").value=name;
                document.getElementById("email").value=data.email;
                document.getElementById("hometown").value=data.hometown;
                document.getElementById("intro").value=data.intro;
                document.getElementById("phone").value=data.phoneNumber;
                // let length=data.length;
                // console.log(length);
                this.setState({
                    username:name,//
                    intro:intro,
                    gender:gender,//
                    email:data.email,//
                    icon:icon,
                    hometown:data.hometown,//
                    phoneNumber:data.phoneNumber,
                });
            })
            .catch(function (ex) {
                console.log('parsing failed', ex)
            })
    }
    // componentDidMount() {
    //     console.log("name"+this.state.username);
    //     document.getElementById("input1").value=this.state.username;
    // }

    render=()=>{
        return(
            <div>
                {/*<div className="jumbotron text-center" >*/}
                {/*    <h1>这里是标题</h1>*/}
                {/*    /!*<p>重置浏览器窗口大小查看效果！</p>*!/*/}
                {/*</div>*/}
                <h1>{this.state.username}</h1>
                <div className = "container"  id="cont">
                    {/*这里用头像*/}
                    <div class="row col-lg-8" style={{padding: 50}}>
                        <div className="media">
                            <div className="media-left">
                                <img src={this.state.icon} className="media-object" style={{width:90}}/>
                            </div>
                            <div className="media-body" style={{fontSize: 20}}>
                                <a href="#"><sapn className="glyphicon glyphicon-pencil"/>编辑头像</a>
                            </div>
                        </div>
                        <hr/>
                        <form role="form" className="col-lg-6" >
                            <label htmlFor="name" style={{fontSize: 20,padding: 20}}>昵称</label>
                            <input  type="text" id="input1" className="form-control" />
                            <label htmlFor="name" style={{fontSize: 20,padding: 20}}>性别（其实可以修改）</label>
                            <select className="form-control" id="gender">
                                <option selected={this.state.gender==="男"?"selected":""}>男</option>
                                <option selected={this.state.gender==="女"?"selected":""}>女</option>
                                {/*具体的默认值是男女还要根据实际属性来一个：？语句*/}
                            </select>
                            <label htmlFor="name" style={{fontSize: 20,padding: 20}}>家乡？要不要这个属性</label>
                            <input type="text" id="hometown" className="form-control" />
                            <label htmlFor="name" style={{fontSize: 20,padding: 20}}>邮箱</label>
                            <input type="text" id="email"  className="form-control" />
                            <label htmlFor="name" style={{fontSize: 20,padding: 20}}>电话</label>
                            <input type="text" id="phone" className="form-control" />
                            <label htmlFor="name" style={{fontSize: 20,padding: 20}}>个人介绍</label>
                            <input type="text" id="intro" className="form-control" />
                        </form>
                        {/*<button type="button" className="btn btn-primary" onClick={this.change()}>提交修改</button>*/}
                        <button type="button" className="btn btn-primary" onClick={this.change}>提交修改</button>
                    </div>

                </div>

            </div>)
            ;
    };
    // test=()=>{
    //     console.log("testtt");
    // }
    change=()=>{
        //let name=this.state.username;//
        let name=document.getElementById("input1").value;
        if(name==null)
        {
            name="";//其实讲道理这里不能是空，所以需要检查。...
        }
        console.log(name);
        let gender=document.getElementById("gender").value;//emmm其实这个，要看后端到底想怎么表达，是用中文男女还是mf。
        console.log(gender);
        let icon=this.state.icon;//先这样吧，我还没想好怎么获取头像
        let email=document.getElementById("email").value;//这里需要处理空的问题
        if(email==null)
        {
            email="";//其实讲道理这里不能是空，所以需要检查。...
        }
        let hometown=document.getElementById("hometown").value;//这里需要处理空的问题
        if(hometown==null)
        {
            hometown="";
        }
        let phoneNumber=document.getElementById("phone").value;//这里需要处理空的问题
        if(phoneNumber==null)
        {
            phoneNumber="";
        }
        let intro=document.getElementById("intro").value;//这里需要处理空的问题
        if(intro==null)
        {
            intro="";
        }
        const data={username:name,icon:icon,email:email,gender:gender,hometown:hometown,phoneNumber:phoneNumber,intro:intro};
        let id=this.state.userid;
        fetch("http://localhost:8080/self/Info/"+id,{
            method:'POST',
            mode:"cors",
            headers:{'Content-Type':'application/json'},
            referrerPolicy: 'no-referrer',
            body:JSON.stringify(data),
        })
            .then((response) =>
                response.json()
            )
            .then((data) => {
                // alert("data:" + data);
                console.log('data:',data);
                //这里应该弹出一些提示之类的然后刷新。
                alert("修改成功");
                this.setState({
                    msg:data.msg,//这里返回的就应该是ok
                });
            })
            .catch(function (ex) {
                console.log('parsing failed', ex)
            })
    };
}
export default EditSelf;
