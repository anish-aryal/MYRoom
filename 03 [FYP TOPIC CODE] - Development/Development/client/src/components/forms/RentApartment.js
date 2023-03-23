import Sidebar from "../../components/nav/sidebar";
import Main from "../../components/nav/Main";
import AdForm from "./AdForm";

export default function RentApartment() {

    
    return (
    <div className="container-fluid">
        <div className="row">
            <div className ="col-3 col-lg-2 col-xxl-1 p-0 justify-content-center"> <div ><Sidebar /></div></div>
                <div className ="col-9 col-lg-10">
                    <Main />
                    
                    <div className="row">
                        <div className="col-12 mt-5 ">
                            <AdForm action="Rent" type="Apartment" />
                        </div>
                    </div>
                    
                </div>
                
        </div>
        
    </div>
    );
}