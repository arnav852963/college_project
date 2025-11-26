import mongoose,{Schema} from "mongoose";

const noteModel = new Schema({
  content:{
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


} , {timestamps:true});

export const Note = mongoose.model("Note" , noteModel);