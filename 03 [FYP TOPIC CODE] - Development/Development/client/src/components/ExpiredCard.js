import './card.css'
import { useEffect } from 'react';
import { AiOutlineCar } from 'react-icons/ai';
import { GiBathtub } from 'react-icons/gi';
import { BsSignNoParking } from 'react-icons/bs';
import { RiHotelBedLine } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';

export default function ExpiredCard({ad}){

    function formatPrice(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const createdAt = ad?.createdAt; // assuming that ad.createdAt contains the creation time
    const elapsedTime = new Date() - new Date(createdAt); // time elapsed since createdAt in milliseconds
    let text = '';
    if (elapsedTime < 1000) {
      // less than a second
      const milliseconds = Math.floor(elapsedTime);
      text = `${milliseconds} ms${milliseconds !== 1 ? "" : ""} ago.`;
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

    useEffect(() => {
      const body = document.querySelector('#root');
  
      body.scrollIntoView({
          behavior: 'smooth'
      }, 1000)
  
  }, []);

    return(
            <div className=" col-md-6 col-lg-4 p-4 gx-4 gy-2  " id='cardtop' key={ad._id}>
                <Link to={`/repost/ad/${ad.slug}`} className="text-decoration-none text-dark">
                <Badge.Ribbon text={text} color="#9052D0" style={{'fontFamily':'sr'}}>
                    <div className=" card ">
                        <img src={ad?.photos?.[0].Location} className="card-img-top adimage" style={{"max-eight":"200px", "height":"200px"}} alt={`${ad?.type}=${ad?.title}-${ad?.action}`} />
                        <div className="card-body py-2 px-3">
                            <div className=" cardtitle d-flex justify-content-between  align-item-center pt-2 mb-3">
                                <h6 className='adtitle'>{ad?.title}</h6>
                                <h6 className='adprice'><span className='pricetag'>NPR</span>{formatPrice(ad?.price)}</h6>
                            </div>
                            <p className='features d-flex justify-content-between pb-2 mt-2'>
                                <span><RiHotelBedLine className='icons'/>{ad.bedrooms}</span>
                                <span><GiBathtub className='icons' />{ad.bathrooms}</span>
                                {ad?.parking ? (<span> <AiOutlineCar className='icons'/></span>): (<span><BsSignNoParking className='icons'/></span>)}
                                </p>
                            <div>
                            <p className='adaddress text-center mb-1'><MdLocationOn className='iconsmark mb-1' />{ad?.address}</p>
                            </div>
                        
                        </div>
                    </div>
                </Badge.Ribbon>
                </Link>
            </div>
      
    
    )
} 