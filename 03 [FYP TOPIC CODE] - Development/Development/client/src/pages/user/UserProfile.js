import Sidebar from "../../components/nav/sidebar";
import Main from "../../components/nav/Main";
import './Dashboard.css'
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import slugify from "slugify";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './Userprofile.css';
import UploadProfile from "./uploadprofile";
import axios from "axios";

export default function UserProfile() {
    const [auth, setAuth] = useAuth();
    const [username ,setUsername] = useState("");
    const [firstname ,setFirstname] = useState("");
    const [lastname ,setLastname] = useState("");
    const [email ,setEmail] = useState("");
    const [phone ,setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState('');
    const [uploading, setUploading] = useState(false);
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user !== null) {
            setUsername(auth.user?.username);
            setFirstname(auth.user?.firstname);
            setLastname(auth.user?.lastname);
            setEmail(auth.user?.email);
            setPhone(auth.user?.phone);
            setAddress(auth.user?.phone);
            setPhoto(auth.user?.photo);
        }
    },[auth.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          // console.log(username, name, email, company, address, phone, about, photo);
          const { data } = await axios.put("/update-profile", {
            username,
            firstname,
            email,
            lastname,
            address,
            phone,
            photo,
          });
          
          if (data?.error) {
            toast.error(data?.error);
            setLoading(false);
          } else {
            console.log("profile update response => ", data);
            setAuth({ ...auth, user: data });
    
            let fromLS = JSON.parse(localStorage.getItem("auth"));
            fromLS.user = data;
            localStorage.setItem("auth", JSON.stringify(fromLS));
            setLoading(false);
            toast.success("Profile updated");
          }
        } catch (err) {
          console.log(err);
          toast.error('username is already taken');
          setLoading(false);
        }
      };
    
    return (
    <div className="container-fluid">
        <div className="row">
            <div className ="col-3 col-lg-2 p-0 justify-content-center"> <div ><Sidebar /></div></div>
                <div className ="col-9 col-lg-10 pl-0 pr-4">
                    <Main />
                    <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-11">
                        <h1 className='pt-3'>Update Your Profile</h1>
                        <form className='row gx-3 pt-5' onSubmit={handleSubmit}>
                           <div className="col-12">
                                <UploadProfile photo={photo} setPhoto={setPhoto} uploading={uploading} setUploading={setUploading} />
                           </div>
                        <div className='d-flex col-6 mb-4 flex-column'>
                          <label htmlFor="fnamelabel" className="form-label" >First Name: {auth.user?.firstname}</label>
                          <input type="text" className=" fnameinput login-input" id="inputfname" placeholder='New first name' aria-describedby="FirstName" 
                          onChange={(e) => setFirstname(slugify(e.target.value))}
                          autoFocus/>
                        </div>
                       
                     
                        <div className='d-flex col-6 mb-4 flex-column'>
                          <label htmlFor="lanamelabel" className="form-label" >Last Name: {auth.user?.lastname}</label>
                          <input type="text" className=" lnameinput login-input" id="inputlname" placeholder='New last name' aria-describedby="LastName" 
                           value={lastname}
                           onChange={(e) => setLastname(slugify(e.target.value))}
                           autoFocus/>
                         
                        </div>
                        <div className='d-flex col-6 mb-4 flex-column'>
                          <label htmlFor="fnamelabel" className="form-label" >Username: {auth.user?.username}</label>
                          <input type="text" className=" usernameinput login-input" id="inputfname" placeholder='New username' aria-describedby="Username" 
                          onChange={(e) => setUsername(slugify(e.target.value))}
                          autoFocus/>
                        </div>
                        <div className='d-flex col-6 mb-4 flex-column'>
                          <label htmlFor="emaillabel" className="form-label" >Email address</label>
                          <input type="email" className="  emailinput "  id="inputemail" placeholder='something@gmail.com' aria-describedby="EmailAddress" 
                          value={email}
                          onChange={(e) => setEmail(slugify(e.target.value.toLowerCase()))}
                          disabled
                          autoFocus/>
                          
                        </div>
                        <div className='d-flex col-6 mb-4 flex-column'>
                          <label htmlFor="phonelabel" className="form-label" >Phone Number: {auth.user?.phone}</label>
                          <input type="number" className=" login-input" id="inputphone" placeholder='Phone number' aria-describedby="PhoneNumber" 
                    
                            onChange={(e) => setPhone(slugify(e.target.value.toLowerCase()))}
                            autoFocus/>
                        </div>
                        <div className='d-flex col-6 mb-4 flex-column'>
                          <label htmlFor="fnamelabel" className="form-label" >Address: {auth.user?.address}</label>
                          <input type="text" className=" addressinput login-input" id="inputfname" placeholder='New address' aria-describedby="address" 
                          onChange={(e) => setAddress(slugify(e.target.value))}
                          autoFocus/>
                        </div>            
                     
                  
                            <div className="col-12">
                                <button type="submit" className="btn login-btn btn-primary" disabled={loading}>{loading ? "Updating Your Profile" : "Update Profile"}</button>
                            </div>
                            
                    </form>
                    </div>
                </div>
                    </div>
               
                </div>
                   

            </div>
                
        </div>
        

    );
}