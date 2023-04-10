// pages/user/ad/AdCreate.js

import Sidebar from "../../../components/nav/sidebar";
import "./Postad.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdCreate() {
        // state
        const [sell, setSell] = useState(false);
        const [rent, setRent] = useState(false);
        // hooks
        const navigate = useNavigate();

        const handleSell = () => {
        setSell(true);
        setRent(false);
        };

        const handleRent = () => {
        setRent(true);
        setSell(false);
        };
    
    return (
    <div className="container-fluid">
        <div className="row">
            <div className ="col-3 col-lg-2 col-xxl-1 p-0 justify-content-center"> <div><Sidebar /></div></div>
                <div className ="col-9 col-lg-10 mt-5">      
                <div className="row justify-content-center">
                    <div className="col-10 mt-5 ">
                        <h1 className="adH1">Welcome to Ad Posting!</h1>
                     
                        <p className="w-75 adP"> Please select the type of ad you wish to post from the options below. </p>
                    </div>
                    <div className="col-10 mt-1">
                    <div className="row mt-4">
                        <div className="col-lg-6">
                        <button onClick={handleSell} className={sell ? " active-button col-12   sr " : "inactive-button col-12  sr"}>
                            <span className="h4">FOR SELL</span>
                        </button>
                            
                        </div>

                        <div className="col-lg-6">
                        <button onClick={handleRent} className={rent ? " active-button col-12  sr " : "inactive-button col-12  sr"}>
                            <span className="h4">FOR RENT</span>
                        </button>
                        
                        </div>
                    
                    </div>
                    {sell && (
                         <div className="row mt-2 p-3">
                            <div className="col-6 p-0">
                                <button onClick={()=> navigate(`/create/ad/sell/Room`)} className="roomBtn col-12 border-0 h5">ROOM / FLAT</button>
                            </div>
                            <div className="col-6 p-0 ">
                                <button onClick={()=> navigate(`/create/ad/sell/Apartment`)} className="apartmentBtn col-12 border-0 h5">APARTMENT</button>
                            </div>
                        </div>
                    )}
                    {rent && (
                        <div className="row mt-2 p-3">
                            <div className="col-6 p-0">
                            <button onClick={()=> navigate(`/create/ad/rent/Room`)} className="roomBtn col-12 border-0 h5">ROOM / FLAT</button>
                            </div>
                            <div className="col-6 p-0 ">
                                <button onClick={()=> navigate(`/create/ad/rent/Apartment`)} className="apartmentBtn col-12 border-0 h5">APARTMENT</button>
                            </div>
                        </div>
                    )}
                </div>
                </div>
                
                </div>
            </div>
                
        </div>
        
    );
}

