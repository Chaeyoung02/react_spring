import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./style.css";

export default function SignUp() {
    let [inputId, setInputId] = useState("");
    const [isId, setIsId] = useState(false);

    let [inputPw, setInputPw] = useState("");
    const [isPw, setIsPw] = useState(false);

    let [inputName, setInputName] = useState("");
    const [isName, setIsName] = useState(false);

    let [inputBirth, setInputBirth] = useState("");
    const [isBirth, setIsBirth] = useState(false);


    const [notAllow, setNotAllow] = useState(true);

    const handleInputId = (e) => {
        setInputId(e.target.value);
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!regex.test(e.target.value)) {
            setIsId(false);
        } else {
            setIsId(true);
        }
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (regex.test(e.target.value)) {
            setIsPw(true);
        } else {
            setIsPw(false);
        }
    }

    const handleInputName = (e) => {
        setInputName(e.target.value);
        const regex = /^[가-힣]+$/;
        if (regex.test(e.target.value)) {
            setIsName(true);
        } else {
            setIsName(false);
        }
    }

    const handleInputBirth = (e) => {
        setInputBirth(e.target.value);
        const regex = /^[0-9\b]+$/;
        if (regex.test(e.target.value)) {
            setIsBirth(true);
        } else {
            setIsBirth(false);
        }
    }

    const onSubmit = () => {
        axios
            .post("http://localhost:8080/member/sign-up", {
                email: inputId,
                password: inputPw,
                nickname: inputName,
                birth: inputBirth,

            })
            .then((res) => {
                console.log("성공");
                console.log(res.data);
                window.alert("회원가입 성공");
                window.location.href = "/";
            })

    }

    useEffect(() => {
        if (isName && isPw && isId && isBirth) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [isBirth, isId, isName, isPw]);

    return (

        <div className="SignUpPage">
            <div className="SignTitle">
                <span>회원가입</span>
            </div>
            <div className="contentWrap">
                <div className="nameTitle">
                    <span>아이디</span>
                </div>

                <div className="inforInput">
                    <input type="email" classname="input" name={inputId} required={true} value={inputId} onChange={handleInputId} />
                </div>
                <div className="inputMessage">
                    {!isId && inputId.length > 0 && (
                        <div>* 올바른 이메일을 입력</div>
                    )}
                </div>
                <div className="nameTitle">
                    <span>비밀번호</span>
                </div>

                <div className="inforInput">

                    <input type="password" classname="input" name={inputPw} required={true} value={inputPw} onChange={handleInputPw} />
                </div>
                <div className="inputMessage">
                    {!isPw && inputPw.length > 0 && (
                        <div>* 영문, 숫자, 특수문자 포함 8자이상 입력</div>
                    )}
                </div>
                <div className="nameTitle">
                    <span>생년월일</span>
                </div>

                <div className="inforInput">
                    <input type="text" maxlength="6" classname="input" name={inputBirth} required={true} value={inputBirth} onChange={handleInputBirth} />
                </div>
                <div className="inputMessage">
                    {!isBirth && (inputBirth.length > 6 && inputBirth.length > 0) && (
                        <div>* 숫자로 입력(6자리)</div>
                    )}
                </div>
                <div className="nameTitle">
                    <span>이름</span>
                </div>

                <div className="inforInput">

                    <input type="text" maxlength="4" classname="input" name={inputName} required={true} value={inputName} onChange={handleInputName} />
                </div>
                <div className="inputMessage">
                    {!isName && (inputName.length > 0 && inputName.length > 4) && (
                        <div>* 2글자-4글자사이 작성</div>
                    )}
                </div>

                <div className="linkHref">
                    <Link to="/">회원이신가요?</Link>
                </div>
                <div className="buttonStyle">
                    <button disabled={notAllow} onClick={onSubmit}>가입</button>
                </div>
            </div>
        </div>
    )

}