import React, {useState, useEffect} from "react";
import axios from 'axios';

export default function Login() {
    const [inputId, setInputId] = useState("");
    const [inputPw,setInputPw] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    /*useEffect(() => {
        if(sessionStorage.getItem("name") === null) {
            console.log("isLogin ?? :: ", isLogin);
        }else {
            setIsLogin(true);
            console.log("isLogin ?? :: ", isLogin);
        }
    });*/

   // 링크는 관련 jsx파일 생성시 동작
    /*{isLogin ? (
        <Link to={`/MyPage`} className="nav-link text-white">
            {sessionStorage.getItem("name")}
        </Link>
    ) : (
        <Link to={`/Sign`} className="Nav-link text-white">
            로그인
        </Link>
    )}*/

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }
    const onClickLogin = () => {
        console.log("click login");
        console.log("Id: ", inputId);
        console.log("Pw: ",inputPw);
        axios
            .post("/member/login", {
                email: inputId,
                password: inputPw,
            })
            .then((res) => {
                console.log("성공");
                console.log(res.data);
            })
    };

    return (
        <div className="page">
            <div>
                <input type="text" className="form-control" placeholder="email" name={inputId}
                    value={inputId} onChange={handleInputId}/>
            </div>
            <div>
                <input type="password" className="form-control" placeholder="password" name={inputPw}
                    value={inputPw} onChange={handleInputPw}/>
                <br/>
                <a href="#">회원이 아니신가요?</a>
            </div>
            <button type="button" onClick={onClickLogin}>확인</button>
        </div>
     
        
    );

}


