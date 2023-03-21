import Sidebar from "../../../components/nav/sidebar";
import Main from "../../../components/nav/Main";

export default function Postad() {

    
    return (
    <div className="container-fluid">
        <div className="row">
            <div className ="col-3 p-0 justify-content-center"> <Sidebar /></div>
                <div className ="col-9">
                    <Main />
                </div>
        </div>
    </div>
    );
}