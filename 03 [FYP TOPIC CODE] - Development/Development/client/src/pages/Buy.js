// // // import { useAuth } from "../context/auth";
// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import Card from "../components/card.js";
// // import SearchForm from "../components/forms/SearchForm.js";

// // export default function Buy() {
// //   // context
// // //   const [auth, setAuth] = useAuth();

 
// //   const [apartmentForSell, setApartmentForSell] = useState();

// //   const [roomForSell, setRoomForSell] = useState();

// //   useEffect(() => {
// //     fetchAds();
// //   },[]);
// //     const fetchAds = async () => {
// //       try {
// //         const { data } = await axios.get("/ads-for-sell");


// //         setApartmentForSell(data.apartmentForSell);

// //         setRoomForSell(data.roomForSell);
// //       } catch (err) {
// //         console.log(err);
// //       }
// //     };

  
 
  


// //   return (
   
// //     <div className="container mt-4">
// //       <SearchForm />

// //       <div className="row mt-5">
// //         <div className="col-12">
// //           <button className="togglebutton px-3 py-2">Apartments</button>
// //           <button className="togglebutton ml-4 px-3 py-2">Rooms</button>
// //         </div>
// //       </div>
// //        <div className="apartmentsForSell mt-5" >
// //             <h6 > Apartments for Sell</h6>
// //             <div className="container">
// //                 <div className="row">
// //                 {apartmentForSell?.map((ad) => (
// //                 <Card ad={ad} key={ad._id} />
// //                 ))
// //                 }
// //                 </div>
// //             </div>
// //           </div>

// //           <div className="roomsForSell mt-5" >
// //             <h6 > Rooms for Sell</h6>
// //             <div className="container">
// //                 <div className="row">
// //                 {roomForSell?.map((ad) => (
// //                 <Card ad={ad} key={ad._id} />
// //                 ))
// //                 }
// //                 </div>
// //             </div>
// //           </div>
// //           {/* <pre>{JSON.stringify(auth.user, null, 2)}</pre> */}
// //   </div>

// //   );
// // }
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "../components/card.js";
// import SearchForm from "../components/forms/SearchForm.js";

// export default function Buy() {
//   const [apartmentForSell, setApartmentForSell] = useState([]);
//   const [roomForSell, setRoomForSell] = useState([]);
//   const [showApartments, setShowApartments] = useState(true);

//   useEffect(() => {
//     fetchAds();
//   }, []);

//   const fetchAds = async () => {
//     try {
//       const { data } = await axios.get("/ads-for-sell");
//       setApartmentForSell(data.apartmentForSell);
//       setRoomForSell(data.roomForSell);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleToggleApartments = () => {
//     setShowApartments(true);
//   };

//   const handleToggleRooms = () => {
//     setShowApartments(false);
//   };

//   return (
//     <div className="container mt-4">
//       <SearchForm />

//       <div className="row mt-5">
//         <div className="col-12">
//           <button
//             className="togglebutton px-3 py-2 focus"
//             onClick={handleToggleApartments}
//           >
//             Apartments
//           </button>
//           <button
//             className="togglebutton ml-4 px-3 py-2"
//             onClick={handleToggleRooms}
//           >
//             Rooms
//           </button>
//         </div>
//       </div>

//       {showApartments ? (
//         <div className="apartmentsForSell mt-5">
//           <h6> Apartments for Sell</h6>
//           <div className="container">
//             <div className="row">
//               {apartmentForSell.map((ad) => (
//                 <Card ad={ad} key={ad._id} />
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="roomsForSell mt-5">
//           <h6> Rooms for Sell</h6>
//           <div className="container">
//             <div className="row">
//               {roomForSell.map((ad) => (
//                 <Card ad={ad} key={ad._id} />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card.js";
import SearchForm from "../components/forms/SearchForm.js";

export default function Buy() {
  const [apartmentForSell, setApartmentForSell] = useState([]);
  const [roomForSell, setRoomForSell] = useState([]);
  const [showApartments, setShowApartments] = useState(true);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads-for-sell");
      setApartmentForSell(data.apartmentForSell);
      setRoomForSell(data.roomForSell);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleApartments = () => {
    setShowApartments(true);
    const apartmentButton = document.querySelector(".togglebutton.apartments");
    const roomButton = document.querySelector(".togglebutton.rooms");
    apartmentButton.classList.add("isclicked");
    roomButton.classList.remove("isclicked");
  };

  const handleToggleRooms = () => {
    setShowApartments(false);
    const apartmentButton = document.querySelector(".togglebutton.apartments");
    const roomButton = document.querySelector(".togglebutton.rooms");
    apartmentButton.classList.remove("isclicked");
    roomButton.classList.add("isclicked");
  };

  return (
    <div className="container mt-4">
      <SearchForm />

      <div className="row mt-5">
        <div className="col-12">
          <button
            className="togglebutton px-3 py-2 apartments isclicked"
            onClick={handleToggleApartments}
          >
            Apartments
          </button>
          <button
            className="togglebutton ml-4 px-3 py-2 rooms shadow-none"
            onClick={handleToggleRooms}
          >
            Rooms
          </button>
        </div>
      </div>

      {showApartments ? (
        <div className="apartmentsForSell mt-5">
          <h6> Apartments for Sell</h6>
          <div className="container">
            <div className="row">
              {apartmentForSell.map((ad) => (
                <Card ad={ad} key={ad._id} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="roomsForSell mt-5">
          <h6> Rooms for Sell</h6>
          <div className="container">
            <div className="row">
              {roomForSell.map((ad) => (
                <Card ad={ad} key={ad._id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

