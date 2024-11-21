import { React, useState,useContext } from "react";
import "./login.css";
import cookie from '../databases/cookies_DAO.js';
import { useJwt } from "react-jwt";

import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const { decodedToken, isExpired } = useJwt(cookie("get"));
  console.log(decodedToken);
  function handledataAuth(){
    axios.post("http://localhost:3000/Auth", "",{
      headers: {
        'Authorization': 'Bearer ' + cookie("get")
      }
    }).then((r)=>{console.log(r.data);if(r.status === 200 ){
      navigate("/");
    }}).catch((e)=>{})
  };
  handledataAuth();
  console.log(cookie("get"))
    const [identifierUser, setIdentifierUser] = useState('');
  const [password, setPassword] = useState('');
  const [token, settoken] = useState('');

  const handleIdentifierUserChange = (e) => {
    setIdentifierUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [isVisible, setIsVisible] = useState(true);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sumbit");
    const url = 'http://localhost:3000/signin';
    const data = {
      identifierUser,
      password
    };

    axios.post(url, data,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
          console.log(response.data.accessToken);
          console.log(response.data.user_dt_Signin);
          settoken(response.data.accessToken)
        setIsVisible(false)
        
      })
      .catch((error) => {
        console.log(error);
      });
  };



  function clicked_yes(){
    setIsVisible(!isVisible);
    cookie(token);
    navigate("/c");
    }
  function clicked_no(){
    setIsVisible(!isVisible);
      localStorage.setItem("Token",token);
      navigate("/c")
  }
        return( <div>
        <div class="login-box">
        <h2>Login</h2>
        <form >
          <div class="user-box">
          <input
            id="identifier-user"
            className="identifier-user"
            type="text"
            placeholder="phone number or username or email"
            value={identifierUser}
            onChange={handleIdentifierUserChange}/>            
          </div>
          <div class="user-box">
          <input
            id="password-login"
            className="password-login"
            type="password"
            placeholder="enter password"
            value={password}
            onChange={handlePasswordChange}/>
          </div>
          <Link to="/signup" id="signup" className="signup" >Idont have acount </Link>
          <a onClick={handleSubmit}>
            Submit
          </a>
        </form>
      </div>
      {isVisible? null:(<div class="notification" id="notification" >
        <div class="qu-noti">
        Do you want to stay on this device?</div>
        <div class="answer-noti" id="answer-noti">
            <button type="button" class="noti-btn-ys" id="noti-btn-ys" onClick={clicked_yes}>Yes</button>
            <button type="button" class="noti-btn-no" id="noti-btn-no" onClick={clicked_no}>No</button>
        </div>
        </div>)}
      </div>
        )}
export default Login;