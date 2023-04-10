import { NavLink } from "react-router-dom";
import '../nav/sidebar.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import {FcExpired} from 'react-icons/fc'



export default function Sidebar(){

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();


  const sidelogo =()=>{
    navigate("/");



}

    return (
  <div className="col-12  d-lg-block align-content-center p-0" id='sidebar' style={{"z-index":"23"}}>
    <div className="d-flex justify-content-center p-0">
      <div onClick={sidelogo} className="navlogo mt-4 pointer"> </div>
      </div>
    <div>
      <ul className="nav side-col  flex-column mt-4 p-0">
   
          <NavLink className="nav-link side-item mt-1" aria-current="page" to="/dashboard"> <i className="bi bi-house-door"></i> Overview</NavLink>

          {auth.user.role.includes("Admin") && (
            <NavLink className="nav-link side-item mt-1" to="/userlist">
              <i className="bi bi-fingerprint" /> MyRoom Users
            </NavLink>
          )}
          
          <NavLink className="nav-link side-item mt-1" to="/create/ad"> <i className="bi bi-house-add" /> CreateAd</NavLink>

          <NavLink className="nav-link side-item " style={{marginTop: '-5px'}} to="/expiredAds"> <span className="mr-1" style={{fontSize: '26px'}}><FcExpired /></span> Expired Ads</NavLink>
     
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
    );
}

