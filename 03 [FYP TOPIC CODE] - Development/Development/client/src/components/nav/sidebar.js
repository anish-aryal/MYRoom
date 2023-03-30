import { NavLink } from "react-router-dom";
import '../nav/sidebar.css'
import { useNavigate } from "react-router-dom";



export default function Sidebar(){

  const navigate = useNavigate();

  const sidelogo =()=>{
    navigate("/");

}

    return (

<div className="sticky">
  <div className="col-12  d-lg-block align-content-center pe-0 collapse accordion-collapse" id="sidebar">
  <button className="btn d-lg-none ms-lg-0 bg-light  me-5" id="burger" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-expanded="false" aria-controls="sidebar" aria-label="Toogle Navigation"><i className="bi bi-list" /></button>
    <div className="d-flex justify-content-center p-0">
    <div onClick={sidelogo} className="image-container mt-4 pointer"> </div>
      <button className="btn d-lg-none ms-lg-0 bg-light mt-3 ms-4 " id="burger" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-expanded="false" aria-controls="sidebar" aria-label="Toogle Navigation"><i className="bi bi-list" /></button>
    </div>
    <div>
      <ul className="nav side-col  flex-column mt-4">
   
          <NavLink className="nav-link side-item mt-1" aria-current="page" to="/dashboard"> <i className="bi bi-house-door"></i> Dashboard</NavLink>
     
   
          <NavLink className="nav-link side-item mt-1" style={{color: '#303972'}} to="/chat"><i className="bi bi-wechat" />  Chat</NavLink>
    
       
          <NavLink className="nav-link side-item mt-1" to="/create/ad"> <i className="bi bi-house-add" /> CreateAd</NavLink>
      
     
          <NavLink className="nav-link side-item mt-1" to="/wishlist"> <i className="bi bi-heart-half"></i> Wishlist</NavLink>
    
        
          <NavLink className="nav-link side-item mt-1 " to="/enquiries"> <i className="bi bi-envelope"></i> Enquiries</NavLink>
    

          <NavLink className="nav-link side-item mt-1" to="/user/profile"> <i className="bi bi-person-fill-gear" />Update Profile</NavLink>
   
   
          <NavLink className="nav-link side-item mt-1" to="/update-password"> <i className="bi bi-fingerprint" /> Password</NavLink>
      
        
         
      </ul>
      <p className="copy mt-5">
        <strong>MyRoom User Dashboard</strong> <br />
        Made by Anish Aryal</p>
    </div>
  </div>
</div>
  
 


    // <div className="col-10 sidecontainer  d-lg-block align-content-center pe-0 collapse accordion-collapse" id="sidebar">
    //     <div className="d-flex p-0">
    //      <h5 className="mt-4 ps-3 pb-2"> School's Logo</h5>
    //      <button className="btn d-lg-none ms-lg-0 bg-light mt-3 ms-4 " id="burger" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-expanded="false" aria-controls="sidebar" aria-label="Toogle Navigation"><i className="bi bi-list" /></button>
    //    </div>
    //    <div>
    //      <ul className="nav nav-pills flex-column mt-2">
    // //       <li className="nav-item ms-2 mt-5 mb-3 p-1 active">
    // //         <NavLink className="nav-link" aria-current="page" to="/"> <i className="bi bi-house-fill  pe-3" /> Dashboard</NavLink>
    // //       </li>
    // //       <li className="nav-item ms-2 mb-3 p-1">
    // //         <NavLink className="nav-link " style={{color: '#303972'}} href="#"> <i className="fa-solid fa-person-chalkboard pe-2" /> Teachers</NavLink>
    // //       </li>
    // //       <li className="nav-item ms-2 mb-3 p-1">
    // //         <NavLink className="nav-link" href="#"> <i className="fa-solid fa-user-tie  pe-3" /> Students</NavLink>
    // //       </li>
    // //       <li className="nav-item ms-2 mb-3 p-1">
    // //         <NavLink className="nav-link" href="#"> <i className="fa-solid fa-people-roof  pe-3" /> Class</NavLink>
    // //       </li>
    // //       <li className="nav-item ms-2 mb-3 p-1">
    // //         <NavLink className="nav-link" href="#"> <i className="fa-solid fa-calendar  pe-3" /> Events</NavLink>
    // //       </li>
    // //       <li className="nav-item ms-2 mb-3 p-1">
    // //         <NavLink className="nav-link" href="#"> <i className="fa-regular fa-comment  pe-3" /> Chats</NavLink>
    // //       </li>
    // //       <li className="nav-item ms-2 mb-3 p-1">
    // //         <NavLink className="nav-link" href="#"> <i className="bi bi-activity  pe-3" /> Latest Activity</NavLink>
    // //       </li>
    // //       <li className="nav-item ms-2 mb-3 p-1">
    // //         <NavLink className="nav-link" href="#"> <i className="fa-solid fa-coins  pe-3" /> Finance</NavLink>
    // //       </li>
    // //       <li className="nav-item ms-2 mb-3 p-1">
    // //         <NavLink className="nav-link" href="#"> <i className="fa-solid fa-coins  pe-3" /> Finance</NavLink>
    // //       </li>
    //      </ul>
    //      <p className="mt-5 ms-2">
    //        <strong>School's Name Admin Dashboard</strong> <br />
    //        Made by Ants Pvt Ltd</p>
    //    </div>
    //  </div> 




    );
}

