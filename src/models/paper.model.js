import mongoose , {Schema} from "mongoose";
import { strict } from "node:assert";
import { stringify } from "node:querystring";
const researchPaper = new Schema({
  title:{
    type:String,
    required:true
  },
authors:[{
    type:String,
  required:true
}],
  link:{
    type:String,

    sparse:true

  },
  manualUpload:{
    type:String,

    sparse:true


  },
  tag:[{
    type:String,
    toLowerCase:true

  }],
  publishedDate:{
    type:Date,

  },
  // publishedDate:{
  //   type:Date,
  //   required:true
  // },
  publishedBy:{
    type:String,
    default:"undisclosed"

  },
  citedBy:{
    type:Number,

  },

  isPublished:{
    type:Boolean,
    default:true

  },
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  isManual:{
    type:Boolean,

    default:false
  },
  classifiedAs:{
    type:String,
    enum:["journal","conference","book chapter"],
    default:"conference"
  }

},{timestamps:true})
export const Paper = mongoose.model("Paper" , researchPaper )