import { model, Schema, ObjectId } from "mongoose";

const messageSchema = new Schema(
    {
        chatUsers : {
            type: [],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        sender: {
            type: ObjectId,
            ref: "User",
            required: true,
        }

    },{timestamps:true})
  

export default model("Message", messageSchema);

