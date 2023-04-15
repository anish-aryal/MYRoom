import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_MAPS_API_KEY } from '../config';
import { FaHospitalSymbol,FaBook } from 'react-icons/fa';
import {HiShoppingBag} from 'react-icons/hi';
import {GiSchoolBag} from 'react-icons/gi';
import { IoLocationSharp } from 'react-icons/io5';
import { MdBackpack, MdSchool } from 'react-icons/md';
import './Googlemaps.css'


export default function Googlemap({ ad }) {
  const [hospitals, setHospitals] = useState([]);
  const [schools, setSchools] = useState([]);
  //added
  const [Markets, setMarkets] = useState([]);
  const [Colleges, setColleges] = useState([]);

  
  const [center, setCenter] = useState({
    lat: ad?.location?.coordinates[1],
    lng: ad?.location?.coordinates[0],
  });
  const [zoom, setZoom] = useState(15);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedMarkerPosition, setSelectedMarkerPosition] = useState(null);
  const [showSchools, setShowSchools] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);

  //added
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [showColleges, setShowColleges] = useState(false);
  const [showMarkets, setShowMarkets] = useState(false);

    // Clear the selected Market's name after 2 seconds
    useEffect(() => {
      if (selectedMarket || selectedCollege) {
        const timer = setTimeout(() => {
          setSelectedMarket(null);
          setSelectedCollege(null);
          setSelectedMarkerPosition(null);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [selectedMarket, selectedCollege]);
  
    // Fetch nearby Markets using the Google Maps API
    useEffect(() => {
      if ((showMarkets || showColleges) && window.google && window.google.maps) {
        const map = new window.google.maps.Map(document.createElement('div'));
        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(
          {
            location: center,
            radius: 1000, // 1 km radius
            type: showMarkets ? ['store'] :['university'],
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              if (showMarkets) {
                setMarkets(results);
              } else {
                setColleges(results);
              }
            }
          }
        );
      }
    }, [showMarkets, showColleges, center]);





  // Clear the selected hospital's name after 2 seconds
  useEffect(() => {
    if (selectedHospital || selectedSchool) {
      const timer = setTimeout(() => {
        setSelectedHospital(null);
        setSelectedSchool(null);
        setSelectedMarkerPosition(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedHospital, selectedSchool]);

  // Fetch nearby hospitals using the Google Maps API
  useEffect(() => {
    if ((showHospitals || showSchools) && window.google && window.google.maps) {
      const map = new window.google.maps.Map(document.createElement('div'));
      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: center,
          radius: 1000, // 1 km radius
          type: showHospitals ? 'hospital' :['school'],
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            if (showHospitals) {
              setHospitals(results);
            } else {
              setSchools(results);
            }
          }
        }
      );
    }
  }, [showHospitals, showSchools, center]);




  // Update the map center and zoom level based on the ad location
  useEffect(() => {
    if (ad?.location?.coordinates?.length) {
      setCenter({
        lat: ad.location.coordinates[1],
        lng: ad.location.coordinates[0],
      });
      setZoom(15);
    }
  }, [ad]);

  return (
    <div style={{ width: '100%', height: '350px' }}>
      {/* <div className="d-flex">
        <button className=' hospitals  px-3 py-2 mr-3 sm' onClick={() => {
            setShowHospitals(!showHospitals);

            setShowSchools(false);
            setShowColleges(false);
            setShowMarkets(false);
          }}>
            <FaHospitalSymbol /> Nearby Hospitals
          </button>
          <button className='schools loadmore px-3 py-2 mx-3 sm' onClick={() => {
            setShowHospitals(false);
            setShowColleges(false);
            setShowMarkets(false);
            setShowSchools(!showSchools);
          }}>
           <FaBook /> Nearby Schools
          </button>
          <button className=' Markets  px-3 py-2 sm mx-3' onClick={() => {
            setShowMarkets(!showMarkets);
            setShowColleges(false);
            setShowHospitals(false);
            setShowSchools(false);
          }}>
            <HiShoppingBag /> Nearby Markets
          </button>
          <button className='Colleges loadmore px-3 py-2 mx-3 sm' onClick={() => {
            setShowMarkets(false);
            setShowHospitals(false);
            setShowSchools(false);
            setShowColleges(!showColleges);
          }}>
           <MdSchool /> Nearby Colleges
          </button>
      </div> */}
 <ul className="nav nav-pills mb-1" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
  <button className=' hospitals  px-3 py-2 mr-3 sm' onClick={() => {
            setShowHospitals(!showHospitals);

            setShowSchools(false);
            setShowColleges(false);
            setShowMarkets(false);
          }}>
            <FaHospitalSymbol /> Nearby Hospitals
          </button>
  </li>
  <li className="nav-item" role="presentation">
  <button className='schools loadmore px-3 py-2 mr-3 sm' onClick={() => {
            setShowHospitals(false);
            setShowColleges(false);
            setShowMarkets(false);
            setShowSchools(!showSchools);
          }}>
           <FaBook /> Nearby Schools
          </button>
  </li>
  <li className="nav-item" role="presentation">
  <button className=' markets   px-3 py-2 sm mr-3' onClick={() => {
            setShowMarkets(!showMarkets);
            setShowColleges(false);
            setShowHospitals(false);
            setShowSchools(false);
          }}>
            <HiShoppingBag /> Nearby Markets/Stores
          </button>
  </li>
  <li className="nav-item" role="presentation">
  <button className='colleges  px-3 py-2 mr-3 sm' onClick={() => {
            setShowMarkets(false);
            setShowHospitals(false);
            setShowSchools(false);
            setShowColleges(!showColleges);
          }}>
           <MdSchool /> Nearby Colleges
          </button>
  </li>
</ul>


        
     
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        center={center}
        zoom={zoom}
      >
        {/* Render a marker for each nearby hospital */}
        {showHospitals && hospitals.length>0 && hospitals.map((hospital) => (
          <div
            key={hospital.place_id}
            lat={hospital.geometry.location.lat()}
            lng={hospital.geometry.location.lng()}
            onClick={() => {
              setSelectedHospital(hospital.name);
              setSelectedMarkerPosition({ lat: hospital.geometry.location.lat(), lng: hospital.geometry.location.lng() });
            }}
          >
            <span className="lead">
              <FaHospitalSymbol color="green" size="20px" />
            </span>
          </div>
        ))}
         {showSchools && schools.length>0 && schools.map((school) => (
          <div
            key={school.place_id}
            lat={school.geometry.location.lat()}
            lng={school.geometry.location.lng()}
            onClick={() => {
              setSelectedSchool(school.name);
              setSelectedMarkerPosition({ lat: school.geometry.location.lat(), lng: school.geometry.location.lng() });
            }}
          >
            <span className="lead">
              <FaBook color="#66338D" size="16px" />
            </span>
          </div>
        ))}

         {/* Render a marker for each nearby Market */}
         {showMarkets && Markets.length>0 && Markets.map((Market) => (
          <div
            key={Market.place_id}
            lat={Market.geometry.location.lat()}
            lng={Market.geometry.location.lng()}
            onClick={() => {
              setSelectedMarket(Market.name);
              setSelectedMarkerPosition({ lat: Market.geometry.location.lat(), lng: Market.geometry.location.lng() });
            }}
          >
            <span className="lead">
              <HiShoppingBag color="brown" size="20px" />
            </span>
          </div>
        ))}
         {showColleges && Colleges.length>0 && Colleges.map((College) => (
          <div
            key={College.place_id}
            lat={College.geometry.location.lat()}
            lng={College.geometry.location.lng()}
            onClick={() => {
              setSelectedCollege(College.name);
              setSelectedMarkerPosition({ lat: College.geometry.location.lat(), lng: College.geometry.location.lng() });
            }}
          >
            <span className="lead">
              <MdSchool color="#3d4944" size="18px" />
            </span>
          </div>
        ))}


        {/* Render a marker for the ad location */}
        {ad?.location?.coordinates?.length && (
          <div
            lat={ad.location.coordinates[1]}
            lng={ad.location.coordinates[0]}
          >
            <span className="lead">
              <IoLocationSharp color="#DC143C" size="30px" />
            </span>
          </div>
        )}

        {/* Render the selected hospital name above the marker */}
        {selectedMarkerPosition && (
          <div
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -100%)',
              background: 'white',
              padding: '8px',
              borderRadius: '4px',
            }}
            lat={selectedMarkerPosition.lat}
            lng={selectedMarkerPosition.lng}
          >
            {selectedHospital}
            {selectedSchool}
            {selectedMarket}
            {selectedCollege}
          </div>
        )}
      </GoogleMapReact>
    </div>
  );
}

