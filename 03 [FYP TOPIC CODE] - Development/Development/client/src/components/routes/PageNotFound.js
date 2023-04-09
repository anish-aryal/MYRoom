import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import '..//..//pages/Login.css'
import {TfiFaceSad} from 'react-icons/tfi'

export default function PageNotFound() {

    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1000);
        if (count === 0) {
            navigate("/");
        }
        return () => clearInterval(interval);
    })
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100" style={{marginTop:"-7%"}} >
      
        <TfiFaceSad style={{fontSize:'100px', color:" #a478d0"}}/>
      <div className="display-1 sr text-muted">Page Not Found</div>
      
      <div className="row">
      <h2 className="sm">Redirecting to homepage in <span><h1>{count} seconds</h1> </span></h2>
      </div>
       
    </div>
  );
}