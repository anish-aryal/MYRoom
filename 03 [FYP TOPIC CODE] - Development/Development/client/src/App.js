import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Main from "./components/nav/Main";
// import Cards from './components/Card';
import { Toaster } from "react-hot-toast";
import UpdatePassword from "./pages/user/UpdatePassword";

import "./index.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "../src/pages/auth/ForgotPassword.js";
import ActivateAccount from "../src/pages/auth/ActivateAccount.js";
import AccessAccount from "../src/pages/auth/AccessAccount.js";
import Dashboard from "../src/pages/user/Dashboard.js";
import UserProfile from "../src/pages/user/UserProfile.js";

import LoggedInRoute from "./components/routes/PrivateRoute";
import AdCreate from "./pages/user/Ad/Postad";
import SellApartment from "../src/components/forms/SellApartment.js";
import SellRoom from "./components/forms/SellRoom";
import RentRoom from "./components/forms/RentRoom";
import RentApartment from "./components/forms/RentApartment";
import Viewpage from "./pages/user/Ad/Viewpage";

function MainWithRoutes() {
  const location = useLocation();
  const onlylocalnav = [  "/dashboard",  "/create/ad",  "/create/ad/sell/Apartment",  "/create/ad/sell/Room",  "/create/ad/rent/Room",  "/create/ad/rent/Apartment","/user/profile",'/update-password'];
  
  if (onlylocalnav.includes(location.pathname)) {
    return (
      <>
        <Toaster />
       <Routes>
          <Route path="/" element={<LoggedInRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create/ad" element={<AdCreate />}/>
            <Route path="user/profile" element={<UserProfile />}/>
            <Route path="update-password" element={<UpdatePassword />}/>
            <Route path="create/ad/sell/Apartment" element={<SellApartment />} />
            <Route path="create/ad/sell/Room" element={<SellRoom />} />
            <Route path="create/ad/rent/Room" element={<RentRoom />} />
            <Route path="create/ad/rent/Apartment" element={<RentApartment />} />
          
          </Route>
          
          
        </Routes>
      </>
    );
  }

  return (
    <>
      <Main />
      <Toaster />
      {/* <Cards /> */}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/activate-account/:token" element={<ActivateAccount />} />
          <Route path="/auth/access-account/:token" element={<AccessAccount />}/>
          <Route path="/auth/forgot-password" element={<ForgotPassword />}/>
          <Route path="/ad/:slug" element={<Viewpage />}/>
         
          
          
        </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
         
       
          <Route path="/*" element={<MainWithRoutes />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
