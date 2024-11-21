import indexdb from '../src/databases/indexedDB';
import { Send_Server } from "./main_chat/Socket-io"
export function Store_indexedDB(ID_OTHER, ID, data) {
    return new Promise((resolve, reject) => {
        let iden = ID + "-" + ID_OTHER;
        indexdb("Sdky", "frd25", "get", iden).then((e) => {
            let chatsKeys = Object.keys(e);
            // الحصول على عدد العناصر في chats
            let numChats = chatsKeys.length;
            console.log(e);
            let x = `msg_${numChats+1}`
            Object.defineProperty(e, x, { value: data, writable: true, enumerable: true });
            e[x] = {...e[x], ... { "seen": "2" } }
            e[x] = {...e[x], ... { "idMSG": x } }
            indexdb("Sdky", "frd25", "set", iden, e); // حقظ في قاعده البيانات المتصفح
            Send_Server(ID_OTHER, ID, e[x]); // ارسال الي السيرفر
            resolve(e);
        }).catch((er) => { reject(er) })
    })
}