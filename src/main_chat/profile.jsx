import { React, useState } from "react"
import "./profile.css"
const Profile = (props)=>{
        const [selectedImage, setSelectedImage] = useState(null);
        
        function handleImageChange (event) {
          const file = event.target.files[0];
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);
        };
    return(
    <div className="profile-box">
        <div className="circle-img">
                {selectedImage && (
                <div>
                <img src={selectedImage} alt="الصورة المحددة" className="image-pro"/>
                </div>
                )}
        </div>
            <input onChange={handleImageChange} type="file" id="file" accept="image/png, image/jpg, image/gif, image/jpeg" hidden/>
            <label className="circle2-img" for="file">
            <svg id="image_preview_default" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
            </label>
            <input id="fullNm" className="fullNm" type="text" placeholder="Full name" value={props.fullName}/>
            <input id="UserNm" className="UserNm" type="text" placeholder="Username" value={props.username}/>
            <input id="News" className="News" type="text" placeholder="News"/>
            <input id="phone-profile" className="phone-profile" value={props.phone_number} readOnly/>
            <input id="id_user" className="id_user" value={props.id} readOnly/>
    </div>
        )
}
export default Profile;