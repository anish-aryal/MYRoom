import React from 'react';
import ChatContainer from './Components/ChatContainer';
import Contact from './Components/Contact';

export default function Chat(){
    return(
        <div className='container mt-5'>
            <p className='text-center h1'>Chat Feature</p>
            <div className="row mt-5">
                <div className="col-4 text-center justify-content-center align-items-center">
                <Contact />
                </div>

                <div className="col-8 text-center justify-content-center align-itmes center">
                <ChatContainer />
                </div>
  
            </div>
            
        </div>
    )
}