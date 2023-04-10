import {useState, useEffect} from 'react';
import { useAuth } from '../../../context/auth';
import{Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';



export default function ContactForm({ad}) {

    const [auth, setAuth] = useAuth();

    const [firstname ,setFirstName] = useState("");
    const [email ,setEmail] = useState("");
    const [phone ,setPhone] = useState("");
    const [message ,setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const loggedIn = auth.user !== null && auth.token !== '';

    useEffect(() => {
        if (auth.user !== null) {
            setFirstName(auth.user?.firstname);
            setEmail(auth.user?.email);
            setPhone(auth.user?.phone);
        }
    },[loggedIn]);

    const handleSubmit = async (e) => {
            e.preventDefault();
        if (auth.user === null && auth.token === "") {
          navigate("/login", {
            state: `/ad/${ad.slug}`,
          });
        }
        setLoading(true);
        try {
          // console.log(name, email, message, phone);
          const { data } = await axios.post("/contact-seller", {
            firstname,
            email,
            message,
            phone,
            adId: ad._id,
          });
          if (data?.error) {
            toast.error(data.error);
            setLoading(false);
          } else {
            toast.success("Thank you for your enquir. Email sent to the seller.");
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
          toast.error("Please Login to contact the Seller.");
        }
      };


    const navigate = useNavigate();


    return (
        <>   
        <div className=" pt-5">
            <h1 className="sm text-center">Contact {ad?.postedBy?.firstname},</h1>
        </div>
        <form className="pt-4" onSubmit={handleSubmit}>
            <div className="mb-4 d-flex flex-column">
                <input type="name" className=" password login-input" placeholder='Enter your name' id="passwordinput"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
            />
            </div>
            <div className='d-flex mb-4 flex-column'>
                <input type="email" className="  login-input" id="inputemail" placeholder='Enter your email' aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus 
                />
            </div>
            <div className="mb-4 d-flex flex-column">
                <input type="number" className=" phoneinput login-input" placeholder='Enter your phone number' id="phonenumberinput"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
          />
            </div>
            <div className="mb-4 d-flex flex-column">
            <textarea
                className="form-control mb-3 rounded-0 sr"
                placeholder="Write your message here..."
                style={{"resize": "none", "overflow":"scroll"}}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
             
                />
            </div>
            <button type="submit" className="btn login-btn btn-primary"
                // disabled={!firstname || !email || !phone || loading}
            >{loggedIn? loading ? "Sending" : "Send enquiry" :"Send enquiry"}</button>
        </form> 
         </>
       
    )
}