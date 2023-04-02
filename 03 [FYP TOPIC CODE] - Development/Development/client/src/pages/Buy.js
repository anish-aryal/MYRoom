// import { useAuth } from "../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card.js";

export default function Buy() {
  // context
//   const [auth, setAuth] = useAuth();

 
  const [apartmentForSell, setApartmentForSell] = useState();

  const [roomForSell, setRoomForSell] = useState();

  useEffect(() => {
    fetchAds();
  },[]);
    const fetchAds = async () => {
      try {
        const { data } = await axios.get("/ads-for-sell");


        setApartmentForSell(data.apartmentForSell);

        setRoomForSell(data.roomForSell);
      } catch (err) {
        console.log(err);
      }
    };
 
  


  return (
   
    <div className="container">
       <div className="apartmentsForSell" >
            <h6 > Apartments for Sell</h6>
            <div className="container">
                <div className="row">
                {apartmentForSell?.map((ad) => (
                <Card ad={ad} key={ad._id} />
                ))
                }
                </div>
            </div>
          </div>

          <div className="roomsForSell" >
            <h6 > Rooms for Sell</h6>
            <div className="container">
                <div className="row">
                {roomForSell?.map((ad) => (
                <Card ad={ad} key={ad._id} />
                ))
                }
                </div>
            </div>
          </div>
          {/* <pre>{JSON.stringify(auth.user, null, 2)}</pre> */}
  </div>

  );
}