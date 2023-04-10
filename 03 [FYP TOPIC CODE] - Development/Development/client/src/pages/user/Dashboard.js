import Sidebar from "../../components/nav/sidebar";
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
    const [section, setSection] = useState('apartmentSell');

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
     
            setAds(ads);
            setApartmentSellAds(apartmentSell);
            setRoomSellAds(roomSell);
            setRoomRentAds(roomRent);
            setApartmentRentAds(apartmentRent);
     
          
        } catch (err) {
          console.log(err);
        }
      };
      


    return (
    <div className="container-fluid">
        <div className="row">
        
            <div className ="col-3 col-lg-2 p-0" >
                <Sidebar />
            </div>
            <div className ="col-9  col-lg-10 "> 
                    <div className="container ">
                        
                        <div className="row ">
                            <div className="col-12 dashboard-banner p-3  sticky-top text-center">
                                <h1 className="d-flex flex-column sb "> You have posted
                                </h1>
                            </div>
                                <div className="col-12 mt-3 pt-5 sticky-top bg-white pb-2" style={{top:"130px",zIndex:'6'}}>
                                    <button
                                        className="togglebutton px-3 py-2 apartmentsforsell"
                                        onClick={() => setSection('apartmentSell')}
                                    >
                                        Apartments For Sell
                                    </button>
                                    <button
                                        className="togglebutton ml-4 px-3 py-2 roomsforsell shadow-none"
                                        onClick={() => setSection('roomSell')}
                                    >
                                        Rooms For Sell
                                    </button>
                                    <button
                                        className="togglebutton ml-4 px-3 py-2 roomsforrent shadow-none"
                                        onClick={() => setSection('roomRent')}

                                    >
                                        Rooms For Rent
                                    </button>
                                    <button
                                        className="togglebutton ml-4 px-3 py-2 apartmentsrent shadow-none"
                                        onClick={() => setSection('apartmentRent')}
                                    >
                                        Apartments For Rent
                                    </button>
                                </div>
                         

                            <div className="col-12 mt-5 px-5 py-3 ">
                                <div className="row dashboardSellingRooms" style={{ display: section === 'roomSell' ? '' : 'none' }}>
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> <h1> {totalroomsell} </h1> Room for sell</span>
                                       
                                       </h5>
                                    </div>
                                    {ads?.filter(ad => ad?.action === 'Sell' && ad?.type === 'Room').map(ad => (
                                        <Updatecard ad={ad} key={ad._id}/>
                                    ))}
                                   
                                </div>
                                <div className="row dashboardSellingApartments"  style={{ display: section === 'apartmentSell' ? '' : 'none' }} >
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> <h1>   {totalapartmentsell} </h1> Apartment for sell</span>
                                      
                                       </h5>
                                    </div>
                                    {ads?.filter(ad => ad?.action === 'Sell' && ad?.type === 'Apartment').map(ad => (
                                        <Updatecard ad={ad}  key={ad._id}/>
                                    ))}
                                 
                                 
                                </div>
                                <div className="row dashboardRentingApartments" style={{ display: section === 'apartmentRent' ? '' : 'none' }}>
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> <h1>{totalapartmentrent} </h1> Apartment for rent</span>
                                   
                                       </h5>
                                    </div>

                                    {ads?.filter(ad => ad?.action === 'Rent' && ad?.type === 'Apartment').map(ad => (
                                        <Updatecard ad={ad} key={ad._id} />
                                    ))}
                                 
                                </div>
                                <div className="row dashboardRentingRooms" style={{ display: section === 'roomRent' ? '' : 'none' }}>
                                    <div className="col-12">
                                        <h5 className="sb"> <span className="sb"> <h1>{totalroomrent} </h1> Room for rent</span>

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

