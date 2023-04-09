import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Nopermission from "./Nopermission";


const LoggedInRoute = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    if (auth?.token) getCurrentUser();
  }, [auth?.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/current-user`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setIsBanned(data.isBanned);
      setOk(true);
    } catch (err) {
      setOk(false);
    }
  };

  if (isBanned) {
    return <Navigate to="/banned" />;
  }

  return ok ? <Outlet /> : <Nopermission />;
};

export default LoggedInRoute;
