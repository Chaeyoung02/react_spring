import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


export default function Login() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    //const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }
    const onClickLogin = () => {
        console.log("click login");
        console.log("Id: ", inputId);
        console.log("Pw: ", inputPw);

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

        axios
            .post("http://localhost:8080/member/login", {

                email: inputId,
                password: inputPw,

            })
            .then(res => {
                console.log("성공");
                console.log(res.data);
                localStorage.setItem("token", res.data.token)
                const TOKEN = localStorage.getItem("token");
                axios
                    .get("http://localhost:8080/membber/user", {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,

                        },

                    })
                    .then(res => {
                        console.log(res.data.user.nickname);
                        const user = res.data.user;
                        localStorage.setItem("nickname", user.nickname);
                    })

                /*const { accessToken } = res.data;
                const { refreshToken } = res.data;
                console.log("토큰1", accessToken);
                console.log("토큰2", refreshToken);
                // window.location.href = "/main";
                axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                localStorage.getItem("access", accessToken);*/

            })
            .catch(err => {
                window.alert("로그인실패");

            })
    };

    return (
        <div className="page">
            <div>
                <input type="text" className="form-control" placeholder="email" name={inputId}
                    value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <input type="password" className="form-control" placeholder="password" name={inputPw}
                    value={inputPw} onChange={handleInputPw} />
                <br />
                <Link to="/sign">회원이 아니신가요?</Link>
            </div>
            <button type="button" onClick={onClickLogin}>확인</button>
        </div>


    );

}


