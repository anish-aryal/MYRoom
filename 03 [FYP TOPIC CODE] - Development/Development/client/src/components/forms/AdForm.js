import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "../../config";
import CurrencyInput from 'react-currency-input-field';
import "../../pages/Login.css";
import UploadImage from "./UploadImage";


export default function AdForm({action, type})  {

    const [ad, setAd] = useState({
        photos: "",
        uploading: false,
        price: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        parking:"",
        type:'',
        title:'',
        description:'',
        loading:false})
    return (
        <div className="container-fluid">
          <div className='row'>
        
            </div>
            <div className="col-12 login-form pt-3 mb-5">
           
                <div className='col-12  '>
                
                      <div className='heading d-flex flex-column'>
                        <h1 >Create an Ad.</h1>
                        <p className="w-75">Please fill the form properly for listing your Apartment to sell.</p>
                      </div>
                    <form className='row gx-3 pt-5' >
                        <div className=' col-6 mb-3'>
                        <UploadImage ad={ad} setAd={setAd} />
                        </div>

                        <div className='d-flex col-6 mb-3 flex-column address sr'>
                          <label htmlFor="fnamelabel" className="form-label" >Address</label>
                          
                              
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
                                />
                    
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
                          <CurrencyInput
                            placeholder="Enter price"
                            defaultValue={ad.price}
                            className="form-control  sr rounded-0"
                            onValueChange={(value) => setAd({ ...ad, price: value })}
                            />
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

                        <div className='d-flex col-6 mb-3 flex-column landsize'>
                          <label htmlFor="confirmPassword" className="form-label" >Land Size</label>
                          <input
                            type="text"
                            className="form-control mb-3 rounded-0 sr"
                            placeholder="Size of land"
                            value={ad.landsize}
                            onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
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
                        <button type="submit" className="btn login-btn btn-primary">Post Ad</button>
                        </div>

                    </form>
                    <pre>
                        {JSON.stringify(ad, null, 4)}
                    </pre>
                </div>
              </div>
            </div>
            

       
      

        /* 
       
 



  <div className=" col-6 check mt-4 mb-2">
                          <label className="form-check-label" htmlFor="exampleCheck1">Yes i want to receive important emails from My room like message notifications.</label>
                          
                            
                          </div>
                          <div className=" col-6 check mb-4">
                          <label className="form-check-label" htmlFor="exampleCheck1">I agree to all the terms and conditions.</label>
                          
                          
                          </div>







<button className="btn btn-primary">Submit</button>
      
        </> */
    )
}