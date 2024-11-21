import {React, useEffect, useState, useRef} from 'react';
import  {Store_Frind_Chats_indexedDB} from "./storeIndex";
// import {Store_indexedDB} from "../Sender.js"

import "./Home.css";
import Sidebar from "./componants/sidebar.jsx";
import Chats from "./componants/chats.jsx";
import {useNavigate  } from "react-router-dom";
import { io } from 'socket.io-client'; // استيراد socket.io-client

const Home_chat = ()=>{
    const navigate = useNavigate();

    const [get_MY_ID,set_MY_ID] = useState('');
    const [get_ID_OTHER,set_ID_OTHER] = useState('');
    const [get_Friends,set_Friends] = useState({});
    const [get_Chats,set_Chats] = useState({});
    const [selectUser,set_selectUser] = useState({});
      const [isLoading, setIsLoading] = useState(false);
      const [connected, setConnected] = useState(false); // حالة الاتصال
      const [Socket,setSocket] = useState()

      useEffect(()=>{
        const url_socket = "http://localhost:2000"; // مسار سيرفر الـ Socket
        // إنشاء الاتصال
        const socket = io(url_socket, {
         reconnection: true,
         reconnectionAttempts: 10,
         reconnectionDelay: 2000,
       },{transport:["wensocket"]});
       socket.on('connect',()=>{
            socket.id = get_MY_ID
       })
       setSocket(socket)
      },[get_MY_ID])


    useEffect(()=>{
    Store_Frind_Chats_indexedDB().then((r)=>{
        let dt_info = {
            "name": r.data.dt_info[0].F_user,
            "name2": r.data.dt_info[0].S_user,
            "username": r.data.dt_info[0].Username,
            "news": r.data.dt_info[0].news,
            "id": r.data.dt_info[0].Id_user,
            "nphone": r.data.dt_info[0].phoneNumber_mail,
        };

        let Chats = r.data.chats;
        set_Chats({Chats});
        set_MY_ID(dt_info.id);
        console.log(dt_info)
        // Recieve_Server(r).then((e) => {
        //     if (e.sent_server === "ok") {
        //     }
        // });

    }).catch((e)=>
    {if(e === "The auth is false")
    {console.log(e);
        setIsLoading(true);
        navigate("/Signin")

    }})

},[]);

useEffect(()=>{
    console.log(get_MY_ID)
    const socket = new WebSocket('ws://localhost:8082');
    socket.addEventListener("open", () => {
        setIsLoading(false);
        console.log('Connected to WebSocket server');
        let data = {
            id: get_MY_ID,
            case: "Friends"
        };
        console.log(data)
        socket.send(JSON.stringify(data));
    });
    
        socket.addEventListener('message', (event) => {
            let caseData = JSON.parse(event.data);
            
            if("0x1001" !== caseData.Data){
        if (caseData.case === "Friends") {
            set_Friends(JSON.parse(caseData.Data))
        } else if (caseData.case === "Chats") {
        set_Chats(JSON.parse(caseData.Data))
    }
     }
    });
    // Listen to close event
    socket.addEventListener('close', (event) => {
    console.log('WebSocket disconnected:', event);
    });
    // Listen to error event
    socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
    });
},[get_MY_ID]);





    return(
    <> {isLoading ? (<div className="page_loader">
<div className="center_container_loader">
    <h1>loading...</h1>
    <div className="loader">
        <div className="container_loader"></div>
    </div>

</div>

      </div>) : (console.log("33"))}

    <div className="continar">
        <Sidebar Friends={get_Friends} selectUser={(e)=>{set_selectUser(e)}}/>
        <Chats socket={Socket} selectUser={selectUser}/>

    </div>
    </>
        )
}
export default Home_chat;