// import React, { useState } from 'react';
// import axios from 'axios';
// import cookie from '../databases/cookies_DAO.js';
// import indexdb from '../databases/indexedDB.js';
// function Auth(){
//     axios.post("http://localhost:3000/Auth", "",{
//                 headers: {
//                     'Authorization': 'Bearer ' + cookie("get")
//                 }
//             }).then((r)=>{console.log(r.data);if(r.status === 200 ){
//                 console.log("تم تحديث الصفحه");
//                 let dt_info = {
//                     "u1n":r.data.dt_info[0].F_user,
//                     "u2n":r.data.dt_info[0].S_user,
//                     "uun":r.data.dt_info[0].Username,
//                     "nw":r.data.dt_info[0].news,
//                     "t0i2d":r.data.dt_info[0].Id_user,
//                     "t0i2l":r.data.dt_info[0].phoneNumber_mail,
//                 }
//                 indexdb("Ch4858","chat","set","mlf",dt_info);
//                 console.log(r.data.dt_friend);
//                 indexdb("Ch4858","frd25","get","--f").then((v)=>{
//                     if(r.data.dt_friend == '0001' || r.data.dt_friend === v){}else{
//                         console.log(v);
//                         indexdb("Ch4858","frd25","set","--f",r.data.dt_friend)
//                     }
//                 }).catch()
                
//             }}).catch((e)=>{console.log(e)});
// }

// export default Auth;