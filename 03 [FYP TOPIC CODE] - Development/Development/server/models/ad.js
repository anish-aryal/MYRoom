import { model, Schema, ObjectId } from "mongoose";

const schema = new Schema(
    {
        photos: [{}],
        price : {
            type: Number, 
            required: true,
            maxlength:100
        },
        title: {
            type: String,
            required: true,
            maxlength: 255,
          
        },
        description: {
            type: String,
            required: true,
            maxlength: 1000
        },
       
        address: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        landsize: {
            type: Number,
    
        },
        parking: {
            type: Number,
    
        },
        location:{
            type:{
                type: String,
                enum: ['Point'],
                default:"point",
            },
            coordinates: {
                type: [Number],
                default: [85.300140,27.700769],
            }
        },
        userisBanned: {
            type: Boolean,
            default: false,
        },
        slug: {
            type: String,
            lowercasr: true,
            unique: true,
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
        sold:{type: Boolean, default: false},
    googleMap:{},
    type:{
        type: String,
        default: "Other",
    },
    action:{
        type: String,
        default: "Rent",
    },
    views:{
        type: Number,
        default: 0,
    },
    isExpired:{
        type: Boolean,
        default: false},
    createdAt: {
        type: Date,
        default: Date.now
      }
    },
  );
  
schema.index({ location: '2dsphere' });





export default model("Ad", schema);

