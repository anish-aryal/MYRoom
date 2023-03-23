import Resizer from "react-image-file-resizer";
import axios from "axios";

export default function UploadImage ({ad,setAd}){
    
    const handleUpload = async (e) => {
        try{
           
            let files = e.target.files;
            files = [...files];

            if (files?.length) {
              setAd({ ...ad, uploading: true });
              files.map((file) => {
                // upload
                new Promise((resolve) => {
                  Resizer.imageFileResizer(
                    file,
                    1080,
                    720,
                    "JPEG",
                    100,
                    0,
                    async (uri) => {
                      try {
                        const { data } = await axios.post("/upload-image", {
                          image: uri,
                        });
                        setAd((prev) => ({
                          ...prev,
                          photos: [data, ...prev.photos],
                          uploading: false,
                        }));
                      } catch (err) {
                        console.log("photo upload err => ", err);
                        setAd({ ...ad, uploading: false });
                      }
                    },
                    "base64"
                  );
                });
              });
            } else {
              setAd({ ...ad, uploading: false });
            }
          }
        catch (err) {
            setAd({...ad, uploading: false})
            
          }
    }
    
      const handleDelete = async (photo) => {
        try {
            setAd({...ad, uploading: true})
          
        } catch (err) {
          console.log(err);
          setAd({...ad, uploading: false})
         
        }
      };

    return(
        <>
        <div className="d-flex mt-4">
        <label className="btn btn-secondary">
          {ad.uploading
            ? "Uploading..."
            : ad.removing
            ? "Removing..."
            : "Upload photos"}
        
          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            multiple
            hidden
          />
        </label>
      </div> </>
    )
}