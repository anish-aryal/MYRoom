import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Main from "./components/nav/Main";
// import Cards from './components/Card';
import { Toaster } from "react-hot-toast";
import { SearchProvider } from "./context/search";
import Chat from "./pages/Chat/Chat";



import UpdatePassword from "./pages/user/UpdatePassword";

import "./index.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "../src/pages/auth/ForgotPassword.js";
import ActivateAccount from "../src/pages/auth/ActivateAccount.js";
import AccessAccount from "../src/pages/auth/AccessAccount.js";

import LoggedInRoute from "./components/routes/PrivateRoute";
import AdCreate from "./pages/user/Ad/Postad";
import SellApartment from "../src/components/forms/SellApartment.js";
import SellRoom from "./components/forms/SellRoom";
import RentRoom from "./components/forms/RentRoom";
import RentApartment from "./components/forms/RentApartment";
import Viewpage from "./pages/user/Ad/viewpage";
import UpdateAd from "./pages/user/Ad/UpdateAd";
import Dashboard from "../src/pages/user/Dashboard.js";
import UserProfile from "../src/pages/user/UserProfile.js";
import Wishlist from "../src/pages/user/Wishlist.js";
import Enquiries from "../src/pages/user/Enquiries";
import UserList from "../src/pages/UserList.js";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import ExpiredAdsPage from "./pages/user/ExpiredAds";

// search
import Search from "./pages/Search";





function MainWithRoutes() {

 
  

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
          <Route path="/buy" element={<Buy />}/>
          <Route path="/rent" element={<Rent />}/>
        
          <Route path="/search" element={<Search />}/>
    
          <Route path="/" element={<LoggedInRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create/ad" element={<AdCreate />}/>
            <Route path="/wishlist" element={<Wishlist />}/>
            <Route path="/enquiries" element={<Enquiries />}/>
            <Route path="user/profile" element={<UserProfile />}/>
            <Route path="update/ad/:slug" element={<UpdateAd />}/>
            <Route path="update-password" element={<UpdatePassword />}/>
            <Route path="create/ad/sell/Apartment" element={<SellApartment />} />
            <Route path="create/ad/sell/Room" element={<SellRoom />} />
            <Route path="create/ad/rent/Room" element={<RentRoom />} />
            <Route path="create/ad/rent/Apartment" element={<RentApartment />} />
            <Route path="userlist" element={<UserList />} />
            <Route path="chat" element={<Chat />} />
            <Route path="expiredAds" element={<ExpiredAdsPage />} />
          
          </Route>
          
          
        </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
        <Routes>
          <Route path="/*" element={<MainWithRoutes />} />
        </Routes>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
