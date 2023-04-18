import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Avatar } from "antd";
import Card from "../components/card";
import Sidebar from "../components/nav/sidebar";




export default function Publicprofile() {

    const params = useParams();

    const [user, setUser] = useState(null);
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
       if(params?.username) fetchuser();

    },[params?.username]);

    const fetchuser = async () => {
        try{
            const {data} = await axios.get(`/user/${params.username}`);
            console.log(data.user);
            setUser(data.user);
            setAds(data.ads);
            setLoading(false);
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    };
    if (loading) return <h4 className="text-danger">Loading...</h4>;
  

  return (
    <div className="container">
    <div className="row">
        
            <div className ="col-12 mt-5 col-lg-12">
              <div className="container">
                <div className="row justify-content-center mt-5 pr-5">
                {user?.photo?.Location ? (
                    <Avatar
                        src={user?.photo?.Location}
                        shape="circle"
                        size={200}
                    
                    />
                    ) : (
                    <Avatar
                        src={
                        "https://cdn-icons-png.flaticon.com/512/138/138661.png?w=1380&t=st=1680618337~exp=1680618937~hmac=eb0368c1c6baec28a7dbc858173b6eb382e47822a432fdf5332c04e499cb3f70"
                        }
                        shape="circle"
                        size={200}
                    
                    />
                )}
                <div className="col-12 text-center align-items center mt-3">
                    <h1>{user?.firstname} {user?.lastname}</h1>
                    <div className="mt-3">
                    <p className="h5 sr"> {user?.email} </p>
                    <p className="h5 sm">{user?.phone}</p>
                    </div>
                    
                   
                </div>
                </div>
                <div className="row">
                <div className="col-12 text-left align-items center h4 mt-5">Recent Listings</div>
                   {ads?.map((ad) =>(
                          <Card ad={ad} key={ad._id} />
                   ))}
                </div>
                </div>
              </div>
        </div>
        {/* <pre>{JSON.stringify(auth.user, null, 2)}</pre> */}
  </div>
   
  );
};