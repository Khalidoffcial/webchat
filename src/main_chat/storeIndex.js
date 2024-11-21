// import indexdb from '../src/databases/indexedDB';
import cookie from '../databases/cookies_DAO.js';
import axios from 'axios';

export function Store_Frind_Chats_indexedDB() {
    return new Promise((resolve, reject) => {
        console.log(cookie("get"));
        axios.post("http://localhost:3000/Auth", "", {
            headers: {
                'Authorization': 'Bearer ' + cookie("get")
            }
        }).then((r) => {
            if (r.status === 200) {
                // let dt_info = {
                //     "u1n": r.data.dt_info[0].F_user,
                //     "u2n": r.data.dt_info[0].S_user,
                //     "uun": r.data.dt_info[0].Username,
                //     "nw": r.data.dt_info[0].news,
                //     "t0i2d": r.data.dt_info[0].Id_user,
                //     "t0i2l": r.data.dt_info[0].phoneNumber_mail,
                // };

                resolve(r);


            }
        }).catch((e) => {
            console.log(e);
            reject("the auth is false")
        });
    })
}