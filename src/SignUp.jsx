import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignUp() {
    let [inputId, setInputId] = useState("");
    let [inputPw, setInputPw] = useState("");
    let [inputName, setInputName] = useState("");
    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const handleInputId = (e) => {
        setInputId(e.target.value);
        /*const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(inputId)) {
            setIdValid(true);
        } else {
            setIdValid(false);
        }*/
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
        /*const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(inputPw)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }*/
    }
    const handleInputName = (e) => {
        setInputName(e.target.value);
        /*const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
        if (regex.test(inputName)) {
            setNameValid(true);
        } else {
            setNameValid(false);
        }*/

    }
    const onSubmit = () => {
        axios
            .post("http://localhost:8080/member/sign-up", {
                email: inputId,
                password: inputPw,
                nickname: inputName,

            })
            .then((res) => {
                console.log("성공");
                console.log(res.data);
                window.alert("회원가입 성공");
                window.location.href = "/";
            })

    }
    /*useEffect(() => {
        if (idValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);

    }, [idValid]);*/

    return (

        <div>
            <div>
                <input type="text" name={inputId} required={true} value={inputId} onChange={handleInputId} placeholder="아이디" />
            </div>
            <div>
                {!idValid && inputId.length > 0 && (
                    <div>올바른 이메일을 입력</div>
                )}
            </div>
            <div>
                <input type="password" name={inputPw} required={true} value={inputPw} onChange={handleInputPw} placeholder="비밀번호" />
            </div>
            <div>
                {!pwValid && inputPw.length > 0 && (
                    <div>영문, 숫자, 특수문자 포함 8자이상 입력</div>
                )}
            </div>
            <div>
                <input type="text" name={inputName} required={true} value={inputName} onChange={handleInputName} placeholder="이름" />
            </div>
            <div>
                {!nameValid && inputName.length > 3 && (
                    <div>한글로 입력</div>
                )}
            </div>
            <div>
                <Link to="/">회원이신가요?</Link>
            </div>
            <div>
                <button type="button" onClick={onSubmit}>가입</button>
            </div>

        </div>
    )

}