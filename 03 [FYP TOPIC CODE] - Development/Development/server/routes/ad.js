// routes/ad.js
import express from "express";

const router = express.Router();

import * as ad from "../controllers/ad.js";
import { requireSignin } from "../middlewares/auth.js";

router.post("/upload-image", requireSignin, ad.uploadImage);
router.post("/remove-image", requireSignin, ad.removeImage);
router.post("/ad", requireSignin, ad.create);
router.post("/contact-seller", requireSignin, ad.contactSeller);
router.get("/ads", ad.ads);
router.get("/postedbyuser",requireSignin, ad.postedByUser);
router.get("/ad/:slug", ad.read);
router.post("/wishlist", requireSignin, ad.addToWishlist);
router.delete("/wishlist/:adId", requireSignin, ad.removeFromWishlist);

export default router;