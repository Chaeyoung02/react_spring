import React, {useState} from "react";
import axios from "axios";

export default function SignUp() {
    let[inputId, setInputId] = useState("");
    let[inputPw, setInputPw] = useState("");
    let[inputName, setInputName] = useState("");

 
    const handleInputId = (e) => {
        setInputId(e.target.value);                    
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }
    const handleInputName = (e) => {
        setInputName(e.target.value);

    }
    const onSubmit = () => {
         axios
            .post("http://localhost:8080/member/sign-up", {
                email: inputId,
                password:  inputPw,
                nickname: inputName,
            })
            .then((res) => {
                console.log("성공");
                console.log(res.data);
            })
         
    }

    return (

        <div>
            <div>
                <input type="text" name={inputId} required={true} value={inputId} onChange={handleInputId} placeholder="아이디"/>
                <input type="password" name={inputPw} required={true}  value={inputPw} onChange={handleInputPw} placeholder="비밀번호"/>
                <input type="text"  name={inputName} required={true} value={inputName} onChange={handleInputName} placeholder="이름"/>
            </div>
            <div>
                <button type="button" onClick={onSubmit}>가입</button>
            </div>
        </div>
    )

}