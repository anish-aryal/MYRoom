// components/forms/SearchForm.js
import { useSearch } from "../../context/search";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "../../config";
import {BsSearch} from "react-icons/bs"
import "./search.css"
import {sellPrices, rentPrices} from "../..//components//search/pricerange.js"
import { Link, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from 'axios'
import toast from "react-hot-toast";



export default function SearchForm() {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();

  const handleSearch =async () => {
    setSearch({...search, loading:true})
    if(!search.address){
        toast.error("Address is required to perform search action.")
        return;

    }
    try {
        const {results, page, price,...rest } = search;
        const query = queryString.stringify(rest);

        const {data} = await axios.get(`/search?${query}`)
        // console.log(query)
        if(search?.page !==" /search"){
            setSearch((prev) =>({
               ...prev, results:data, loading:false
              
            }))
            navigate("/search")
        }
        else{
            setSearch((prev) =>({
                ...prev, results:data, page:window.location.pathname, loading:false
               
             }))
        }
        
    } catch (err) {
        console.log(err);
        setSearch({...search, loading:false})
    }
  }
  

  return (

        <div className='col-8 mb-3 flex-column address text-end sr  '>
            <label htmlFor="Search"className="text-white">Search properties</label>

            <div className="row">
                <div className="col-11 d-flex mt-1">
                    <button className="filter rounded-0" onClick={() => setSearch({...search, action: 'Buy', price: ''})} style={{ backgroundColor: search.action === 'Buy' ? '#c299ea' : 'white' }}>Buy</button>
                    <button className="filter rounded-0 " onClick={()=>setSearch({...search, action : 'Rent', price:""})}  style={{ backgroundColor: search.action === 'Rent' ? '#c299ea' : 'white' }} >Rent</button>
                    <button className="filter rounded-0 " onClick={()=>setSearch({...search, type : 'Apartment', price:""})} style={{ backgroundColor: search.type === 'Apartment' ? '#c299ea' : 'white' }}>Apartment</button>
                    <button className="filter rounded-0 " onClick={()=>setSearch({...search, type : 'Room', price:""})} style={{ backgroundColor: search.type === 'Room' ? '#c299ea' : 'white' }}>Room</button>
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: '15px'}}>
                        &nbsp; {search.price ? search.price : "Price Range"}
                        </button>
                    <ul className="dropdown-menu" style={{ fontSize: '15px'}}>
                    {search.action === "Buy" ? (
                        <>
                        {sellPrices?.map((p) => (
                            <li key={p._id}>
                            <Link
                                className="dropdown-item"
                                onClick={() =>
                                setSearch({
                                    ...search,
                                    price: p.name,
                                    priceRange: p.array,
                                })
                                }
                            >
                                {p.name}
                            </Link>
                            </li>
                        ))}
                        </>
                    ) : (
                        <>
                        {rentPrices?.map((p) => (
                            <li key={p._id}>
                            <Link
                                className="dropdown-item"
                                onClick={() =>
                                setSearch({
                                    ...search,
                                    price: p.name,
                                    priceRange: p.array,
                                })
                                }
                            >
                                {p.name}
                            </Link>
                            </li>
                        ))}
                        </>
                    )}
                    </ul>
                    </div>
                    {/* <div className="advancesearch mt-2" >
                        <Link> Advance Search </Link>
                    </div> */}
                
                </div>

                <div className="col-10 pr-1" >
                        <GooglePlacesAutocomplete 
                                apiKey={GOOGLE_PLACES_API_KEY}
                                        apiOptions={{ region: "au" }}
                                        selectProps={{
                                            defaultInputValue: search?.address,
                                                placeholder: "Search properties by location",
                                                onChange: ({ value }) => {
                                                    setSearch({ ...search, address: value.description });
                                            },
                            }}
                            />  
                </div>
                    
                <div className="col-2 pl-1">
                        <button className=" searchbtn border-0"style={{ backgroundColor: '#FFD700'}} onClick={handleSearch}>
                            <BsSearch />
                        </button>
                </div>
               
            </div>                             
        </div>
        
  );
}