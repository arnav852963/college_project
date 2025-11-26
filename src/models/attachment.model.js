import mongoose,{Schema} from "mongoose";

const attachmentModel = new Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  url:{
    type:String,
    required:true,
    trim:true
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Project",
    required:true
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
} , { timestamps: true });

export const Attachment = mongoose.model("Attachment" , attachmentModel)