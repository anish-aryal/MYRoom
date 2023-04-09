import React, { useRef } from 'react';
import './Chat.css';
import {useState, useEffect} from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Conversation from '../../components/Conversation/Conversation';
import ChatBox from '../../components/Conversation/ChatBox';
import {io} from 'socket.io-client';
import Sidebar from '../../components/nav/sidebar';

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
            console.log(data);
            const chatsWithLatestMessages = await Promise.all(
              data.map(async (chat) => {
                const { data: latestMessage } = await axios.get(`/messages/latest/${chat._id}`);
                return { ...chat, latestMessage };
              })
            );
      
            // Sort chats by the time of the latest message in each chat
            const sortedChats = chatsWithLatestMessages.sort((a, b) => {
                const aLastMessageTime = a.latestMessage && a.latestMessage.createdAt ? new Date(a.latestMessage.createdAt).getTime() : 0;
                const bLastMessageTime = b.latestMessage && b.latestMessage.createdAt ? new Date(b.latestMessage.createdAt).getTime() : 0;
              return bLastMessageTime - aLastMessageTime;
            });
            setChats(sortedChats);
          } catch (err) {
            console.log(err);
          }
        };
      
        getChats();
      }, [auth?.user]);
      
      



    const checkOnline = (chat) => {
        const chatMembers = chat?.members?.find((member) => member !== auth?.user?._id);
        const check = onlineUsers?.find((user) => user.userId === chatMembers);
        return check ? true : false;

    }


    return(
        <div className="container-fluid">
        <div className="row">
            
            <div className ="col-3 col-lg-2  p-0 justify-content-center"> <div><Sidebar /></div></div>
            
                <div className ="col-9 col-lg-10 pl-0 pr-5">
                    <div className="row"></div>
                    <div className="col-10 mt-5 ">
                            <h1 className="adH1">Start a Conversation</h1>
                            <p className="w-75 adP"> All new Conversation starts from the top. </p>
                        </div>

                <div className="row">
                    <div className="col-4">
                        <div className=" bg-white">
                        {chats.map((chat) => (
                                <div className='Chat-list px-5 py-4' onClick={() => setCurrentChat(chat)}>
                                    <Conversation data={chat} currentUserId={auth?.user?._id} key={auth?.user?._id} online={checkOnline(chat)} />
                                </div>
                            ))}


                        </div>
                    </div>
                    <div className="col-8">
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
               
                </div>
                

            </div>
                


     
    )
}
