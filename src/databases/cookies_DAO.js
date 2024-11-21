import Cookies from 'js-cookie';


export default function cookie(any) {
    console.log(any)
    if (any === "get") {
        return Cookies.get('token');
    } else if (any === "remove") {
        return Cookies.remove('token');
    } else if (any.startsWith("ey")) {
        console.log(any)
        Cookies.set('token', any, { expires: 60, secure: true });
    }



}