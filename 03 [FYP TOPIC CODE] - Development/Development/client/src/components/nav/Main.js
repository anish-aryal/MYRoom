import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../context/auth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import './nav.css'


export default function Main() {
    const [auth, setAuth] = useAuth();

    //const to navigate to different pages
    const navigate = useNavigate();


    //logout function
    const logout = () => {
        setAuth({ user: null, token: "", refreshToken: "" });
        localStorage.removeItem("auth");
        toast.success("Logged out successfully");
        navigate("/");
      }

    const dash =()=>{
        navigate("/dashboard");

    }
    const navlogo =()=>{
        navigate("/");

    }

    const onlylocalnav = [ 
        "/login",
        "/register", 
        "/dashboard",  
        "/create/ad",  
        "/create/ad/sell/Apartment",  
        "/create/ad/sell/Room",  
        "/create/ad/rent/Room",  
        "/create/ad/rent/Apartment",
        "/user/profile",
        "/update-password",
        "/update/ad/:slug",
        "/wishlist",
        "/enquiries"
    ];
    
    const location = useLocation();
    if (onlylocalnav.some(pattern => location.pathname.startsWith(pattern.replace(':slug', '')))) {
        return null;
    }
    

  
  

    //granting access to loggedin user
    const logged = auth?.user !== null && auth.token !=="" && auth.refreshToken !=="";

    const postAd =()=>{
        if (logged) {
            navigate("/create/ad");
        }else{
        navigate("/login");
        }
    }
  

    return (
  <nav className="navbar p-4 navbar-expand-lg bg-body-tertiary">
  <div className="container">
    {/* <a className="navbar-brand" href="/"></a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className={`collapse navbar-collapse ${onlylocalnav.includes(location.pathname) ? 'justify-content-end' : 'justify-content-between'}`} id="navbarNav">
    <div onClick={navlogo} className={`navlogo ${onlylocalnav.includes(location.pathname) ? 'd-none' : ''}`} >

    </div>
    <div className="justify-content-end  w-50"> 
        <ul className="nav justify-content-between">
               
                <NavLink className="nav-link " aria-current="page" to="/">
                    Home
                </NavLink>
           
              

                <NavLink className="nav-link " aria-current="page" to="/rent">
                    Rent
                </NavLink>

                <NavLink className="nav-link " aria-current="page" to="/buy">
                    Buy
                </NavLink>

                <NavLink className="nav-link " aria-current="page" to="/search">
                    Search
                </NavLink>
            
              


                
              

                {logged ?(
                <>
                <button className=" loadmore sr addnew" onClick={postAd}>+ List your Property</button>
                <div className="dropdown pointer">
                <li
                    className="nav-link pointer dropdown-toggle"
                    data-bs-toggle="dropdown"
                >
                    {auth?.user?.firstname? auth?.user?.firstname : auth?.user?.username }
             
                <ul className="dropdown-menu">
                    <li>
                        <a className="nav-link" onClick={dash} href="/dashboard">Dashboard</a>
                    </li>
                    <li>
                    <a className="nav-link" onClick={logout}  href='/'>Logout</a>
                    </li>
                </ul>
                </li>
                </div>
                </>):(<>
                <NavLink className="nav-link " to="/register">
                    Register
                </NavLink>
                <NavLink className="nav-link  loginbtn" to="/login">
                    Login
                </NavLink>
                </>)}
         </ul>
    </div>
   
    </div>
  </div>
</nav>




     
    );
}
