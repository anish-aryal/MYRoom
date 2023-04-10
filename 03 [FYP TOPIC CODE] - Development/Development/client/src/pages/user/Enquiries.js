// pages/user/ad/AdCreate.js
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/card";
import { useAuth } from "../../context/auth";
import './animation.css'

import Sidebar from "../../components/nav/sidebar";

export default function Enquiries() {
    const [auth, setAuth] = useAuth();
    // state
    const [ads, setAds] = useState([]);
    
  
    useEffect(() => {
      if (auth?.token) fetchWishlist();
    }, [auth?.token]);
  
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get(`/enquiredByUser`);
        setAds(data);
 
      } catch (err) {
        console.log(err);
      
      }
    };
  

    return (
    <div className="container-fluid">
        <div className="row">
            <div className ="col-3 col-lg-2  p-0 justify-content-center"> <div><Sidebar /></div></div>
                <div className ="col-9 col-lg-10 pl-0 pr-4 mt-5">
                  <div className="container">
                  <div className="col-10 mt-5 ">
                        <h1 className="adH1">Enquired Ads.</h1>
                     
                        <p className="w-75 adP"> All the ads you enquired are showcased below. </p>
                    </div>
                    {ads?.length > 0 ?(<div className="row">
                    {ads?.map((ad) => (
                        <>
                        <Card ad={ad} key={ad._id} />
                        </>
                    ))}
                    </div>) :<div className="d-flex justify-content-center nothinghight align-items-center">
                                <p className="  sl btn-shine text-animation" target="_blank">No Ads have been enquired yet.</p>
                            </div>
                        }
                  </div>
              
                </div>
                

            </div>
                
        </div>
        
    );
}

