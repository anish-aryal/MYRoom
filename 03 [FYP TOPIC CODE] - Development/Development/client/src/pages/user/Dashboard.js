import Sidebar from "../../components/nav/sidebar";
import Main from "../../components/nav/Main";
import './Dashboard.css'

export default function Dashboard() {

    
    return (
    <div className="container-fluid">
        <div className="row">
            <div className ="col-3 col-lg-2 p-0 justify-content-center"> <div  className="dashside" ><Sidebar /></div></div>
                <div className ="col-9">
                    <Main />
                    
                </div>
                
        </div>
        
    </div>
    );
}