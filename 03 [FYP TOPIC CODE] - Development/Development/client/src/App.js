import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Main from "./components/nav/Main";
// import Cards from './components/Card';
import { Toaster } from "react-hot-toast";

import "./index.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "../src/pages/auth/ForgotPassword.js";
import ActivateAccount from "../src/pages/auth/ActivateAccount.js";
import AccessAccount from "../src/pages/auth/AccessAccount.js";
import Dashboard from "../src/pages/user/Dashboard.js";
import Postad from "./pages/user/Ad/Postad";
import LoggedInRoute from "./components/routes/PrivateRoute";
import AdCreate from "./pages/user/Ad/Postad";


function MainWithRoutes() {
  const location = useLocation();

  if (location.pathname === "/dashboard" || location.pathname === "/create/ad") {
    return (
      <>
        <Toaster />
        <Routes>
          <Route path="/" element={<LoggedInRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create/ad" element={<Postad />} />
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
          <Route path="/auth/post/ad" element={<AdCreate />}/>
    
          
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
