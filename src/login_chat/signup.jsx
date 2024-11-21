import { React, useState } from "react";
import "./signup.css";
import axios from 'axios';
import  Profile from "../main_chat/profile.jsx"
import { v4 as uuidv4 } from 'uuid';
import { Link,useNavigate } from 'react-router-dom';

import cookie from '../databases/cookies_DAO.js';


// import useNavigate from 'react-router';
function Signup (props){
    const {toProfile}=props;
    const navigate = useNavigate();
const [isVisible, setIsVisible] = useState(false);
const [showtxtPassword, settext] = useState('');
const [showtxt_RE_Password, set_RE_text] = useState('');
const [token, settoken] = useState('');
const [fullName,setFullName]=useState("");
const [username,setUsername]=useState("");
const [phone_number,setPhone]=useState("");
const [password,setPassword]=useState("");
const [re_password,set_RE_Password]=useState("");
const [id,set_id]=useState("");
function handlefullname(e){
    setFullName(e.target.value);
}
function handleUsername(e){
    setUsername(e.target.value);
}
function handlePhone(e){
    setPhone(e.target.value);
}
function handlepassWord(e){
    setPassword(e.target.value);
   
    
}
function handle_RE_passWord(e){
    set_RE_Password(e.target.value);
}


function handleEnter_Signup(){
    const uppercaseRegex = /[A-Z]/;
    if( !uppercaseRegex.test(password) ){
       settext("flex");
    }else if(re_password !== password){
    set_RE_text("flex");
    }else{ 
        settext("none");
        set_RE_text("none");
        const url = 'http://localhost:3000/signup';
    const data = {
        fullName:fullName,
        username:username,
        phone_number:phone_number,
        password:password,
    };
    // toProfile(data);
    axios.post(url, data,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {


          console.log(response.data.token);
          settoken(response.data.token);
          setIsVisible(true)

      })
      .catch((error) => {
        console.log(error);
      });

    }
    

}
    return(<div>
            <div className="signup-box">
                <h2>Sign up</h2>
                <div className="user-box">
                    
                    <input id="frist_name" className="frist_name" type="text" onChange={handlefullname} placeholder="first name"  />
                    <h4 id="tx-frist_name" className="tx-frist_name">dgfdfg</h4>
                    <input id="username" className="username" type="place" onChange={handleUsername} placeholder="username"  />
                    <h4 id="tx-username" className="tx-username">dgfdfg</h4>
                    <input id="phone" className="phone" type="phone" onChange={handlePhone} placeholder="phone number"  />
                    <h4 id="tx-phone" className="tx-phone">dgfdfg</h4>
                    <input id="password" className="password" type="password" onChange={handlepassWord} placeholder="password"  />
                    <h4 id="tx-password" className="tx-password" style={{display:showtxtPassword}}>The password includes capital letters And */#@%&</h4>
                    <input id="confirm" className="confirm" type="password" onChange={handle_RE_passWord} placeholder="Re-enter password"  />
                    <h4 id="tx-confirm" className="tx-confirm" style={{display:showtxt_RE_Password}}>The password does not match</h4>
                    <div id="signup" className="signup" type="button" onClick={handleEnter_Signup}>sign up</div></div>
                </div>
                <div class="notification" id="notification" style={{ display: isVisible ? 'block' : 'none' }}>
                    <div class="qu-noti">
                    Do you want to stay on this device?</div>
                    <div class="answer-noti" id="answer-noti">
                        <button type="button" class="noti-btn-ys" id="noti-btn-ys" onClick={()=>{setIsVisible(!isVisible);cookie(token);navigate("/")}}>Yes</button>
                        <button type="button" class="noti-btn-no" id="noti-btn-no" onClick={()=>{setIsVisible(!isVisible);localStorage.setItem("Token",token);navigate("/")}}>No</button>
                    </div>
                    </div>
                </div>
        )
}
export default Signup;