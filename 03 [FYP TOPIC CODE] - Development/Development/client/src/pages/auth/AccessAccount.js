// AccountActivate.js
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function AccessAccount() {
  const [auth, setAuth] = useAuth();
  // hooks
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) requestAccess();
  }, [token]);

  const requestAccess = async () => {
    const { data } = await axios.post(`/access-account`, {
      resetCode:token,
    });
    if (data.error) {
      toast.error(data.error);
    } else {
       
      //saving in local storage
      localStorage.setItem("auth", JSON.stringify(data));

      setAuth(data);
      toast.success("Account recovered. Update your password.");
      navigate("/update-password");
    }
  };

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      Please wait...
    </div>
  );
}