import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignUp() {
    let [inputId, setInputId] = useState("");
    const [isId, setIsId] = useState("");

    let [inputPw, setInputPw] = useState("");
    const [isPw, setIsPw] = useState("");

    let [inputName, setInputName] = useState("");
    const [isName, setIsName] = useState("");

    let [inputBirth, setInputBirth] = useState("");
    const [isBirth, setIsBirth] = useState("");

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
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        if (!regex.test(e.target.value)) {
            setIsPw(false);
        } else {
            setIsPw(true);
        }
    }

    const handleInputName = (e) => {
        setInputName(e.target.value);
        const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
        if (e.target.value != regex) {
            setIsName(false);
        } else {
            setIsName(true);
        }
    }

    const handleInputBirth = (e) => {
        setInputBirth(e.target.value);
        const regex = /[^0-9]/g;
        if (e.target.value != regex) {
            setIsBirth(false);
        } else {
            setIsBirth(true);
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
        if (isBirth && isName && isPw && isId) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [isBirth, isId, isName, isPw]);

    return (

        <div>
            <div>
                <input type="email" name={inputId} required={true} value={inputId} onChange={handleInputId} placeholder="아이디" />
            </div>
            <div>
                {!isId && inputId.length > 0 && (
                    <div>올바른 이메일을 입력</div>
                )}
            </div>
            <div>
                <input type="password" name={inputPw} required={true} value={inputPw} onChange={handleInputPw} placeholder="비밀번호" />
            </div>
            <div>
                {!isPw && inputPw.length > 0 && (
                    <div>영문, 숫자, 특수문자 포함 8자이상 입력</div>
                )}
            </div>
            <div>
                <input type="text" maxlength="4" name={inputName} required={true} value={inputName} onChange={handleInputName} placeholder="이름" />
            </div>
            <div>
                {!isName && inputName.length > 4 && (
                    <div>한글로 입력(5자리 미만)</div>
                )}
            </div>
            <div>
                <input type="text" maxlength="6" name={inputBirth} required={true} value={inputBirth} onChange={handleInputBirth} placeholder="생년월일" />
            </div>
            <div>
                {!isBirth && (inputBirth.length < 6 && inputBirth.length > 0) && (
                    <div>숫자로 입력(6자리)</div>
                )}
            </div>
            <div>
                <Link to="/">회원이신가요?</Link>
            </div>
            <div>
                <button type="button" disabled={notAllow} onClick={onSubmit}>가입</button>
            </div>

        </div>
    )

}