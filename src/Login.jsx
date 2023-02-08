import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaUser, FaUnlockAlt } from "react-icons/fa";

export default function Login() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    /*const onClickLogin = async (inputId, inputPw) => {
        return await axios
            .post("http://localhost:8080/member/login",
                {
                    email: inputId,
                    password: inputPw,
                },
                { withCredentials: true }
            ).then((res) => {
                axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
                return res.data;
            })
            .catch((e) => {
                console.log(e.res.data);
                return "이메일 혹은 비밀번호 확인";
            });
    };
    const requestAccessToken = async (refresh_token) => {
        return await axios
            .post("http://localhost:8080/member/login/refresh", {
                refresh: refresh_token,
            })
            .then((res) => {
                return res.data.access;
            })
            .catch((e) => {
                console.log(e.res.data);

            });
    };
    const checkAccessToken = async (refresh_token) => {
        if (axios.defaults.headers.common["Authorization"] === undefined) {
            return await requestAccessToken(refresh_token).then((res) => {
                return res;
            })
        } else {
            return axios.defaults.headers.common["Authorization"].split(" ")[1];
        }
    }*/

    const onClickLogin = () => {

        axios
            .post('http://localhost:8080/member/login', {
                email: inputId,
                password: inputPw,
            })
            .then(response => {
                console.log("성공");
                console.log(response.data);

                const { accessToken } = response.data;
                localStorage.setItem("token", accessToken)
                console.log(accessToken)
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 6000);
                window.location.href = "/main";
            })
            .catch(error => {
                console.log(error);
            })

    }
    const onSilentRefresh = () => {
        axios.post('http://localhost:8080/member/login/silent-refresh', {
            email: inputId,
            password: inputPw,
        })
            .then(onClickLogin)
            .catch(error => {
                console.log("실패");
            })
    }

    /*const onClickLogin = async (email, password) => {
        console.log("click login");
        console.log("Id: ", inputId);
        console.log("Pw: ", inputPw);
        const data = {
            email,
            password,
        };
        try {
            const { result } = (await axios.post("http://localhost:8080/member/login", data)).data;
            sessionStorage.setItem("accesstoken", result.accessToken, '60s');
            sessionStorage.setItem("refreshtoken", result.refreshToken, '3d');
            console.log("성공");
            console.log(result);
        } catch (e) {
            return e;
        }
    }*/
    /*const test = async () => {
        try{
            const data = await axios.get("http://localhost:8080/member/test");
            console.log("API 성공");
            return data;
        }catch(e) {
            console.log("API 실패");
            return e;
        }
    }*/

    /*const client = axios.create({
        baseURL: "http://localhost:8080/member/login"
        
    })
    client.interceptors.request.use(
        function (config) {
            const user = localStorage.getItem('user');
            if (!user) {
                config.headers["accessToken"] = null;
                config.headers["refreshToken"] = null;
                return config
            }
            const { accessToken, refreshToken } = JSON.parse(user)
            config.headers["accessToken"] = accessToken;
            config.headers["refreshToken"] = refreshToken;
            return config
        }
    )
    client.interceptors.response.use(
        function (response) {
            return response
        },
        async function (error) {
            if (error.response && error.response.status === 403) {
                try {
                    const originalRequest = error.config;
                    const data = await client.get('auth/refreshToken')
                    if (data) {
                        const { accessToken, refreshToken } = data.data
                        localStorage.removeItem('user')
                        localStorage.setItem('user', JSON.stringify(data.data, ['accessToken', 'refreshToken']))
                        originalRequest.headers['accessToken'] = accessToken;
                        originalRequest.headers['refreshToken'] = refreshToken;
                        return await client.request(originalRequest);
                    }
                } catch (error) {
                    localStorage.removeItem('user');
                    console.log(error);
                }
                return Promise.reject(error)
            }
        }
    )*/
    /*const onClickLogin = () => {
        axios
            .post("http://localhost:8080/member/login", {
    
                email: inputId,
                password: inputPw,
    
            })
            .then(res => {
                console.log("성공");
                console.log(res.data);
    
                const { accessToken } = res.data.accessToken;
                const { refreshToken } = res.data.refreshToken;
                localStorage.setItem("accesstoken", accessToken,'60s')
                localStorage.setItem("refreshtoken", refreshToken,'3d')
    
                const REFRESHTOKEN = localStorage.getItem("refreshtoken");
                const ACCESSTOKEN = localStorage.getItem("refreshtoken");
                axios
                    .get("http://localhost:8080/membber/user", {
                        headers: {
                            Authorization: `Bearer ${REFRESHTOKEN}`,
                            Authorization: `Bearer ${ACCESSTOKEN}`,
                        },
    
                    })
                    .then(res => {
                        console.log(res.data.user.nickname);
                        const user = res.data.user;
                        localStorage.setItem("nickname", user.nickname);
                         setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 6000);
                    })
                // window.location.href = "/main";
    
    
            })
            .catch(err => {
                window.alert("로그인실패");
    
            })
    }*/


    return (
        <div className="LoginPage">
            <div className="loginForm">
                <FaUser />
                <input type="text" className="form-control" placeholder="email" name={inputId}
                    value={inputId} onChange={handleInputId} />
            </div>
            <div className="loginForm">
                <FaUnlockAlt />
                <input type="password" className="form-control" placeholder="password" name={inputPw}
                    value={inputPw} onChange={handleInputPw} />
                <br />
                <div classname="linkHref">
                    <Link to="/sign">회원이 아니신가요?</Link>
                </div>
            </div>
            <button type="button" onClick={onClickLogin}>확인</button>
        </div>


    );


}


