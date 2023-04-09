import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import '..//..//pages/Login.css'
import {TbMoodSadDizzy} from 'react-icons/tb'

export default function Banned() {

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
        <div className="image-container"></div>
        <TbMoodSadDizzy style={{fontSize:'100px', fontWeight:'100'}}/>
      <h1>You have been banned. Because of unethical behaviour</h1>
      
      <div className="row">
      <h2>Redirecting to homepage in <span><h1>{count} seconds</h1> </span></h2>
      </div>
       
    </div>
  );
}