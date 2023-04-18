import Sidebar from "../../components/nav/sidebar";

import AdForm from "./AdForm.js";

export default function SellRoom() {

    
    return (
    <div className="container-fluid">
        <div className="row">
            <div className ="col-3 col-lg-2 col-xxl-1 p-0 justify-content-center"> <div ><Sidebar /></div></div>
                <div className ="col-9 col-lg-10 mt-5">
       
                    
                    <div className="row mt-5">
                        <div className="col-12 mt-5 ">
                            <AdForm action="Sell" type="Room" />
                        </div>
                    </div>
                    
                </div>
                
        </div>
        
    </div>
    );
}