import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "../../../config";
import CurrencyInput from 'react-currency-input-field';
import "../../../pages/Login.css";
import UploadImage from "../../../components/forms/UploadImage";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/nav/sidebar";


export default function UpdateAd({action, type})  {

    const navigate = useNavigate();
    const [ad, setAd] = useState({
        _id: "",
        photos: "",
        uploading: false,
        price: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        parking:"",
        type,
        action,
        title:'',
        description:'',
        loading:false})

      const params = useParams();
      const [loaded , setLoaded] = useState(false);

      useEffect(()=>{
        if (params?.slug){
          fetchAd();
        }
      },[params?.slug])
      
      const fetchAd = async () => {
        try {
          const { data } = await axios.get(`/ad/${params.slug}`);
          setAd(data.ad);
          setLoaded(true);
          
        } catch (err) {
          
        }
      }


    const handleSubmit = async () => {
      try{
        setAd({...ad, loading:true});

        const {data} = await axios.put(`/ad/${ad._id}`, ad);
        if(data?.error){
          toast.error(data.error);
          setAd({...ad, loading:false});
        }
        else{
          toast.success('Ad Updated successfully');
          setAd({...ad, loading:false});
          navigate ("/dashboard");
        }

      }
      catch (err){
        console.log(err)
        setAd({...ad, loading:false});
      }
    }

    return (
      <div className="container-fluid">
        <div className="row">
            <div className ="col-3 col-lg-2 p-0 justify-content-center"> <Sidebar /></div>
                <div className ="col-9">
                <div className="container-fluid">
          <div className='row'>
        
            </div>
            <div className="col-12 login-form pt-3 mb-5">
           
                <div className='col-12  '>
                
                      <div className='heading d-flex flex-column'>
                        <h1 >Create an Ad.</h1>
                        <p className="w-75"> Update your Listing for <span> <h1>{ad.title}</h1></span>  {type} for {action}.</p>
                      </div>
                    <form className='row gx-3 pt-5' >
                        <div className=' col-6 mb-3'>
                        <UploadImage ad={ad} setAd={setAd} />
                        </div>

                        <div className='d-flex col-6 mb-3 flex-column address sr'>
                          <label htmlFor="fnamelabel" className="form-label" >Address</label>    
                                {loaded?(
                                  <GooglePlacesAutocomplete 
                                    apiKey={GOOGLE_PLACES_API_KEY}
                                    apiOptions={{ region: "au" }}
                                    selectProps={{
                                            defaultInputValue: ad?.address,
                                            placeholder: "Search for address..",
                                            onChange: ({ value }) => {
                                            // console.log("address onchange => ", value.description);
                                            setAd({ ...ad, address: value.description });
                                        },
                                }}
                                />):("")}
                        </div>

                        <div className='d-flex col-6 mb-3 flex-column title'>
                          <label htmlFor="phonelabel" className="form-label" >Ad Title</label>
                          <input
                            type="text"
                            className="form-control mb-3 rounded-0 sr"
                            placeholder="Enter title"
                            value={ad.title}
                            onChange={(e) => setAd({ ...ad, title: e.target.value })}
                            required
                            />
                        </div>

                        <div className='d-flex col-6 mb-3 flex-column price'>
                          <label htmlFor="confirmPassword" className="form-label" >Price</label>
                       { loaded? ( <CurrencyInput
                            placeholder="Enter price"
                            defaultValue={ad.price}
                            className="form-control  sr rounded-0"
                            onValueChange={(value) => setAd({ ...ad, price: value })}
                            />):("")}
                        </div>

                        <div className='d-flex col-6 mb-3 flex-column parking'>
                          <label htmlFor="emaillabel" className="form-label" >Parking</label>
                          <input type="number" min="0" className="form-control mb-3 rounded-0 sr" placeholder="Enter how many car parks"
                            value={ad.parking}
                            onChange={(e) => setAd({ ...ad, parking: e.target.value })}
                            required
                            />
                          
                        </div>

                        <div className='d-flex col-6 mb-3 flex-column bathrooms'>
                          <label htmlFor="passwordlabel" className="form-label" >Bathrooms</label>
                          <input type="number" min="0" className="form-control mb-3 rounded-0 sr" placeholder="Enter how many bathrooms" 
                            value={ad.bathrooms}
                            onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
                            required
                        />
                        </div>
                      
                        <div className='d-flex col-6 mb-3 flex-column bedrooms'>
                          <label htmlFor="confirmPassword" className="form-label" >Number of Bedrooms</label>
                          <input
                                type="number"
                                min="0"
                                className="form-control mb-3 rounded-0 sr"
                                placeholder="Enter how many bedrooms"
                                value={ad.bedrooms}
                                onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
                                required
                            />
                        </div>

                        <div className='d-flex col-6 mb-3 flex-column description'>
                          <label htmlFor="lanamelabel" className="form-label" >Description of property</label>
                          <textarea
                            className="form-control mb-3 rounded-0 sr"
                            value={ad.description}
                            placeholder="Write description"
                            onChange={(e) => setAd({ ...ad, description: e.target.value })}
                            required
                            />
                        </div>
                        
                        <div className="col-12">
                        <button onClick={handleSubmit} type="button" className="login-btn" disabled={ad.loading} >{ad.loading ? "Verifying information.." :"Post Ad"}</button>
                        </div>

                    </form>
                  
                </div>
              </div>
            </div>
                </div>
                
        </div>
        
    </div>
      
            


    );
}