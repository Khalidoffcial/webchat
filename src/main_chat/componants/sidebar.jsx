import React, { useEffect, useState,useRef } from "react";
import Top_Sidebar from "./top_sidebar.jsx";
import Bottom_Sidebar from "./bottom_sidebar.jsx";
import axios from 'axios';
import indexdb from '../../databases/indexedDB.js';
import iconSearch from "../../icons/9851190.png";
import iconAdd from "../../icons/3917163.png";
import iconPoint from "../../icons/7216132.png";
import  {Store_Frind_Chats_indexedDB} from "../storeIndex";
import {useNavigate  } from "react-router-dom";


const socket = new WebSocket('ws://localhost:8082');

function Sidebar(props) {
  const { Friends } = props;
    const { selectUser } = props;
    const navigate = useNavigate();
  const [isVisible_search, setIsVisible_search] = useState(false);
    const [isVisible_add, setIsVisible_add] = useState(false);
    const [value_click_addX, set_valueClick_addX] = useState("");
    const [value_click_addY, set_valueClick_addY] = useState("");
    const [inputValue_s, setInputValue_s] = useState('');
    const [inputValue_a, setInputValue_a] = useState('');
    const [isHidden, setIsHidden] = useState(true);
    const [listRoomchat, setlistRoomchat] = useState([]);
    const [UserData, SetUserData] = useState({
      fullname: '',
      name1: '',
      name2: '',
      id: '',
      newsUser: '',
      username: ''
    });
    const [MineData, SetMineData] = useState({
      name: '',
      name2: '',
      username: '',
      news: '',
      id: '',
      nphone: ''
    });
    const divRef = useRef();


useEffect(()=>{

  if(Friends != null && Friends.Friend !== "0x1001"){
      if (typeof Friends ==="object"){
              setlistRoomchat(Object.values(Friends)[0]);  console.log(typeof Friends);
      } else if(typeof Friends ==="string"){
          let fri= JSON.parse(Friends);
          setlistRoomchat(Object.values(fri)[0]);  console.log(typeof Friends);

      }

  }
},[Friends])

    useEffect(() => {
      let handler = (e)=>{
        if(!divRef.current.contains(e.target)){
          setIsVisible_add(false);
          setIsVisible_search(false);
        }      
      };
  
      document.addEventListener("mousedown", handler);
      
  
      return() =>{
        document.removeEventListener("mousedown", handler);
      }
  
    });



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
    SetMineData(dt_info)
  }).catch(()=>{
    navigate("/Signin")
  })
},[])
    function deal_serverAdd(){
        const data_add = {
            idFrnd:inputValue_a,
            localId:MineData.id
            
          };
        axios.post("http://localhost:3000/searchtoadd", data_add,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((r)=>{console.log(r.data);if(r.status === 200 ){
      setIsHidden(false);
      const newData = {
        name1: r.data[0].F_user,
        name2: r.data[0].S_user,
        id: r.data[0].Id_user,
        newsUser: r.data[0].newsUser,
        username: r.data[0].username
      };
      SetUserData(newData);
    }}).catch((e)=>{console.log(e)})
  };

console.log(UserData);



  let data = {
    "name1": UserData.name1,
    "name2": UserData.name2,
    "username": UserData.username,
    "phone":UserData.phoneUser,
    "id":UserData.id,
    "nickname": "null",
    "profile_id": "url",
    "news": "welcome",
    "chats_id": ""
};
  function to_list_channals(){
    const dataADD = {
      idMAIN : MineData.id,
      numberUser:UserData.id,
      data:data
    }
console.log(UserData.id)
    axios.post("http://localhost:3000/add",dataADD,{
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((r)=>{
      if(r.status === 200 ){

              setlistRoomchat(UserData)
              console.log(listRoomchat);
      }


    }).catch((e)=>{console.log(e);console.log("error");})
    

  }



  return (
    <>
      <div className="sideBar">
    <div className="Top_sidebar">
        <div className="logo">Sendex</div>
        <div className="search"  onClick={()=>{setIsVisible_search(!isVisible_search)}}><img src={iconSearch} alt="iconsearch" className="Icons"/></div>
        <div className="add" onClick={(e)=>{setIsVisible_add(!isVisible_add);set_valueClick_addX(e.pageX);set_valueClick_addY(e.pageY)}} onAuxClick={()=>{console.log("HI")}}><img src={iconAdd} alt="iconadd" className="Icons"/></div>
        <div className="points" ><img src={iconPoint} alt="iconpoints" className="Icons"/></div>
        <div className="div_search" style={{ display: isVisible_search ? 'flex' : 'none' }} ref={divRef} >
            <input type="text" className="input-search" value={inputValue_s} onChange={(e)=>{console.log(e.target.value);setInputValue_s(e.target.value)}}/>
        <div className="btn_search" ></div>
        </div>
        

        <div style={{ display: isVisible_add ? 'block' : 'none' , left:`${value_click_addX}px`, top:`${value_click_addY}px`}} ref={divRef} className="div-add" >
            <div className="search-add">
                <input type="text" className="input-add" value={inputValue_a} onChange={(e)=>{console.log(e.target.value);setInputValue_a(e.target.value)}}/>
                <div className="btn-add" onClick={()=>{deal_serverAdd()}}></div>
            </div>
            <hr />            
            <div className="result-add">result</div>

            {isHidden ? null : (
              <div className="channals-result-add">
                    <div className="circle-img-chat-add">
                    <img src="chatweb\src\download.jpg" alt="try" className="image-pro-chat-add"/>
                    </div>
                    <div className="info-channal-add">
                        <div className="name-channal-chat-add">{UserData.name1 + UserData.name2}</div>
                    <div className="Username-add">{UserData.username}</div>
                    </div>
                    <div className="btn-addChat" onClick={()=>{
                      to_list_channals();

                      setInputValue_a("") 
                      setIsHidden(!isHidden);
                      setIsVisible_add(!isVisible_add);
                     }}></div>

        </div>
            )}
        </div>
    </div>
 

    {[listRoomchat].map((data,index) => {
      return <> 
      {typeof data ==="undefined" || typeof data.name1 === "undefined"?(console.log('99')):(<div className="div-list-chat">
        
          <div
          key={index}
            className="channal-chat"
            onClick={()=>{socket.send(JSON.stringify({
              id: localStorage.getItem("id"),
              id_user:data.id,
              case: "Chats"
            }));
              selectUser(data);
              console.log(data)

            }}
            >
            <div className="circle-img-chat">
              <img
                src="chatweb\src\download.jpg"
                alt="try"
                className="image-pro-chat"
              />
            </div>
            <div
              className="info-channal"
            >
              <div className="name-channal-chat">{data.name1 + data.name2}</div>
              <div className="least-msg-chat">least massage</div>
            </div>
            <div className="not-hour">
              <div className="not">i5</div>
              <div className="hour">4:25</div>
            </div>
          </div>
        
      </div>)}
    </>
    })}

      </div>
    </>
  );
}

export default Sidebar;
