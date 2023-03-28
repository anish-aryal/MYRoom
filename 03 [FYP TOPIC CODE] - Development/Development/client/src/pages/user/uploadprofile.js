import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd"
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import  "./Userprofile.css";
import {FcOldTimeCamera} from "react-icons/fc";

export default function UploadProfile({ photo, setPhoto, uploading, setUploading }) {

    const { auth, setAuth } = useAuth();

  const handleUpload = (e) => {
    let file = e.target.files[0];

    if (file) {
      setUploading( true );
      // eslint-disable-next-line array-callback-return
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
              toast.promise(
                axios.post("/upload-image", {
                  image: uri,
                }),
                {
                  loading: "Uploading image...",
                  success: "Image uploaded successfully!",
                  error: "Failed to upload image",
                }
              );
              const { data } = await axios.post("/upload-image", {
                image: uri,
              });
              setPhoto(data)
            } catch (err) {
              console.log("photo upload err => ", err);
              setUploading(false );
            }
          },
          "base64"
        );
      });
    } else {
        setUploading(false );
    }
  };

  const handleDelete = async (file) => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setUploading(true);
    try {
    
      const { data } = await axios.post("/remove-image", photo);
      if (data?.ok) {
       
        toast.success("Image deleted successfully");
        setPhoto(null);
        setUploading(false);

      }
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error("Image deletion failed");
    }
  };

  return (
    <>
      <div className="d-flex mt-4">
        <label className="btn profile-btn text-center">
           <span style={{"font-size":"24px"}}> <FcOldTimeCamera /> </span> Profile   

          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            hidden
            className="text-center"
            style={{ background: `url(${photo?.Location})` }}
           
          />
        </label>
        {photo?.Location ? <Avatar
              src={photo?.Location}
              shape="square"
              size={75}
              className="ml-2 mr-1 avatar"
              onClick={() => handleDelete()}
            /> :''
        }
      </div>
    </>
  );
}
