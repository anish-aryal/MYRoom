import { nanoid } from "nanoid";
import * as config from "../config.js";
import slugify from "slugify";
import Ad from "../models/ad.js";
import User from "../models/user.js";
import {emailTemplate} from '../helpers/email.js';


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
    try {
      // console.log(req.body);
      const { title, description, price, type, address, photos } = req.body;
      if (!photos?.length) {
        return res.json({ error: "No image. Please upload atleast 1 image" });
      }
      if (!price) {
        return res.json({ error: "Price is required" });
      }
      if (!type) {
        return res.json({ error: "Type is required" });
      }
      if (!address) {
        return res.json({ error: "Address is required" });
      }
      if (!description) {
        return res.json({
          error: "Provide some description about the property ",
        });
      }
      if (!title) {
        return res.json({ error: "Enter the title for the Ad" });
      }
  
      const geography = await config.Google_Geocoder.geocode(address);
      console.log("geography =>", geography);
  
      const ad = new Ad({
        ...req.body,
        postedBy: req.user._id,
        slug: slugify(`${title}-${nanoid(8)}`),
        location: {
          type: "Point",
          coordinates: [geography[0]?.longitude, geography[0].latitude],
        },
        googleMap: geography,
      }).save();
  
      const user = new User();
      user.password = undefined;
      user.resetCode = undefined;
      res.json({ ad, user });
    } catch (err) {
      console.log(err);
    }
  };

  export const ads = async (req, res) => {
    try{
      const apartmentForSell = await Ad.find({action: "Sell", type:"Apartment"})
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag ")
      .populate("postedBy", "firstname username email phone company")
      .sort({createdAt: -1}).limit(6).exec();

      const apartmentForRent = await Ad.find({action: "Rent", type:"Apartment"})
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag ")
      .populate("postedBy", "firstname username email phone company")
      .sort({createdAt: -1}).limit(6).exec();

      const roomForRent = await Ad.find({action: "Rent", type:"Room"})
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag ")
      .populate("postedBy", "firstname username email phone company")
      .sort({createdAt: -1}).limit(6).exec();

      const roomForSell = await Ad.find({action: "Sell", type:"Room"})
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag ")
      .populate("postedBy", "firstname username email phone company")
      .sort({createdAt: -1}).limit(6).exec();


      res.json({apartmentForSell, apartmentForRent, roomForRent, roomForSell})
    }
    catch(err){
      console.log(err)
    }
  }

  export const read = async (req, res) => {
    try {
      const ad = await Ad.findOne({ slug: req.params.slug}) 
      .select("-photos.Key -photos.key -photos.ETag -photos.Bucket -googleMap")
      .populate('postedBy', 'firstname lastname username email phone, photo.Location');
      console.log(ad);

      const related = await Ad.find({
        _id: { $ne: ad._id },
        action: ad.action,
        type: ad.type,
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [ad.location.coordinates[0], ad.location.coordinates[1]]
            },
            $maxDistance: 5000 // 5 km in meters
          }
        }
      }).limit(3)
      .select("-photos.Key -photos.key -photos.ETag -photos.Bucket -googleMap")
      .populate("postedBy", "username  email phone company photo.Location");
      res.json({ ad, related });
    } catch (err) {
      console.log(err);
    }
  };

  export const addToWishlist = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $addToSet: { wishlist: req.body.adId },
        },
        { new: true }
      );
      const { password, resetCode, ...rest } = user._doc;
      res.json(rest);
    } catch (err) {
      console.log(err);
    }
  };

  export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { wishlist: req.params.adId },
      },
      { new: true }
    );
    const { password, resetCode, ...rest } = user._doc;
    res.json(rest);
  } catch (err) {
    console.log(err);
  }
};

export const contactSeller= async (req, res) => {
  try {
    const { firstname, email, phone, message,adId } = req.body;
    const ad = await Ad.findById(adId).populate('postedBy','email');
   const user = await User.findOneAndUpdate(
      { email },
      {
        $addToSet: { enquiredProperties: adId },
      }
    );

    if(!user){
      return res.json({error: "User not found"})
    }else{
      
      config.AWSSES.sendEmail(
        emailTemplate(
          ad.postedBy.email,
          `
          <p>You have recieved an enquiry from ${firstname} about the ${ad.type} you listed in MyRoom for ${ad.action}</p>
          <a href="${config.CLIENT_URL}/ad/${ad.slug}">View Enquired Property</a>

          <h3>Enquiry Details</h3>
          <p>Firstname: ${firstname}</p>
          <p>Email: ${email}</p>
          <p>Phone: ${phone}</p>
          <p>Message: <strong>${message}</stong></p>
      `,
          email,
          `New Enquiry for ${ad.title}`
        ),
        (err, data) => {
          if (err) {
            return res.json({ error: "Provide a valid email address" });
          } else {
            return res.json({ sucess: "Check your email to complete the registeration" });
          }
        }
      );
    }

 
  } catch (err) {
    console.log(err);
  }
}

// export const  postedByUser = async (req, res) => {
//   try {
//     const total = await Ad.find({ postedBy: req.user._id }).countDocuments();
//     const ads = await Ad.find({ postedBy: req.user._id })
//       .populate("postedBy", "firstname username email phone")
//       .sort({ createdAt: -1 })
     

//     res.json({ ads, total});
//   } catch (err) {
//     console.log(err);
//   }
// }


 // const perPage=12;
    // const page = req.params.page ? req.params.page : 1;
    // const total = await Ad.find({ postedBy: req.user._id }).countDocuments();
 // .skip((perPage * page) - perPage)
      // .skip((page-1)* perPage )
      // .limit(perPage)

      export const postedByUser = async (req, res) => {
        try {

          const page = req.params.page ? req.params.page : 1;
          const limit = 3;
          const skip = (page - 1) * limit;

          const totalapartmentsell = await Ad.find({ postedBy: req.user._id,type: "Apartment",
          action: "Sell"  }).countDocuments();
          console.log(totalapartmentsell);

          const totalroomsell = await Ad.find({ postedBy: req.user._id,type: "Room",
          action: "Sell"  }).countDocuments();
          console.log(totalroomsell);

          const totalroomrent = await Ad.find({ postedBy: req.user._id,type: "Room",
          action: "Rent"  }).countDocuments();
          console.log(totalroomrent);

          const totalapartmentrent = await Ad.find({ postedBy: req.user._id,type: "Apartment",
          action: "Rent"  }).countDocuments();
          console.log(totalapartmentrent);
      
          const apartmentSell = await Ad.find({
            postedBy: req.user._id,
            type: "Apartment",
            action: "Sell"
          })
            .populate("postedBy", "firstname username email phone")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(3);
      
          const apartmentRent = await Ad.find({
            postedBy: req.user._id,
            type: "Apartment",
            action: "Rent"
          })
            .populate("postedBy", "firstname username email phone")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(3);
      
          const roomSell = await Ad.find({
            postedBy: req.user._id,
            type: "Room",
            action: "Sell"
          })
            .populate("postedBy", "firstname username email phone")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(3);
      
          const roomRent = await Ad.find({
            postedBy: req.user._id,
            type: "Room",
            action: "Rent"
          })
            .populate("postedBy", "firstname username email phone")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(3);
      
          res.json({ apartmentSell, apartmentRent, roomSell, roomRent, totalapartmentsell,totalroomsell,totalroomrent,totalapartmentrent });
        } catch (err) {
          console.log(err);
        }
      };
      