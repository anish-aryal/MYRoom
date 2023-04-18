import Sidebar from "../../components/nav/sidebar";
import Main from "../../components/nav/Main";
import AdForm from "./AdForm.js";

export default function SellApartment() {

    
    return (
    <div className="container-fluid">
        <div className="row">
            <div className ="col-3 col-lg-2 p-0 col-xxl-1 justify-content-center"> <div><Sidebar /></div></div>
                <div className ="col-9 col-lg-10 mt-5">
                    
                    <div className="row mt-5">
                        <div className="col-12 mt-5 ">
                            <AdForm action="Sell" type="Apartment" />
                        </div>
                    </div>
                    
                </div>
                
        </div>
        
    </div>
    );
}