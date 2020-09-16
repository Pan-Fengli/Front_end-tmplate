import {postFetch} from "./fetchRequest";

export function logIn(email,password,history){
    postFetch("/login?email=" + email + "&password=" + password,{},(rsp)=>{
        let user = rsp;
        sessionStorage.setItem("userId", user.id);
        sessionStorage.setItem("userName", user.username);
        sessionStorage.setItem("userIcon", user.icon);
        sessionStorage.setItem("userRoot", user.root);
        sessionStorage.setItem("userState", user.state);
        history.push("/home");
    });
}
