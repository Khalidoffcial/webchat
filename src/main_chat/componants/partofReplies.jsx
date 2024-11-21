import { React, useState,useContext, useEffect } from "react";


function Replies(props){
    const {message}=props;

console.log("hello wold");
    const [hide_reply_message_div,Set_reply_message_div] = useState(true);


    return(
    <>
    <div className="reply_message_div">
        <div className="reply_message_content">
            <div className="color_reply_message"></div>
            <div className="main_content"><p className="name_mainContent">{message.sender === "you"? "You": message.sender}</p>
            <p className="message_mainContent">{message.content}</p></div>
        </div>
        <div className="cancel" onClick={()=>{Set_reply_message_div(!hide_reply_message_div)}}>X</div>
    </div>

    </>
        )
}
export default Replies;