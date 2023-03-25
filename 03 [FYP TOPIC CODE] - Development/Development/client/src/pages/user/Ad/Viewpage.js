import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../../../components/Carousel";
import { MdLocationOn } from 'react-icons/md';



export default function Viewpage (){
    const params = useParams();
    
    const [ad, setAd] = useState();
    const [related, setRelated] = useState();
   

    const getAd = async () => {
        try{
            const {data} = await axios.get(`/ad/${params.slug}`);
            setAd(data.ad);
            setRelated(data.related);
        } catch (err){
            console.log(err);
        }
    }


    useEffect(() =>{
        if (params?.slug) getAd();

    },[params?.slug]);

  
    

 
 

    return (
        <div className="container">
            <div className="row">
                <div className="col-8 pt-5">
                    <p className="viewTitle px-3 d-flex flex-column">{ad?.title}
                    <span className="viewAddress "> <MdLocationOn className="viewAddressMark"/> {ad?.address}</span>
                    </p>
                </div>
                <div className="col-12">
                    <Carousel photos={ad?.photos}/>
                    <pre>
                        {JSON.stringify({ad, related}, null, 4)}
                    </pre>
                </div>
            </div>
        </div>
       
    );
   
}