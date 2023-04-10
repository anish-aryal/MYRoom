
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from 'antd';
import './Conversation.css'

export default function Conversation({ data, currentUserId, online }) {
  const [userData, setUserData] = useState(null);
  const [latestMessage, setLatestMessage] = useState('');
  const [lastMessageTime, setLastMessageTime] = useState(0);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await axios(`/getuser/${userId}`);
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };

    const getLatestMessage = async () => {
        try {
          const { data: latest } = await axios(`/messages/latest/${data._id}`);
          if (latest) {
            setLatestMessage(latest.text);
            setLastMessageTime(latest.createdAt);
          }
        } catch (err) {
          console.log(err);
        }
      };

    getUserData();
    if (data) {
      getLatestMessage();
    }
  }, [data, currentUserId]);

  return (
    <div className="usercard mb-2" style={{order: -lastMessageTime}}>
      <div className="d-flex">
        {userData?.photo?.Location ? (
          <Avatar
            src={userData.photo?.Location}
            shape="circle"
            size={45}
            className="ml-2 mr-1 avatar"
          />
        ) : (
          <Avatar
            src={
              'https://cdn-icons-png.flaticon.com/512/138/138661.png?w=1380&t=st=1680618337~exp=1680618937~hmac=eb0368c1c6baec28a7dbc858173b6eb382e47822a432fdf5332c04e499cb3f70'
            }
            shape="circle"
            size={45}
            className="ml-2 mr-1 avatar"
          />
        )}

        <div className="d-flex flex-column">
          <div className="sm ml-2 chatname d-flex align-items-center">
            <div style={{fontSize:'15px', fontFamily:'sm'}} > {userData?.firstname} {userData?.lastname}</div>
            <div> {online ? (
            <div className=" status text-left ml-2" style={{fontSize:'10px'}}> 🟢 </div>
          ) : (
            <div className=" status text-left ml-2"style={{fontSize:'10px'}}>🔴 </div>
          )}</div>
           
          </div>
         
          <div className="sm mt-1 w-75" style={{fontSize:'14px', fontFamily:"sm", height:'20px',overflow:'hidden'}}>
            {latestMessage ? latestMessage : (<span className="text-secondary">say hi !</span>)}
          </div>
        
        </div>
      </div>
    </div>
  );
}
