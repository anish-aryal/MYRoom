import { useParams } from "react-router-dom";
import {  useState } from "react";

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../pages/user/Ad/Viewad.css'

export default function Carousel ({photos}){
    // const params = useParams();
    
    const [originalHeight, setOriginalHeight] = useState(400);

    const handleFullScreen = () => {
        if (document.fullscreenElement) {
          // If exiting full screen, set height back to 400
          setOriginalHeight(1000);
        } else {
          // If entering full screen, set height to 1000
          setOriginalHeight(400);
        }
    }

    const photosArray = () => {
        let arr = [];
        if (photos && photos.length > 0) {
          arr = photos.map(p => ({
            original: p.Location,
            thumbnail: p.Location,
            originalHeight: originalHeight, // Specify the original height of the image
            thumbnailHeight: 50, // Specify the height of the thumbnail
          }));
        }
        return arr;
      };


    return (
      
           
                <div className="viewimage pt-5">
                    <div className="pb-4" >
                        <ImageGallery className='adimagecontainer' items={photosArray()}                        showNav={true}
                        showPlayButton={false}
                        showFullscreenButton={true}
                        onScreenChange={handleFullScreen}
                        />
                    </div>
                </div> 
        
            
    )
   
}