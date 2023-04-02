// import { useAuth } from "../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card.js";

export default function Home() {
  // context
  // const [auth, setAuth] = useAuth();

  const [apartmentForRent, setApartmentForRent] = useState();
  const [apartmentForSell, setApartmentForSell] = useState();
  const [roomForRent, setRoomForRent] = useState();
  const [roomForSell, setRoomForSell] = useState();

  useEffect(() => {
    fetchAds();
  },[]);
    const fetchAds = async () => {
      try {
        const { data } = await axios.get("/ads");

        setApartmentForRent(data.apartmentForRent);
        setApartmentForSell(data.apartmentForSell);
        setRoomForRent(data.roomForRent);
        setRoomForSell(data.roomForSell);
      } catch (err) {
        console.log(err);
      }
    };
 
  


  return (
   
    <div className="container mt-5 pt-3">
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
      <div className="apartmentsForRent " >
         <h6 > Apartments for Rent</h6>
         <div className="container">
            <div className="row">
            {apartmentForRent?.map((ad) => (
            <Card ad={ad} key={ad._id} />
            ))
            }
            </div>
         </div>
        </div>

          <div className="roomsForRent" >
            <h6 > Rooms for Rent</h6>
            <div className="container">
                <div className="row">
                {roomForRent?.map((ad) => (
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