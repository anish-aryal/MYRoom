// routes/ad.js
import express from "express";

const router = express.Router();

import * as ad from "../controllers/ad.js";
import { requireSignin } from "../middlewares/auth.js";

router.post("/upload-image", requireSignin, ad.uploadImage);
router.post("/remove-image", requireSignin, ad.removeImage);
router.post("/ad", requireSignin, ad.create);
router.put("/ad/:_id", requireSignin, ad.update);
router.delete("/ad/:_id", requireSignin, ad.remove);
router.post("/contact-seller", requireSignin, ad.contactSeller);
router.get("/ads", ad.ads);
router.get("/postedByUser/:page",requireSignin, ad.postedByUser);
router.get("/ad/:slug", ad.read);
router.post("/wishlist", requireSignin, ad.addToWishlist);
router.get("/enquiredByUser",requireSignin, ad.enquiredByUser);
router.get("/wishlist",requireSignin, ad.wishlist);
router.delete("/wishlist/:adId", requireSignin, ad.removeFromWishlist);
router.get('/ads-for-rent', ad.adsForRent);
router.get('/ads-for-sell', ad.adsForSell);

export default router;