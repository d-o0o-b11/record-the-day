import React, {useState, useEffect, useRef} from "react";
import "./Login.css"
import icon5 from "../img/icon5.png"
import axios from "axios"

import { useNavigate } from 'react-router-dom';

import { setCookie } from "../util/cookie";
import { useDispatch } from "react-redux";
import { goToHome, setLogin } from "../modules/Logincheck";


const Login = () =>{
    const [account, setAccount] = useState({
        email: "",
        password: "",
    });
    
      //input에 입력될 때마다 account state값 변경되게 하는 함수
    const onChangeAccount = (e) => {
        
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const dispatch = useDispatch();
	const navigate = useNavigate();


    const login = (e) => {
		e.preventDefault();

        if(account.email ===""){
            alert("아이디를 입력해주세요")
        }
        else if(account.password === ""){
            alert("비밀번호를 입력해주세요")
        }
        else{
            axios
			.post('https://cloudwi.herokuapp.com/member/login', { // 로그인 요청
				email: account.email,
				password: account.password,
			})
			.then((res) => {
                // localStorage.setItem('token2', res.data.token);
					setCookie('token', res.data.token);// 쿠키에 토큰 저장
                    let expires = new Date();
                    //60분 더한 값으로 변경
                    expires.setMinutes(expires.getMinutes()+30);
                    setCookie('username',res.data.nickname, {path:'/',expires})
                    dispatch(setLogin());
                    dispatch(goToHome(navigate));
                    console.log(res.data);
			})
            .catch(error=>{
                alert("이메일와 비밀번호를 확인해주세요");
            })

        }

		
	};



    return(
        <div className="login_frame">
                <div className="login_icon_marg">
                    <img src={icon5}/>
                </div>

                <h1>로그인</h1>
                
                <div>
                    <input
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={onChangeAccount}
                    />
                </div>
                <div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="PassWord"
                        onChange={onChangeAccount}
                    />
                </div>

                <button onClick={login}>
                    <h3>Login</h3>
                </button>
            </div>
    )
}


export default Login