import '../../pages/Login.css';

import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function ForgotPassword() {
  // state for input fields
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  //hooks 
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Move this line here
      const { data } = await axios.post("/forgot-password", {
        email,
      });
      console.log(data);
  
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Password reset link sent to your email.");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //  try {
  //     console.log(email, );
   
  //     const {data} = await axios.post('/forgot-password', {
  //       email,
        
  //     });
  //     console.log(data);
  //     setLoading(true);

  //     if(data?.error){
  //       toast.error(data.error);
  //       setLoading(false);
  //     }
  //     else{
  //       toast.success("Password reset link sent to your email.");
  //       setLoading(false);
  //       navigate("/");
  //     }
     
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Something went wrong. Try again.");
  //     setLoading(false);
    
  //   }
  // };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 pt-3">
            <div className='row pt-5'>
              <div className="col-5 login-form">
                <div className='row justify-content-center'>
                  <div className='col-9 p-3 '>
                      <div className="image-container"> </div>
                      <div className='heading d-flex flex-column'>
                        <h1 className='pt-5'>Recover your Account.</h1>
                        <p>Please enter your email here to recover your account.</p>
                      </div>
                      <div className='form-container pt-5'>
                        
                        <form className='pb-5' onSubmit={handleSubmit}>
                          <div className='d-flex mb-4 flex-column'>
                            <label htmlFor="emaillabel" className="form-label" >Email address</label>
                            <input type="email" className=" emailinput login-input" id="inputemail" placeholder='something@gmail.com' aria-describedby="emailHelp"
                              value={email}
                              onChange={(e) => setEmail(e.target.value.toLowerCase())}
                              required
                              autoFocus />
                          </div>
                          
                          <div className="mb-3 d-flex flex-column forgotpw">
                            <Link to="/login">Back to Login</Link>
                          </div>
                          <button type="submit" className="btn login-btn btn-primary">{loading ? "Generating Recovery Link" : "Recover"}</button>
                        </form>
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-7 bimage ">
              </div>
                
              </div>
          </div>
          </div>
        </div>
    );
  }