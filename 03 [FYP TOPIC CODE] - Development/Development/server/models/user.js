import { model, Schema, ObjectId } from "mongoose";

const schema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    firstname: {
      type: String,
      trim: true,
      default: "",
    },
    lastname: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 256,
    },
    address: { type: String, default: "" },
    phone: { 
      type: String, 
      default: "",      
      unique: true, },
    photo: {},
    role: {
      type: [String],
      default: ["User"],
      enum: ["User", "Admin"],
    },
    enquiredProperties: [{ type: ObjectId, ref: "Ad" }],
    wishlist: [{ type: ObjectId, ref: "Ad" }],
    resetCode: {
        type: String, default: "",
    },
  },
  { timestamps: true }
);


export default model("User", schema);