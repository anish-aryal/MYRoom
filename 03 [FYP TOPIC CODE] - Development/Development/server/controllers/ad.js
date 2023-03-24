import { nanoid } from "nanoid";
import * as config from "../config.js";
import slugify from "slugify";
import Ad from "../models/ad.js";
import user from "../models/user.js";


export const uploadImage = async (req, res) => {
    try {
      
      const { image } = req.body;
      if (!image) return res.status(400).send("No image");
  
      // prepare the image
      const base64Image = new Buffer.from(
          image.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
      const type = image.split(";")[0].split("/")[1];
  
      // image params
      const params = {
        Bucket: "myroom-bucket",
        Key: `${nanoid()}.${type}`,
        Body: base64Image,
        ACL: "public-read",
        ContentEncoding: "base64",
        ContentType: `image/${type}`,
      };
  
      // upload to s3
      config.AWSS3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          console.log(data);
          res.send(data);
        }
      });
    } catch (err) {
      console.log(err);
      res.json({ error: "Upload failed. Try again." });
    }
  };

  export const removeImage = (req, res) => {
    try {


      const { Key, Bucket } = req.body;
  
      // upload to s3
      config.AWSS3.deleteObject({Key, Bucket }, (err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          // console.log(data);
          res.send({ ok: true });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const create = async (req, res) => {
     try{
        // console.log(req.body);
        const {title, description, price, type, address, photos} = req.body;
        if (!photos?.length){
              return res.json({error: "No image. Please upload atleast 1 image"});
        }
        if (!price){
            return res.json({error: "Price is required"});
        }
        if (!type){
            return res.json({error: "Type is required"});
        }
        if (!address){
            return res.json({error: "Address is required"});
        }
        if (!description){
            return res.json({error: "Provide some description about the property "});
        }
        if (!title){
            return res.json({error: "Enter the title for the Ad"});
        }

        const geography = await config.Google_Geocoder.geocode(address);
        console.log('geography =>', geography);

        const ad = new Ad({

            ...req.body,
            postedBy: req.user._id,
            slug: (`${title}/${nanoid(8)}`),
            location: {
                type: "Point",
                coordinates: [ geography[0]?.longitude, geography[0].latitude ],
            },
            googleMap: geography,

        }).save();
        user.password = undefined;
        user.resetCode = undefined;
        res.json({ad,user});
     }
     catch{
        res.json({error:"Something went wrong. Try again."});
        console.log(err);

     }
  }

  export const ads = async (req, res) => {
    try{
      const apartmentForSell = await Ad.find({action: "Sell", type:"Apartment"})
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag ")
      .sort({createdAt: -1}).limit(12).exec();

      const apartmentForRent = await Ad.find({action: "Rent", type:"Apartment"})
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag ")
      .sort({createdAt: -1}).limit(12).exec();

      const roomForRent = await Ad.find({action: "Rent", type:"Room"})
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag ")
      .sort({createdAt: -1}).limit(12).exec();

      const roomForSell = await Ad.find({action: "Sell", type:"Room"})
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag ")
      .sort({createdAt: -1}).limit(12).exec();


      res.json({apartmentForSell, apartmentForRent, roomForRent, roomForSell})
    }
    catch(err){
      console.log(err)
    }
  }