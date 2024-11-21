import { React,Component, useState, useEffect } from "react"
import  Signin from "./login_chat/signin.jsx";
import  Signup from "./login_chat/signup.jsx";
import  Home_chat from "./main_chat/main_home.jsx";
import { BrowserRouter, Routes, Route, Navigate,Switch } from "react-router-dom";
import "./style.css";
import { io } from 'socket.io-client'; // استيراد socket.io-client


function App() {

    return( 
      <BrowserRouter>
        <Routes>
          <Route exact path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/c" element={<Home_chat/>} />
        </Routes>
    </BrowserRouter>
      
    );

}

export default App;
