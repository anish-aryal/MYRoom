// Register.js
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './Register.css'

export default function Register() {
  // state for input fields
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //hooks 
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
      console.log(email, password);
   
      const {data} = await axios.post('/pre-register', {
        email,
        password,
        firstname,
       
      });
      setLoading(true);
      console.log(data);

      if(data?.error){
        toast.error(data.error);
        setLoading(false);
      }
      else{
        toast.success("Please check your email");
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
    // <div>
    //   <h1 className="display-1 bg-primary text-light p-5">Register</h1>
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-md-4 offset-md-4 mt-5">
    //         <form onSubmit={handleSubmit}>
    //           <input
    //             type="email"
    //             placeholder="Enter your email"
    //             className="form-control mb-4"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value.toLowerCase())}
    //             required
    //             autoFocus
    //           />

    //           <input
    //             type="password"
    //             placeholder="Enter your password"
    //             className="form-control mb-4"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             required
    //           />

    //           <button disabled={loading} className="btn btn-primary col-12 mb-4" >{loading ? "Waiting..." : "Register"}
    //           </button>
    //         </form>

    //         <a className="text-danger pointer">Forgot Password</a>
    //       </div>
    //     </div>
    //   </div>
    // </div>

      <div className="container-fluid">
          <div className='row'>
          <div className="col-4 rbimage ">
            </div>
            <div className="col-8 login-form pt-5 mb-5">
              <div className='row justify-content-center pt-3'>
                <div className='col-9 p-3 '>
                      <div className="rimage-container"> </div>
                      <div className='heading d-flex flex-column'>
                        <h1 className='pt-3'>Create an Account.</h1>
                        <p className="w-75">After Registering you will be able to chat with other users and owners directly,
    Ad you can even list your property to lease or to sell.</p>
                      </div>
                    <form className='row gx-3 pt-5' onSubmit={handleSubmit}>
                        <div className='d-flex col-6 mb-4 flex-column'>
                          <label htmlFor="fnamelabel" className="form-label" >First Name</label>
                          <input type="text" className=" fnameinput login-input" id="inputfname" placeholder='First Name' aria-describedby="FirstName" 
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                          autoFocus/>
                        </div>
                        <div className='d-flex col-6 mb-4 flex-column'>
                          <label htmlFor="lanamelabel" className="form-label" >Last Name</label>
                          <input type="text" className=" lnameinput login-input" id="inputlname" placeholder='Last Name' aria-describedby="LastName" />
                        </div>
                        <div className='d-flex col-6 mb-4 flex-column'>
                          <label htmlFor="emaillabel" className="form-label" >Email address</label>
                          <input type="email" className=" registeremailinput login-input"  id="inputemail" placeholder='something@gmail.com' aria-describedby="EmailAddress" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value.toLowerCase())}
                          required
                          autoFocus/>
                          
                        </div>
                        <div className='d-flex col-6 mb-4 flex-column'>
                          <label htmlFor="phonelabel" className="form-label" >Phone Number</label>
                          <input type="number" className=" phoneinput login-input" id="inputphone" placeholder='Phone Number' aria-describedby="PhoneNumber" />
                        </div>
                        <div className='d-flex col-6 flex-column'>
                          <label htmlFor="passwordlabel" className="form-label" >Password</label>
                          <input type="password" className=" passwordinput login-input" id="inputpassword" placeholder='********' aria-describedby="PasswordHelp" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required/>
                        </div>
                        <div className='d-flex col-6 flex-column'>
                          <label htmlFor="confirmPassword" className="form-label" >Confirm Password</label>
                          <input type="password " className=" confirmpassswordinput" id="inputconfirmpassword" placeholder='********' aria-describedby="ConfirmPassword" />
                        </div>
                        <div>
                          <div className=" col-12 check mt-4 mb-2">
                            <input type="checkbox" className="form-check-input ps-3 login-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Yes i want to receive important emails from My room like message notifications.</label>
                          </div>
                          <div className=" col-12 check mb-4">
                            <input type="checkbox" className="form-check-input ps-3 login-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">I agree to all the terms and conditions.</label>
                          </div>
                        </div>

                        <div className="col-12">
                        <button type="submit" className="btn login-btn btn-primary">{loading ? "Waiting..." : "Register"}</button>
                        <p className='l-register'>Already Have an Account?  <span><a href="/login">Login.</a></span></p>
                        </div>

                    </form>
                </div>
              </div>
            </div>

            </div>
      </div>
  );
}