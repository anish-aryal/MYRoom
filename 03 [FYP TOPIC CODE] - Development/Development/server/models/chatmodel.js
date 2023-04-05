import mongoose from "mongoose";
import { model, Schema, ObjectId } from "mongoose";

const chatmodel = new Schema(
    {
       members :{
              type: Array,

       }

    },
    { timestamps: true }
  );

export default model("ChatModel", chatmodel);

