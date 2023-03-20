import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../context/auth.js";
import { useNavigate } from "react-router-dom";

export default function Main() {
    const [auth, setAuth] = useAuth();

    //const to navigate to different pages
    const navigate = useNavigate();


    //logout function
    const logout =()=>{
        setAuth(null);
        localStorage.removeItem("auth");
        navigate("/login");

    }

    const dash =()=>{
        navigate("/dashboard");

    }

    const location = useLocation();
    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    //granting access to loggedin user
    const logged = auth.user !== null && auth.token !=="" && auth.refreshToken !=="";

    return (
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    {/* <a className="navbar-brand" href="/"></a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
    <div className="justify-content-end  w-50"> 
        <ul className="nav justify-content-between">
               
                <NavLink className="nav-link" aria-current="page" to="/">
                    Home
                </NavLink>
           
            
                {!logged ?(
                <>
                <NavLink className="nav-link " to="/register">
                    Register
                </NavLink>
                <NavLink className="nav-link " to="/login">
                    Login
                </NavLink>
                </>):("")}
      
  
                <NavLink className="nav-link disabled " to="/">Disabled</NavLink>

                {logged ?(
                <>
                <div className="dropdown">
                <li
                    className="nav-link pointer dropdown-toggle"
                    data-bs-toggle="dropdown"
                >
                    {auth?.user?.name? auth.user.name : auth.user.username }
             
                <ul className="dropdown-menu">
                    <li>
                        <a className="nav-link" onClick={dash} href="/dashboard">Dashboard</a>
                    </li>
                    <li>
                    <a className="nav-link" onClick={logout} href="/">Logout</a>
                    </li>
                </ul>
                </li>
                </div>
                </>):("")}
         </ul>
    </div>
   
    </div>
  </div>
</nav>




        // <div className="d-flex justify-content-end">
        //     <ul className="nav justify-content-between w-50">
        //         <li className="nav-item">
        //         <NavLink className="nav-link" aria-current="page" to="/">
        //             Home
        //         </NavLink>
        //         </li>
        //         <li className="nav-item">
        //         <NavLink className="nav-link " to="/register">
        //             Register
        //         </NavLink>
        //         </li>
        //         <li className="nav-item">
        //         <NavLink className="nav-link " to="/login">
        //             Login
        //         </NavLink>
        //         </li>
        //         <li className="nav-item">
        //         <NavLink className="nav-link disabled " to="/">Disabled</NavLink>
        //         </li>
            //     <div className="dropdown">
            //     <li>
            //     <NavLink
            //         className="nav-link pointer dropdown-toggle"
            //         data-bs-toggle="dropdown"
            //     >
            //         User
            //     </NavLink>
            //     <ul className="dropdown-menu">
            //         <li>
            //         <NavLink className="nav-link" to={`/dashboard`}>
            //             Dashboard
            //         </NavLink>
            //         </li>
            //         <li>
            //         <NavLink className="nav-link">Logout</NavLink>
            //         </li>
            //     </ul>
            //     </li>
            //     </div>
            //     </ul>
            //  </div>
     
        );
        }
