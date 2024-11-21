
const url_socket = "ws://localhost:2000"; // مسار سيرفر الـ WebSocket

// مكون React الذي يتعامل مع الاتصال
export const _connect_Socket = (id) => {

        // إنشاء الاتصال باستخدام WebSocket
        const socket = new WebSocket(url_socket);

        // عند فتح الاتصال
        socket.onopen = () => {
            setConnected(true); // تحديث حالة الاتصال
            console.log("Connected with ID:", id);
            socket.current.send(JSON.stringify({ id })); // إرسال المعرف إلى الخادم عند الاتصال
        };

        // عند إغلاق الاتصال
        socket.current.onclose = () => {
            setConnected(false);
            console.log("WebSocket connection closed");
        };


};

// دالة لاستقبال الرسائل
export const Receive_Server = (ID) => {
    const socket = useRef();
    const [message, setMessage] = useState(null); // حالة لتخزين الرسائل المستقبلة

    useEffect(() => {
        if (socket.current) {
            // عند استقبال رسالة من WebSocket
            socket.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.id === ID) {
                        setMessage(data.message);
                    }
                } catch (error) {
                    console.error("Failed to process message", error);
                }
            };

            // التعامل مع أخطاء WebSocket
            socket.current.onerror = (err) => {
                console.error("WebSocket error occurred", err);
            };
        }

        // تنظيف عند إلغاء تحميل المكون
        return () => {
            if (socket.current) {
                socket.current.onmessage = null;
                socket.current.onerror = null;
            }
        };
    }, [ID]);

    return message;
};

// دالة لإرسال الرسائل
export const Send_Server = (socket, ID_OTHER, ID, dt) => {
    if (socket && socket.current && socket.current.readyState === WebSocket.OPEN) {
        const message = { id_user: ID_OTHER, id: ID, message: dt };
        socket.current.send(JSON.stringify(message)); // إرسال البيانات كـ JSON إلى الخادم
        console.log("Message sent:", dt);
    } else {
        console.error("WebSocket is not open.");
    }
};
