import './Login.css';
import { useAuth } from "../context/auth.js";
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function Login() {
  // state for input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //hooks 
  const navigate = useNavigate();

  //context access
  const [auth, setAuth] = useAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
      console.log(email, password);
   
      const {data} = await axios.post('/login', {
        email,
        password,
      });
      console.log(data);
      setLoading(true);

      if(data?.error){
        toast.error(data.error);
        setLoading(false);
      }
      else{
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Welcome to MyRoom");
        setLoading(false);
        navigate("/");
      }
     
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    
    }
  };
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
                        <h1 className='pt-5'>Welcome Back.</h1>
                        <p>Please enter your credentials here to login.</p>
                      </div>
                      <div className='form-container pt-5'>
                        
                        <form className='pb-5' onSubmit={handleSubmit}>
                          <div className='d-flex mb-4 flex-column'>
                            <label htmlFor="emaillabel" className="form-label " >Email address</label>
                            <input type="email" className=" emailinput login-input" id="inputemail" placeholder='something@gmail.com' aria-describedby="emailHelp"
                              value={email}
                              onChange={(e) => setEmail(e.target.value.toLowerCase())}
                              required
                              autoFocus />
                          </div>
                          
                          <div className="mb-4 d-flex flex-column">
                            <label htmlFor="passwordlabel" className="form-label">Password<span>*</span></label>
                            <input type="password" className=" password login-input" placeholder='********' id="passwordinput"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             required />
                          </div>
                          <div className="mb-3 d-flex flex-column forgotpw">
                            <Link to="/auth/forgot-password">Forgot your password ?</Link>
                          </div>
                          <button type="button" className="btn login-btn btn-primary">{loading ? "Waiting..." : "Login"}</button>
                          <p className='l-register mb-5 pb-3'>Dont have an account yet? <span> <a aria-current="page" href="/register">Register.</a></span></p>
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