// pages/user/ad/AdCreate.js
import axios from "axios";
import { useEffect, useState } from "react";
import ExpiredCard from "../../components/ExpiredCard";
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/nav/sidebar";

export default function ExpiredAds() {
    const [auth, setAuth] = useAuth();
    // state
    const [ads, setAds] = useState([]);
  
    useEffect(() => {
      if (auth?.token) fetchExpiredAds();
    }, [auth?.token]);
  
    const fetchExpiredAds = async () => {
      try {
        const { data } = await axios.get(`/expiredAds`);
        setAds(data);
        console.log(data)

      } catch (err) {
        console.log(err);

      }
    };
  
    return (
    <div className="container-fluid">
        <div className="row">
            
            <div className ="col-3 col-lg-2  p-0 justify-content-center"> <div><Sidebar /></div></div>
            
                <div className ="col-9 col-lg-10 pl-0 pr-5">
                    <div className="row"></div>
                    <div className="col-10 mt-5 ">
                            <h1 className="adH1">Expired Ads</h1>
                            <p className="w-75 adP"> All the ads you liked are showcased here. </p>
                        </div>
                {ads?.length > 0 ?(     
                     <div className="row">
                        {ads?.map((ad) => (
                            <>
                            <ExpiredCard ad={ad} key={ad._id} />
                            </>
                        ))}
                    </div>) :<div className="d-flex justify-content-center nothinghight align-items-center">
                                <p className="  sl btn-shine text-animation" target="_blank">No Ads have been expired Yet.</p>
                            </div>}
                </div>
                

            </div>
            {/* <pre>{JSON.stringify(auth.user, null, 2)}</pre> */}
      </div>
        
    );
}

