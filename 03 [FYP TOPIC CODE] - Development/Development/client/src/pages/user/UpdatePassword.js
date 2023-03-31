import Sidebar from "../../components/nav/sidebar";

import './Dashboard.css'
import { useState} from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function UpdatePassword() {

    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
   




    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            // console.log({username,firstname,lastname,email,phone,address})
            setLoading(true)
            const {data} = await axios.put(`/update-password`, {password});
            if (data?.error){
                toast.error(data.error);
                setLoading(false);
            }
            else{
                console.log("Password Updated")
                
                setLoading(false);
                toast.success("Password Changed Sucessfully")
            }
        }
        catch(err){
            console.log(err)

        }
    }


    
    return (
    <div className="container-fluid">
        <div className="row">
            <div className ="col-3 col-lg-2 p-0 justify-content-center"> <div ><Sidebar /></div></div>
            <div className ="col-9 col-lg-10 pl-0 pr-5">
        
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-11">
                                <h1 className='pt-3  mt-3' style={{"text-decoration":"underline"}}> Update Your Password </h1>
                                <form className='row gx-3 pt-5 justify-content-center' onSubmit={handleSubmit}>
                                    <div className="col-6">
                                        <div className="row">
                                        <div className='d-flex col-12 mb-4 flex-column'>
                                            <label htmlFor="fnamelabel" className="form-label" >New Password</label>
                                            <input type="password" className=" passwordinput login-input" id="inputpassword" placeholder='*********' aria-describedby="password" 
                                            value={password}
                                            onChange={(e) => setPassword((e.target.value))}
                                            autoFocus/>
                                            </div>            
                                            <div className="col-12">
                                                <button type="submit" className="btn login-btn btn-primary" disabled={loading}>{loading ? "Updating Your Password" : "Update Password"}</button>
                                            </div>
                                        </div>
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