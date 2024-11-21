import { myInfo } from "./actions";
const initialState = {
            "name": '',
            "name2": '',
            "username": '',
            "news": '',
            "id": '',
            "nphone": '',
};
export const reducer =(state = initialState,action)=>{
    switch (action.type) {
        case myInfo:
            return {
                ...state,
                users: action.payload,
            };
        default:
            return state;
    }
}