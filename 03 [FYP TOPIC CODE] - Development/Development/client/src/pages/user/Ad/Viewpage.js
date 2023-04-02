import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../../../components/Carousel";
import { MdLocationOn } from 'react-icons/md';
import LikeFeature from "../../../components/Likefeature";
import Googlemap from "../../../components/Googlemap";
import React from "react";
import Card from "../../../components/card";
import ContactForm from "./ContactForm";




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

    const descriptionWithLineBreaks = ad?.description
  .split('.')
  .map((sentence, index) => (
    <React.Fragment key={index}>
      {sentence.trim() + '.'}
      <br/><br/>
    </React.Fragment>
  ));

    useEffect(() =>{
        if (params?.slug) getAd();

    },[params?.slug]);

   

    function formatPrice(x){
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    const createdAt = ad?.createdAt; // assuming that ad.createdAt contains the creation time
    const elapsedTime = new Date() - new Date(createdAt); // time elapsed since createdAt in milliseconds
    let text = '';
    if (elapsedTime < 1000) {
      // less than a second
      text = `1 s ago.`;
    } else if (elapsedTime < 1000 * 60) {
      // less than a minute
      const seconds = Math.floor(elapsedTime / 1000);
      text = `${seconds} s${seconds !== 1 ? "" : ""} ago.`;
    } else if (elapsedTime < 1000 * 60 * 60) {
      // less than an hour
      const minutes = Math.floor(elapsedTime / (1000 * 60));
      text = `${minutes} min${minutes !== 1 ? "s" : ""} ago.`;
    } else if (elapsedTime < 1000 * 60 * 60 * 24) {
      // less than a day
      const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
      text = `${hours} hr${hours !== 1 ? "s" : ""} ago.`;
    } else if (elapsedTime < 1000 * 60 * 60 * 24 * 30) {
      // less than a month
      const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
      text = `${days} day${days !== 1 ? "s" : ""} ago`;
    } else {
      // a month or more
      const months = Math.floor(elapsedTime / (1000 * 60 * 60 * 24 * 30));
      text = `${months} month${months !== 1 ? "s" : ""} ago`;
    }
 
 

    return (
        <div className="container" id="top">
            <div className="row ">
                <div className="col-9 pl-0 pt-5 pb-3 ">
               
                    <div className="mb-3">
                    <span className="typeofad sl">{ad?.type} for {ad?.action} / Posted by: <span className="viewpostedby">{ad?.postedBy?.firstname}  </span>   </span>
                    </div>
                  
                    <p className="viewTitle  d-flex flex-column">{ad?.title}
                    <span className="viewAddress "> <MdLocationOn className="viewAddressMark"/> {ad?.address}</span>
                    </p>
                    <div className="mb-3">
                        <span className="viewposted px-3 py-2"> {text}</span>
                       <LikeFeature ad={ad}/>
                        
                    </div>
                </div>
                <div className="col-3 mt-4 pt-3 pb-3  d-flex justify-content-end">
                    <p className="viewPrice pt-5"><span className="rs ">NPR </span>{formatPrice(ad?.price)}<span className="priceend">/-</span>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 pl-0 col-lg-8 pr-0 pr-lg-4">
                            <Carousel photos={ad?.photos}/>
                        
                </div>
                <div className=" col-12 col-lg-4  contactseller pb-5">       
                  <ContactForm ad={ad}/>
                </div>
            </div>
            <div className="row">
                <div className=" col-12 highlightssection mt-4 ">
                    <div className=" py-4 ">
                        we show features in this section
                    </div>
                </div>
            </div>      
            <div className="row">
                <div className=" col-12  mt-4 p-0 ">
                    <Googlemap ad={ad}/>
                </div>
            </div>      
            <div className="row mt-4">
                <div className=" col-12 highlightssection mt-4 py-5 px-4 sr ">
                    {descriptionWithLineBreaks}
                </div>
            </div>      
            <div className="row">
                    <div className="col-12 text-center border-bottom">
                    <h1>Nearby {ad?.type.toLowerCase()}s for {ad?.action.toLowerCase()}</h1>
                    </div>            
                 
                    {related && related.length > 0 ? (
                    related.map((ad) => (
 
                            <Card  ad={ad} key={ad._id}
                             
                            />
                
                     ))
                    ) : (
                    <p>Sorry, no ads near this property were found.</p>
                    )}
                 
            </div>
           
                
                <pre>
                    {JSON.stringify({ad, related}, null, 4)}
                </pre>
        
     </div>
       
    );
   
}