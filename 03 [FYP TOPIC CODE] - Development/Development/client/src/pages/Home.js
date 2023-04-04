// import { useAuth } from "../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card.js";
import SearchForm from "../components/forms/SearchForm.js";




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
   
    <div className="container mt-4">
      <div className="row  homebanner">
        <div className="col-12 d-flex pt-5 pb-5 mt-5 mb-5 justify-content-center searchbox relative">
         
              <SearchForm className="pt-5  pb-5 "/>

           
        </div>
      </div>
            
       <div className="apartmentsForSell mt-5 pt-3" >

            <div className=" homesectiontitle">
              <h5 className="sm" > Apartments for Sell</h5>
            </div>
           
            <div className="container">
                <div className="row">
                {apartmentForSell?.map((ad) => (
                <Card ad={ad} key={ad._id} />
                ))
                }
                </div>
            </div>
          </div>

          <div className="roomsForSell mt-5 pt-3" >
            <div className="homesectiontitle sm">
            <h5 > Rooms for Sell</h5>
            </div>
            
            <div className="container">
                <div className="row">
                {roomForSell?.map((ad) => (
                <Card ad={ad} key={ad._id} />
                ))
                }
                </div>
            </div>
          </div>
      <div className="apartmentsForRent mt-5 pt-3" >
        <div className="homesectiontitle sm">
        <h5 > Apartments for Rent</h5>
        </div>
       
         <div className="container">
            <div className="row">
            {apartmentForRent?.map((ad) => (
            <Card ad={ad} key={ad._id} />
            ))
            }
            </div>
         </div>
        </div>

          <div className="roomsForRent mt-5 pt-3" >
          <div className="homesectiontitle sm">
              <h5 > Rooms for Rent</h5>
          </div>
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