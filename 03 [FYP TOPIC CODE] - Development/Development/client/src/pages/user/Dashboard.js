import Sidebar from "../../components/nav/sidebar";
import Main from "../../components/nav/Main";
import './Dashboard.css'
import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import Updatecard from "../../components/Updatecard";

export default function Dashboard() {

    const [auth, setAuth] = useAuth();
    const [ads, setAds] = useState();
    const [total , setTotal] = useState();
    const [apartmentSell, setApartmentSell] = useState([]);
    const [apartmentRent, setApartmentRentAds] = useState([]);
    const [roomSell, setRoomSell] = useState([]);
    const [roomRent, setRoomRent] = useState([]);

    useEffect(() => {
        fetchAds()
    }, [auth.token !== '']);

    const fetchAds = async () => {
        try {
          const { data } = await axios.get('/postedByUser');
          const { apartmentSell, apartmentRent, roomSell, roomRent, total } = data;
          const ads = [...apartmentSell, ...apartmentRent, ...roomSell, ...roomRent];
          setAds(ads);
          setTotal(total);
        } catch (err) {
          console.log(err);
        }
      };

    return (
    <div className="container-fluid">
        <div className="row">
            <div className ="col-3 col-lg-2 p-0 justify-content-center"> <div  className="dashside"><Sidebar /></div></div>
                <div className ="col-9">
                    <Main />
                    <div className="container">
                        <div className="row  ">
                            <div className="col-12 dashboard-banner sticky-top p-3 text-center">
                                <h1 className="d-flex flex-column sb "> Overview
                                </h1>
                            </div>
                            <div className="col-12 mt-5 px-5 py-3 ">
                                <div className="row">
                                    <h5>
                                         You posted {total} ads.
                                    </h5>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> Ads for selling Rooms</span>
                                       </h5>
                                    </div>
                                    {ads?.filter(ad => ad?.action === 'Sell' && ad?.type === 'Room').map(ad => (
                                        <Updatecard ad={ad} key={ad._id}/>
                                    ))}
                                   
                                 
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> Ads for Renting Apartment</span>
                                       </h5>
                                    </div>
                                    {ads?.filter(ad => ad?.action === 'Sell' && ad?.type === 'Apartment').map(ad => (
                                        <Updatecard ad={ad}  key={ad._id}/>
                                    ))}
                                 
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> Ads for selling Apartment</span>
                                       </h5>
                                    </div>
                                    {ads?.filter(ad => ad?.action === 'Rent' && ad?.type === 'Apartment').map(ad => (
                                        <Updatecard ad={ad} key={ad._id} />
                                    ))}
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> Ads for Renting Rooms</span>
                                       </h5>
                                    </div>
                                    {ads?.filter(ad => ad?.action === 'Rent' && ad?.type === 'Room').map(ad => (
                                        <Updatecard ad={ad} key={ad._id}/>
                                    ))}
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
        </div>
        
    </div>
    );
}

// {ads?.filter(ad => ad.type === 'Room' && ad.action === 'Sell')(ad => (
//     <Updatecard ad={ad} />
// ))}