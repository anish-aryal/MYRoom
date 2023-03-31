// pages/user/ad/AdCreate.js
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/card";
import { useAuth } from "../../context/auth";

import Sidebar from "../../components/nav/sidebar";

export default function Enquiries() {
    const [auth, setAuth] = useAuth();
    // state
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (auth?.token) fetchWishlist();
    }, [auth?.token]);
  
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get(`/enquiredByUser`);
        setAds(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
  
    if (loading) {
      return (
        <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ marginTop: "-7%" }}
        >
          <div className="display-1">Loading...</div>
        </div>
      );
    }
    return (
    <div className="container-fluid">
        <div className="row">
            <div className ="col-3 col-lg-2  p-0 justify-content-center"> <div><Sidebar /></div></div>
                <div className ="col-9 col-lg-10 pl-0 pr-4">
                {ads?.length > 0 ?(      <div className="row">
                    {ads?.map((ad) => (
                        <>
                        <Card ad={ad} key={ad._id} />
                        </>
                    ))}
                    </div>) :"You have not yet enquired any properties."}
                </div>
                

            </div>
                
        </div>
        
    );
}

