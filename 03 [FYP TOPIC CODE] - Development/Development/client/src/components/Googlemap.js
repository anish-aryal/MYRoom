import React from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_MAPS_API_KEY } from '../config';
import { IoLocationSharp } from 'react-icons/io5';

export default function Googlemap({ ad }) {
    
      const  center = {
        //   lat: -33.865143,
        //   lng: 151.2099,
        lat: ad?.location?.coordinates[1],
        lng: ad?.location?.coordinates[0],
      }
      const zoom= 15
    
  
    if (ad?.location?.coordinates?.length) {
      return (
        // Important! Always set the container height explicitly
        <div style={{ width: "100%", height: "350px" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            <div
              lat={ad?.location?.coordinates[1]}
              lng={ad?.location?.coordinates[0]}
            >
              <span className="lead"> <IoLocationSharp color='#E03021' size='30px' /></span>
            </div>
          </GoogleMapReact>
        </div>
      );
    }
  }