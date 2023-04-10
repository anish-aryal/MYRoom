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
import { useAuth } from "../../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import OpenChatButton from "../../../components/OpenChatButton";
import {  IoLogoWechat } from "react-icons/io5";


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Viewpage (){
    const params = useParams();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    
    const [ad, setAd] = useState();
    const [related, setRelated] = useState();

  

    const [open, setOpen] = React.useState(false);
    const [dialogOpened, setDialogOpened] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    
  
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
    
    
  const handlenameclick = () => {
    navigate(`/user/${ad.postedBy.username}`);
  }

  function handleReportClick() {
    axios.put(`/report/${ad.postedBy._id}`)
      .then(res => {
        setOpen(false);
        // handle successful response
        console.log(res.data.message);
        toast.success(res.data.message);
      })
      .catch(err => {
        // handle error response
        console.error(err.response.data.error);
      });
  }



    return (
        <div className="container" id="top">
            <div className="row ">
                <div className="col-9 pl-0 pt-5 pb-3 ">
               
                    <div className="mb-3">
                    <span className="typeofad sl">{ad?.type} for {ad?.action} / Posted by: <span className="viewpostedby pointer" onClick={handlenameclick}>{ad?.postedBy?.firstname}  </span>   </span>
                    </div>
                  
                    <p className="viewTitle  d-flex flex-column">{ad?.title}
                    <span className="viewAddress "> <MdLocationOn className="viewAddressMark"/> {ad?.address}</span>
                    </p>
                    <div className="mb-3 d-flex justify-content-between">
                      <div className="">
                        <span className="viewposted px-3 py-2"> {text}</span>
                        <LikeFeature ad={ad}/>
                      </div>
                    
                    </div>
                    
                </div>
                <div className="col-3 mt-4 d-flex flex-column text-right" >
                  <div className="">  
                      <p className="viewPrice pt-5"><span className="rs ">NPR </span>{formatPrice(ad?.price)}<span className="priceend">/-</span></p>
                  </div>
                  
                    <div className="">
                                <button className="isclicked px-4 py-2 text-white"
                                style={{fontSize:'14px'}}
                                  onClick={() => {
                                    axios.post('/chat', { senderId: auth?.user?._id, receiverId: ad?.postedBy?._id })
                                      .then((response) => {
                                        console.log(response);
                                        axios.post('/messages', { chatId: response.data._id, senderId: auth?.user?._id, text: "hi" })
                                          .then((response) => {
                                            console.log(response);
                                            navigate('/chat');
                                            toast.success('Seller Has been added to your chat list');
                                          })
                                          .catch((error) => {
                                            console.log(error);
                                          })
                                      })
                                      .catch((error) => {
                                        console.log(error);
                                      })
                                  }}
                                >
                                  <IoLogoWechat className="mr-2" style={{fontSize:'24px', color:'#7B30C8'}} />Have a Chat
                                </button>
                      </div>
                    
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
            <div className="div">
            <button
              onClick={() => {
                axios.post('/chat', { senderId: auth?.user?._id, receiverId: ad?.postedBy?._id })
                  .then((response) => {
                    console.log(response);
                    axios.post('/messages', { chatId: response.data._id, senderId: auth?.user?._id, text: "hi" })
                      .then((response) => {
                        console.log(response);
                        navigate('/chat');
                        toast.success('Seller Has been added to your chat list');
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  })
                  .catch((error) => {
                    console.log(error);
                  })
              }}
            >
              Message
            </button>
           
           
            <div>
              <Button variant="outlined" onClick={handleClickOpen}>
                Report
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle className="text-center text-white sb"  style={{  "backgroundColor": "#8557b2"}}>{"Are you sure?"}</DialogTitle>
                <DialogContent  >
               <DialogContentText className=" p-3 pt-5 sm"  id="alert-dialog-slide-description">
                   We take all reports seriously and investigate them thoroughly to maintain the integrity of our platform. Use this feature to only report any suspicious activity or content that violates our Terms of Use.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                  <Button className="text-white  sm" style={{backgroundColor:"#7B30C8", border:'0', borderRadius:'0'}} onClick={handleReportClick}>Report</Button>
                </DialogActions>
              </Dialog>
              {!dialogOpened && (
                <script>
                  {window.onload = handleClickOpen}
                </script>
              )}
            </div>
         

            </div>
                <pre>
                    {JSON.stringify({ad, related}, null, 4)}
                </pre>
        
     </div>

       
    );
   
}