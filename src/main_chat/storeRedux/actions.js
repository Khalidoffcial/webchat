import  {Store_Frind_Chats_indexedDB} from "./storeIndex";
export const myInfo = Store_Frind_Chats_indexedDB().then((r)=>{return r});
export const fetchUsersSuccess = (mydata) => ({
    type: myInfo,
    payload: mydata,
});