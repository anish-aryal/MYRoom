import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {IoLogoWechat} from "react-icons/io5";
import {AiOutlineMenu} from "react-icons/ai";
import {Avatar} from "antd";
import {RxExit} from "react-icons/rx";

import './nav.css'


export default function Main() {
    const [auth, setAuth] = useAuth();

    //const to navigate to different pages
    const navigate = useNavigate();
    const location = useLocation();


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

    //granting access to loggedin user
    const logged = auth?.user !== null && auth.token !=="" && auth.refreshToken !=="";

    const postAd =()=>{
        if (logged) {
            navigate("/create/ad");
        }else{
        navigate("/login");
        }
    }
    //dont show nav in login and signup page
    if (location.pathname === "/login" || location.pathname === "/register"){
        return null;
    }
  

    return (
        <div className="container-fluid globalnav position-fixed bg-white" style={{"z-index":"20"}}>
            <nav className="navbar pl-2 pr-5 py-3 navbar-expand-lg bg-body-tertiary justify-content-between">
                <div className="d-flex text-center align-items-center">
                    <AiOutlineMenu className="text-center align-item-center" style={{fontSize: '32px', color:'#000000'}}/>
                    <div className="navlogo ml-2 mb-2 py-2"></div>
                </div> 
               
                <div  id="navbarNav">
                    <div onClick={navlogo} />
                    <ul className="nav text-center align-items-center">
                                
                                    <NavLink className="nav-link " aria-current="page" to="/">
                                        Home
                                    </NavLink>
                            
                                    <NavLink className="nav-link " aria-current="page" to="/rent">
                                        Rent
                                    </NavLink>

                                    <NavLink className="nav-link " aria-current="page" to="/buy">
                                        Buy
                                    </NavLink>

                                    <NavLink className="nav-link text-center align-items-center justifycontent-center d-flex" aria-current="page" to="/chat"style={{fontSize: '26px',}}>
                                        <IoLogoWechat /> <span className="pl-1" style={{fontSize: '14px'}}>Chat</span> 
                                    </NavLink>
                                

                                    {logged ?(
                                    <>
                                    <button className=" loadmore sr addnew" onClick={postAd}>+ List your Property</button>
                                    <div className="dropdown pointer ml-2">
                                    <li
                                        className="nav-link pointer dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                    >
                                        {auth.user?.photo?.Location ? (
                                            <Avatar
                                                src={auth.user?.photo?.Location}
                                                shape="circle"
                                                size={32}
                                            
                                            />
                                            ) : (
                                            <Avatar
                                                src={
                                                "https://cdn-icons-png.flaticon.com/512/138/138661.png?w=1380&t=st=1680618337~exp=1680618937~hmac=eb0368c1c6baec28a7dbc858173b6eb382e47822a432fdf5332c04e499cb3f70"
                                                }
                                                shape="circle"
                                                size={32}
                                            
                                            />
                                            )} {auth?.user?.firstname? auth?.user?.firstname : auth?.user?.username }
                                
                                    <ul className="dropdown-menu" >
                                        <li className="dropdown-item">
                                            <a className="nav-link" onClick={dash} href="/dashboard">Dashboard</a>
                                        </li>
                                        <li className="dropdown-item">
                                         <a className="nav-link" onClick={logout}  href='/'> <RxExit style={{fontSize: '16px', marginTop:'-5px'}}/>  Logout</a>
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
    
            </nav>
        </div>
 
    );
}
