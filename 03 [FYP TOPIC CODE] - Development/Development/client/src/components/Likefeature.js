// components/cards/LikeUnlike.js
import axios from "axios";
import { useAuth } from "../context/auth";
import { toast } from 'react-hot-toast';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";



export default function LikeUnlike({ ad }) {
  // context
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

  const handleLike = async () => { // <-- change parameter name to "ad"
    if (auth.user === null) {
      navigate("/login",{
        state: `/ad/${ad.slug}`
      });
      toast.error('please login first')
      return;
    }
    try {
      const { data } = await axios.post("/wishlist", { adId: ad._id });
      setAuth({ ...auth, user: data });
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      if (fromLS) {
        fromLS.user = data;
        localStorage.setItem("auth", JSON.stringify(fromLS));
      }
      toast.success(`${ad.type} added to your wishlist`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
    }
  };

  const handleUnlike = async () => { // <-- change parameter name to "ad"
    if (auth.user === null) {
        navigate("/login",{
            state: `/ad/${ad.slug}`,
          });
      return;
    }
    try {
      const { data } = await axios.delete(`/wishlist/${ad._id}`);
      console.log("removed from wishlist => ", data);
      setAuth({ ...auth, user: data });
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      if (fromLS) {
        fromLS.user = data;
        localStorage.setItem("auth", JSON.stringify(fromLS));
      }
      toast.error(`${ad.type} removed from your wishlist`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
      {auth?.user?.wishlist?.includes(ad?._id) ? (
        <span onClick={() => handleUnlike(ad)}>
          <FcLike className="pointer h3 ml-2 mt-1" />
        </span>
      ) : (
        <span onClick={() => handleLike(ad)}>
          <FcLikePlaceholder className="pointer ml-2 h3 mt-1" />
        </span>
      )}
    </>
  );
}
