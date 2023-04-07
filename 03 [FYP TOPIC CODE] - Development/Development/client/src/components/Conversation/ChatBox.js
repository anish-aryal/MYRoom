import React, { useRef } from 'react';
import {useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Avatar } from 'antd';
import './ChatBox.css';
import {format} from 'timeago.js';
import InputEmoji from 'react-input-emoji';


export default function ChatBox({ chat, currentUser, setSendMessage, receiveMessage }) {

    const [userData,setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const scrollRef= useRef();
 

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
      }

    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setMessages([...messages, receiveMessage]);
        }
    },[receiveMessage])

    useEffect(() =>{
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const {data} = await axios(`/getuser/${userId}`);
                setUserData (data);
            } catch (err) {
                console.log(err)
            }
        }
        if ( chat!== null) getUserData();
    },[chat, currentUser])


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const {data} = await axios.get(`/messages/${chat?._id}`);
                setMessages(data);        
            } catch (err) {
                console.log(err)
            }
        };
        if (chat !== null) fetchMessages();
    },[chat])


    const handleSend = async(e)=> {
        e.preventDefault()
        const message = {
          senderId : currentUser,
          text: newMessage,
          chatId: chat._id,
      }

      if(message.text !==''){
        const receiverId = chat.members.find((id)=>id!==currentUser);
      // send message to socket server
      setSendMessage({...message, receiverId})
      // send message to database
      try {
        const {data} = await axios.post('/messages/', message);
        setMessages([...messages, data]);
        setNewMessage("");
      }
      catch
      {
        console.log("error")
      }
      }
      
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    },[messages])

    
    return (
        chat ? (
          <div className="container chatbox-container">
            <div className="row">
              <div className="col-12">
                <div className="chatheader">
                  <div className="d-flex justify-content-start align-items-center border-bottom pb-3">
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
      
                    <div className="sm ml-2 ">
                      {userData?.firstname} {userData?.lastname}
                    </div>
                  </div>
      

                  <div className="chat-body px-2">
                    {messages.map((message) => (
                        <div ref={scrollRef}
                        key={message.id}
                        className={
                            message.senderId === currentUser
                            ? 'Ownmessageown d-flex flex-column'
                            : 'sendersMessage d-flex flex-column'
                        }
                        >
                        <div className={ message.senderId === currentUser ? 'text-right' : 'text-left' }> 
                            <span className={ message.senderId === currentUser ? 'text-right pl-5 pr-2 py-2 sr messagesent' : ' pr-5 pl-3 py-2 text-left sr messagereceived' } style={{ display: 'inline-block' }}>{message.text}</span>
                        </div> 
                        <div  className={ message.senderId === currentUser ? 'text-right' : 'text-left' }>
                            <span
                            className={
                                message.senderId === currentUser ? 'text-right delivered sl' : 'text-left delivered '
                            }
                            >
                            {format(message.createdAt)}
                            </span>
                        </div>
                                            
                        </div>
                    ))}
                    </div>

      
                  <div className="chat-sender d-flex">
                    <InputEmoji value={newMessage} onChange={handleChange} />
                    <button className="chat-send-button" onClick={handleSend}>
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <span className="chatbox-empty-message">Select a person to chat with</span>
        )
      );
    }
    