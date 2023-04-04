import React from 'react';
import './Components.css';
import { useAuth } from '../../../context/auth';
import { Avatar } from 'antd';
import axios from 'axios';

export default function Contact() {

    const [auth, setAuth] = useAuth();
    const user = auth?.user;
    let id = user._id;
    console.log(id);

    console.log([auth?.user?.token])

    return (
        <div>
            <h1>Contact</h1>

            <div className="mainContactContainer">

                <div className="row">
                    <div className="col-12 bg-primary">
                        <div className="user d-flex align-items-center">
                        {auth?.user?.photo?.Location ? <Avatar
                        src={auth?.user?.photo?.Location}
                        shape="circle"
                        size={50}
                        className="ml-2 mr-1 avatar"
                        /> :''
                        }

                        <div className="usercardbody d-flex flex-column align-items-start">
                            <div className="sr">
                                {auth?.user?.firstname}  {auth?.user?.lastname}
                            </div>
                            
                            <div className="">
                                1 new message.
                            </div>
                       
                
                        </div>
                </div>
                    </div>
                </div>

              
                
            </div>
        </div>
    )
}