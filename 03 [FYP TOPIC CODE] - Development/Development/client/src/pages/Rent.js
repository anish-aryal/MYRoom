import { useAuth } from "../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card.js";
import SearchForm from "../components/forms/SearchForm";

export default function Rent() {
  // context
  const [auth, setAuth] = useAuth();

  const [apartmentForRent, setApartmentForRent] = useState();

  const [roomForRent, setRoomForRent] = useState();


  useEffect(() => {
    fetchAds();
  },[]);
    const fetchAds = async () => {
      try {
        const { data } = await axios.get("/ads-for-rent");

        setApartmentForRent(data.apartmentForRent);

        setRoomForRent(data.roomForRent);

      } catch (err) {
        console.log(err);
      }
    };
 
  


  return (
   
    <div className="container">
      <SearchForm />
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
             
          <pre>{JSON.stringify(auth.user, null, 2)}</pre>
  </div>

  

  );
}