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
 
    const [page, setPage] = useState(1);



    const [apartmentSellAds, setApartmentSellAds] = useState([]);
    const [roomSellAds, setRoomSellAds] = useState([]);
    const [roomRentAds, setRoomRentAds] = useState([]);
    const [apartmentRentAds, setApartmentRentAds] = useState([]);

    const [totalapartmentsell, settotalsApartmentSell] = useState();
    const [totalroomsell, settotalroomsell] = useState();
    const [totalroomrent, settotalsRoomrent] = useState();
    const [totalapartmentrent, settotalsApartmentRent] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAds()
    }, [auth.token !== '',page]);

    const fetchAds = async () => {
        try {
          const { data } = await axios.get(`/postedByUser/${page}`);
          const { apartmentSell, apartmentRent, roomSell, roomRent, totalapartmentsell, totalroomsell, totalroomrent, totalapartmentrent } = data;
          const ads = [...apartmentSell, ...apartmentRent, ...roomSell, ...roomRent];
          settotalsApartmentSell(totalapartmentsell);
          settotalroomsell(totalroomsell);
          settotalsRoomrent(totalroomrent);
          settotalsApartmentRent(totalapartmentrent);
          if (page === 1) {
            setAds(ads);
            setApartmentSellAds(apartmentSell);
            setRoomSellAds(roomSell);
            setRoomRentAds(roomRent);
            setApartmentRentAds(apartmentRent);
          } else {
            setAds(prevAds => [...prevAds, ...ads]);
            setApartmentSellAds((prevAds) => [...prevAds, ...apartmentSell]);
            setRoomSellAds((prevAds) => [...prevAds, ...roomSell]);
            setRoomRentAds((prevAds) => [...prevAds, ...roomRent]);
            setApartmentRentAds((prevAds) => [...prevAds, ...apartmentRent]);
          }

          
        } catch (err) {
          console.log(err);
        }
      };
      
      const handleLoadMoreApartmentSell = () => {
        setPage((prevPage) => prevPage + 1);
        setLoading(true);
    };

    const handleLoadMoreRoomSell = () => {
        setPage((prevPage) => prevPage + 1);
        setLoading(true);
    };

    const handleLoadMoreRoomRent = () => {
        setPage((prevPage) => prevPage + 1);
        setLoading(true);
    };

    const handleLoadMoreApartmentRent = () => {
        setPage((prevPage) => prevPage + 1);
        setLoading(true);
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
                                <div className="row dashboardSellingRooms">
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> <h1> {totalroomsell} </h1> Room for sell</span>
                                       
                                       </h5>
                                    </div>
                                    {ads?.filter(ad => ad?.action === 'Sell' && ad?.type === 'Room').map(ad => (
                                        <Updatecard ad={ad} key={ad._id}/>
                                    ))}
                                   
                                    <div className="col-12 d-flex justify-content-end">
                                        <button className=" loadmore py-2 px-3 sr" onClick={handleLoadMoreRoomSell} >Load more</button>
                                    </div>
                                </div>
                                <div className="row dashboardSellingApartments">
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> <h1>   {totalapartmentsell} </h1> Apartment for sell</span>
                                      
                                       </h5>
                                    </div>
                                    {ads?.filter(ad => ad?.action === 'Sell' && ad?.type === 'Apartment').map(ad => (
                                        <Updatecard ad={ad}  key={ad._id}/>
                                    ))}
                                       <div className="col-12 d-flex justify-content-end">
                                        <button className=" loadmore py-2 px-3 sr" onClick={handleLoadMoreApartmentSell}>Load more</button>
                                    </div>
                                 
                                </div>
                                <div className="row dashboardRentingApartments">
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> <h1>{totalapartmentrent} </h1> Apartment for rent</span>
                                   
                                       </h5>
                                    </div>

                                    {ads?.filter(ad => ad?.action === 'Rent' && ad?.type === 'Apartment').map(ad => (
                                        <Updatecard ad={ad} key={ad._id} />
                                    ))}
                                       <div className="col-12 d-flex justify-content-end">
                                        <button className=" loadmore py-2 px-3 sr" onClick={handleLoadMoreApartmentRent}>Load more</button>
                                    </div>
                                </div>
                                <div className="row dashboardRentingRooms">
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> <h1>{totalroomrent} </h1> Room for rent</span>

                                       </h5>
                                    </div>
                                    {ads?.filter(ad => ad?.action === 'Rent' && ad?.type === 'Room').map(ad => (
                                        <Updatecard ad={ad} key={ad._id}/>
                                    ))}
                                       <div className="col-12 d-flex justify-content-end">
                                        <button className=" loadmore py-2 px-3 sr" onClick={handleLoadMoreRoomRent}>Load more</button>
                                    </div>
                                 
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