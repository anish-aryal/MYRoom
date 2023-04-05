import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from 'antd';
import './Conversation.css'

export default function Conversation({ data, currentUserId }) {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId);
        const getUserData = async () => {
            try {
                const {data} = await axios(`/getuser/${userId}`);
                setUserData (data);
                
            } catch (err) {
                console.log(err)
                
            }
            
        }
        getUserData();
    },[])
    
    return(
        <div className="usercard">
            <div className="d-flex">
            {userData?.photo?.Location ? <Avatar
                        src={userData.photo?.Location}
                        shape="circle"
                        size={45}
                        className="ml-2 mr-1 avatar"
                        /> : <Avatar
                        src={'https://cdn-icons-png.flaticon.com/512/138/138661.png?w=1380&t=st=1680618337~exp=1680618937~hmac=eb0368c1c6baec28a7dbc858173b6eb382e47822a432fdf5332c04e499cb3f70'}
                        shape="circle"
                        size={45}
                        className="ml-2 mr-1 avatar"
                        />
                        }

            <div className="d-flex flex-column">

                <div className="sm ml-2 chatname">{userData?.firstname} {userData?.lastname}</div>
                <div className=" status text-left ml-2">Online</div>
           
            </div>
            </div>
        </div>
    )
}