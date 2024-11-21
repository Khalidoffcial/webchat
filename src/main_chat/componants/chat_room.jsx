import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Rooms(props) {
  const {data}=props;
  const {selectUser}=props;

  // const navigate = useNavigate();
  const socket = new WebSocket('ws://localhost:8082');

console.log(data);
useEffect(()=>{

},{})

  return (
    <> 
      {typeof data ==="undefined" || typeof data.name1 === "undefined"?(console.log('99')):(<div className="div-list-chat">
        
          <div
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
  );
}

export default Rooms;

// هودي البيانات الل جايه من قاعده البيانات لارض الدردشه