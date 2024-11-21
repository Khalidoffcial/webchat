/* eslint-disable jsx-a11y/alt-text */
import { React, useState,useContext, useEffect,useRef, useLayoutEffect } from "react";
import iconPoint from "../../icons/7216132.png";
import iconSearch from "../../icons/search.png";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import clip from "../../icons/clip.png";
import emoj from "../../icons/smiley.png";
import recorder from "../../icons/mic.png";
import sender from "../../icons/736212.png";
import file from "../../icons/folder.png";
import photo from "../../icons/picture.png"
import video from "../../icons/video-camera-alt.png";
import cancel from "../../icons/cross-small.png"
import  {Store_Frind_Chats_indexedDB} from "../storeIndex";
import modal from "./modal";



function Chats(props){
  const { selectUser } = props;
  const { socket } = props;

    const [value_input,Set_value_input] = useState('');
    const [value_input_IMG,Set_value_input_IMG] = useState('');
    const [chatDefualt ,Set_chatDefualt]=useState(false);
    const [profile_Hidden,SET_profile_Hidden] = useState(true)
    const [hide_Recorder,Set_hide_Recorder] = useState(true);
    const [hide_emojis,Set_hide_emojis] = useState(true);
    const [hide_reply_message_div,Set_reply_message_div] = useState(true);
    const [Get_replied,Set_replied] = useState(false);
    const [Get_dataReplied,Set_dataReplied] = useState(null);
    const [data_received,Set_data_received] = useState(null);
    const [dataUserINputed ,Set_dataUserINputed]=useState({});
    const [dataitems ,Setdataitems]=useState({});
    const [DataMessages,Set_dataMessages] = useState([]);
    const [OpenAttach,setOpenAttach] = useState(false);
    const [OpenModal,setOpenModal] = useState(false);
    const [OpenModalShowIMG,setOpenModalShowIMG] = useState(false);
    const [ImageModal,setImageModal] = useState(false);
    const [ImageModalForShow,setImageModal_ForShowIMG] = useState(false);
    const [ImageSize,SetImageSize] = useState({width:null,height:null});
    const [ID,Set_ID] = useState('');
    
    
    
    let inputRef = useRef(null);
    let inputRef_IMG = useRef(null);
    let messageRef = useRef(null);
    const fileInputRef = useRef(null);

    
    
    useEffect(()=>{
      if(selectUser.name1){
        Set_chatDefualt(true);
        let lasrVisablelast = messageRef.current?.scrollHeight;
        messageRef.current?.scrollTo(0,lasrVisablelast);

      }
    },[selectUser])

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
      Set_ID(dt_info.id)
})
},[])

useEffect(()=>{
  if(socket){
    socket.on(ID, (message,id) => {
      const messageParsed = JSON.parse(message);
      messageParsed.receive = true;
       Set_dataMessages((prevData)=>[...prevData,messageParsed]);
       Set_data_received(true);
});
  }

},[socket])

    function handle_input(e){
        Set_value_input(
          e.target.value
        );

        (e.target.value) ? (Set_hide_Recorder(true)) : (Set_hide_Recorder(false) );
        
    }
    function handle_input_IMG(e){
        Set_value_input_IMG(
          e.target.innerHTML
        );
    }
    useEffect(() => {
        Set_value_input( value_input)
    }, [value_input]);

    useEffect(() => {
        Set_dataMessages( DataMessages)
    }, [DataMessages
    ]);

    console.log(ImageSize);

function sending_Setting(content,image){
let dateTime = new Date();
        let hrs = dateTime.getHours();
        let min = dateTime.getMinutes();
        function formatTime(hour, minute) {
            const period = hour >= 12 ? 'PM' : 'AM';
            const formattedHour = hour % 12 || 12;
            const formattedMinute = minute < 10 ? `0${minute}` : minute;

            return `${formattedHour}:${formattedMinute} ${period}`;
          }
          let key_IN_DB= ID+"-"+selectUser.id;
          function generateId() {
            // توليد 3 حروف عشوائية
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let randomLetters = '';
            for (let i = 0; i < 3; i++) {
              randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
            }
          
            // توليد 3 أرقام عشوائية
            const randomNumbers = Math.floor(100 + Math.random() * 900); // توليد رقم بين 100 و 999
          
            // جمع الحروف والأرقام معًا
            const id = randomLetters + randomNumbers;
          
            return id;
          }
    let dataSend =  {
    "idChat": key_IN_DB,
    "time": formatTime(hrs, min),
    "sender": ID,
    "idMassage": `${generateId()}`,
    "content":content,
    "img":image? image:'none',
    "img_height": ImageSize.height !== null ?`${ImageSize.height}px` : "none",
    "img_width": ImageSize.width !== null ?`${ImageSize.width}px` : "none",
    "count":content.length,
    "reply": Get_replied,
    "replied": Get_dataReplied,
}
console.log(dataSend);

Set_dataMessages((prevData)=>[...prevData,dataSend]);
Set_value_input("");
Set_value_input_IMG("");
Set_reply_message_div(true);
Set_replied(false);
Set_dataReplied(null)
SetImageSize({width:null,height:null});
inputRef.current.focus();
if(socket){
  //send
socket.emit("broadcast", selectUser.id,ID,dataSend);
}

}

    function handle_Sender_text(){
        sending_Setting(value_input);
        Set_value_input("");
    }
    function handle_Sender_IMG(){
        sending_Setting(value_input_IMG,ImageModal)
    }

    function handle_DoubleClick(message) {
        Set_reply_message_div(false);
        Setdataitems(message);
        Set_dataReplied(message);
        Set_replied(true);
      }


//modal
function handleCloseModle(){
  setOpenModal(!OpenModal)
}

function handleAttachFile(){

}

function handleAttachPhoto(){
 fileInputRef.current.click();
}

function handleAttacahVideo(){

}
function handleImgForShow(ImgSrc){
  setOpenModalShowIMG(true)
  setImageModal_ForShowIMG(ImgSrc)
}
function InputMSG_changed(e){
  const file = e.target.files[0];
          if (file) {
            setImageModal(URL.createObjectURL(file));
            setOpenModal(true);
            setOpenAttach(!OpenAttach);
            console.log(file);
            const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        const width =Math.round(img.naturalWidth / 10) * 10;
        const height = Math.round(img.naturalHeight / 10) * 10;
      SetImageSize({width:width,height:height+5})
      }
            
          }
        }

    return(
    <>
    {chatDefualt ? null : (<div className="ChatDefault">انقر لتحصل</div>)}

    {!chatDefualt ? null : (<div className="chats">
        <div className="topChats">

        <div className="profile-Details" style={{display:profile_Hidden ? "inline-flex" : "none"}} onClick={()=>{SET_profile_Hidden(!profile_Hidden);}}>
            <div className="circle-img-chat-top" >
                <img
                    src="chatweb\src\download.jpg"
                    alt="try"
                    className="image-pro-chat"/>
            </div>
            <div className="info-channal">
                <div className="name-channal-chat">{selectUser.name1}</div>
                <div className="least-msg-chat">last seen</div>
            </div>
        </div>
        {profile_Hidden ? null :(
            <div className="profile_page" >

            <div className="circle-img-chat-Profile">
                <img
                    src="chatweb\src\download.jpg"
                    alt="try"
                    className="image-pro-chat"/>
            </div>
            <div className="info-channalProfile">
                <div className="name-channal-chat">{selectUser.name1}</div>
                <div className="least-msg-chat">@username</div>
            </div>

                <h3 id="phone" className="phone">{selectUser.phone}</h3>
                <h3 id="id_user" className="id_user">{selectUser.id_user}</h3>
            </div>
        )}
        <div className="S_and_a">
            <div className="searchChat_box"><img className="Icons" src={iconSearch} alt="" title="Search" /></div>
            <div className="PointChat_box"><img className="Icons" src={iconPoint} alt="" title="List" /></div>
        </div>
    </div>

    <div className="center_chat" ref={messageRef}>
        {(Array.isArray(DataMessages) ) ? (
          Object.values(DataMessages).map((item) => {
            return [item].map((message, index) => {
              return (
                <>
                  {
                    message.receive ? (
                      <div key={index} className="line_message_receive" onDoubleClickCapture={() => { handle_DoubleClick(message) }}>
                          <div className={"cover_message_receive" + message.count} style={{ flexDirection: message.count > 5 ? ("column") : ("row") }}>
                          {message.img !== "none"? (<div className="mediaImMG" onClick={()=>{handleImgForShow(message.img)}}><img src={message.img} className="ImgIN_message"></img></div>):(
                              <div className="contentText" style={{flexDirection: message.count > 5 ? ("column") : ("row")}}><p className="message_content">{message.content}</p> </div>
                            )}
                            )
                            <p className="message_time">{message.time}</p>
                          </div>
                        </div>
                    ):(
                      message.reply ? (
                        <div key={index} className="line_message" onDoubleClickCapture={() => { handle_DoubleClick(message) }}>
                          <div className={"cover_message" + message.count} style={{ flexDirection: "column",
                            width: message.img_width !== "none"?`${ImageSize.width}px` : "auto",
                            height:ImageSize.img_height !== "none"?`${ImageSize.height}px`:"auto"}}>
                            <div className="reply_message_content">
                              <div className="color_reply_message"></div>
                              <div className="main_content">
                                <p className="name_mainContent">{message.replied.sender === ID ? "You" : message.replied.name1}</p>
                                <p className="message_mainContent">{message.replied.content}</p>
                              </div>
                            </div>
                            {message.img !== "none"? (<div className="mediaImMG" onClick={()=>{handleImgForShow(message.img)}}><img src={message.img} className="ImgIN_message"></img></div>):(
                              <div className="contentText" style={{flexDirection: message.count > 5 ? ("column") : ("row")}}><p className="message_content">{message.content}</p> </div>
                            )}
                            <p className="message_time">{message.time}</p>
                          </div>
                        </div>
                      ) : (
                        <div key={index} className="line_message" onDoubleClickCapture={() => { handle_DoubleClick(message) }}>
                          <div className={"cover_message" + message.count} style={{ flexDirection: message.count > 5 || message.img !=="none" ? ("column") : ("row"),
                            width: message.img_width !== "none"?`${ImageSize.width}px` : "auto",
                            height:ImageSize.img_height !== "none"?`${ImageSize.height}px`:"auto"
                           }}>
                          {message.img !== "none"? (<div className="mediaImMG" onClick={()=>{handleImgForShow(message.img)}}><img src={message.img} className="ImgIN_message"></img></div>):(
                              <div className="contentText" style={{flexDirection: message.count > 5 ? ("column") : ("row")}}><p className="message_content">{message.content}</p> </div>
                            )}
                            <p className="message_time">{message.time}</p>
                          </div>
                        </div>
                      )
                    )
                  }
                </>
              );
            });
          })
        ) : (
null        )}
      </div>

    <div className="Bottom_chat">
    {hide_reply_message_div ? null:(<div className="reply_message_div">
        <div className="reply_message_content">
            <div className="color_reply_message"></div>
            <div className="main_content"><p className="name_mainContent">{dataitems.sender === "you"? "You": dataitems.sender}</p>
            <p className="message_mainContent">{dataitems.content}</p></div>
        </div>
        <div className="cancel" onClick={()=>{Set_reply_message_div(!hide_reply_message_div);Set_replied(false)}}><img src={cancel}/></div>
    </div>)}
        <div className="tools_sender">



          {/* Attach */}
        <div className="attach"><img src={clip} className="Icons"
         onClick={()=>{setOpenAttach(!OpenAttach)}}
         />
        {OpenAttach ? (<div className="AttachItems">
          <div className="attachItem" onClick={()=>{handleAttachFile()}}><div className="fileAttach">File</div><img src={file} alt="" /></div>
          <div className="attachItem" onClick={()=>{handleAttachPhoto()}}>
          <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) =>{InputMSG_changed(e)}}

      /><div className="PhotoAttach">photo or Vedio</div><img src={photo} alt="" /></div>
      
          {/* <div className="attachItem" onClick={()=>{handleAttacahVideo()}}><div className="VideoAttach">Video</div><img src={video} alt="" /></div> */}
          
          </div>
        
        ):(null)}
        </div>
        <div className="emoj" onClick={(e)=>{Set_hide_emojis(!hide_emojis);console.log(e.screenY)}}><img src={emoj} className="Icons"/></div>
        


        {/* input_msg */}
        <input suppressContentEditableWarning={true} spellcheck="false" dir="auto"
             onChange={(e)=> {
            handle_input(e)
        }}
             ref={inputRef}
             title="type a message"
             className="input_message"
             placeholder="Type a message"
             onKeyDown={(e)=>{if (e.key === "Enter") {handle_Sender_text()}}}
             value={value_input}
        />

        {!hide_Recorder ? null : (<div className="sender" onClick={()=>{handle_Sender_text()}}><img src={sender} className="Icons"/></div>)}
        {hide_Recorder ? null : (<div className="voice_recorder"><img src={recorder} className="Icons"/></div>)}
        {hide_emojis ? null : (<div className="pickerImoji" onClick={()=>{inputRef.current.focus();}}><Picker
        data={data} 
        emojiVersion="14"
        emojiButtonRadius="5px"
        emojiButtonSize="38"
        emojiSize="30"
        icons="auto"
        locale="en"
        maxFrequentRows="4"
        noCountryFlags="true" 
        perLine="7"
        previewEmoji="point_up"
        previewPosition="none"
        searchPosition="static"
        set="native"
        skin="5"
        theme="dark"
        onEmojiSelect={(e)=>{Set_value_input(value_input + e.native)}} 
        /></div>)}
        </div>
    </div>
        </div>)}
        {/* modal */}
        {OpenModal?(
            <div className='modal_overlay'>
                <div className="close_modal" onClick={() => {
                    handleCloseModle()
                }}><img src={cancel} alt="" srcset=""/></div>
                <img className="ImageModal" src={ImageModal}/>
                <div className="enterTool">
                    {/* input_descrip_img */}
                    <div contentEditable="true" tabindex="-1" onInput={(e) => {
                        handle_input_IMG(e)
                    }}
                         ref={inputRef_IMG}
                         title="descrip photo"
                         className="input_descripIMG"
                         placeholder="Descrip photo"
                         onKeyDown={(e) => {
                             if (e.key === "Enter") {
                                 handle_Sender_IMG()
                             }
                         }}
                    >
                      <div dangerouslySetInnerHTML={{__html:value_input}}></div>
                    </div>

                    <div className="sender" onClick={() => {
                        handle_Sender_IMG();
                        Set_value_input_IMG('');
                        setImageModal("");
                        setOpenModal(false)
                    }}><img src={sender} className="Icons"/></div>

                </div>
            </div>) : null}

        {/* modalForShow */}
        {OpenModalShowIMG?(
            <div className='modal_overlay_ForShowIMG'>
                <div className="close_modal_ForShowIMG" onClick={() => {
                    setOpenModalShowIMG(!OpenModalShowIMG)
                }}><img src={cancel} alt="" srcset=""/></div>
                <img className="ImageModal_ForShowIMG" src={ImageModalForShow}/>
            </div>) : null}

    </>
    )
}

export default Chats;