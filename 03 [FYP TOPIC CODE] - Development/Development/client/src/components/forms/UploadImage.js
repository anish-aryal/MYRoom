import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import toast from "react-hot-toast";

export default function UploadImage({ ad, setAd }) {
  const handleUpload = (e) => {
    let files = e.target.files;
    files = [...files];
    if (files?.length) {
      setAd({ ...ad, uploading: true });
      // eslint-disable-next-line array-callback-return
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
  };

  const handleDelete = async (file) => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setAd({ ...ad, removing: true });
    try {
      const { data } = await axios.post("/remove-image", file);
      if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => p.Key !== file.Key),
          removing: false,
        }));
        toast.success("Image deleted successfully");
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, removing: false });
      toast.error("Image deletion failed");
    }
  };

  return (
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
        {Array.isArray(ad.photos) &&
          ad.photos.map((file, index) => (
            <Avatar
              src={file?.Location}
              key={index}
              shape="square"
              size={40}
              className="ml-2 mr-1"
              onClick={() => handleDelete(file)}
            />
          ))}
      </div>{" "}
    </>
  );
}
