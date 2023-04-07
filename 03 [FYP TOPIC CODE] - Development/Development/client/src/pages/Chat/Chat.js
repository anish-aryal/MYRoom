import React, { useRef } from 'react';
import './Chat.css';
import {useState, useEffect} from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Conversation from '../../components/Conversation/Conversation';
import ChatBox from '../../components/Conversation/ChatBox';
import {io} from 'socket.io-client';

export default function Chat(){
    const [auth, setAuth] = useAuth();
    const[chats, setChats] = useState([]);
    const[currentChat, setCurrentChat] = useState(null);
    const[onlineUsers, setOnlineUsers] = useState([]);
    const[sendMessage, setSendMessage] = useState(null);
    const[receiveMessage, setReceiveMessage] = useState(null);
    const socket = useRef();

    useEffect(() =>{
        if(receiveMessage!==null){
            socket.current.on("receive-message", (data) =>{
                setReceiveMessage(data)
            } )
        }
    }, [receiveMessage]);

    useEffect(() => {
        socket.current = io("ws://localhost:8800");
        socket.current.emit("new-user-add", auth?.user?._id);
      
        socket.current.on("get-users", (users) => {
          setOnlineUsers(users);
          console.log(users);
        });
      
        socket.current.on("receive-message", (data) => {
          setReceiveMessage(data);
        });
      
        return () => {
          socket.current.off("get-users");
          socket.current.off("receive-message");
        };
      }, [auth?.user?._id]);

    useEffect(() =>{
        if(sendMessage!==null){
            socket.current.emit("send-message", sendMessage )
        }
    }, [sendMessage]);

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await axios.get(`/chat/${auth?.user?._id}`);
                setChats(data);
            } catch (err) {
                console.log(err);
            }
        }
        getChats();
    },[auth?.user]);

    const checkOnline = (chat) => {
        const chatMembers = chat?.members?.find((member) => member !== auth?.user?._id);
        const check = onlineUsers?.find((user) => user.userId === chatMembers);
        return check ? true : false;

    }

    return(
        <div className="container">
                <h2>Chats</h2>

                <div className="row">
                    <div className="col-3">
                        <div className=" bg-white">
                        {chats.map((chat) => (
                            <div className='Chat-list px-5 py-4'onClick={()=>setCurrentChat(chat)} >
                                <Conversation  data ={chat} currentUserId={auth?.user?._id} key={auth?.user?._id} online ={checkOnline(chat)} />
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="col-9">
                            <div className="row">
                            <div className="container">
                                <div className="text-center">
                                    <ChatBox chat ={currentChat} currentUser={auth?.user?._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage}  />
                                </div>
                             </div>
                            </div>
                        </div>
                </div>
               
        </div>
    )
}
