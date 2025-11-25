import mongoose,{isValidObjectId} from "mongoose";
import { Star } from "../models/star.model.js";
import { asynchandler } from "../utilities/asynchandler.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";
import { User } from "../models/user.model.js";
import { Group } from "../models/group.model.js";
import { Paper } from "../models/paper.model.js";
import { exists } from "node:fs";
import { paperById } from "./paper.controller.js";

const createGroup = asynchandler(async (req,res)=>{
  const {name , description} = req.body

  if (!name || !name.trim() || !description || !description.trim() ) throw new ApiError(400 , "naaaah")
  const group = await Group.create({
    name:name,
    description:description,
    owner:req.user._id
  })

  if (!group) throw new ApiError(400 , "group not created")
  return res.status(200)
    .json(new ApiResponse(200 , group , "group created"))

})

const createGroupByTag = asynchandler(async (req,res)=>{
  let {tag} = req.body

  tag = tag.toLowerCase()

  if(!tag.trim()) throw new ApiError(400 , "naah")
  const exists = await Group.findOne({
      $and: [
        { name: tag },
        { owner: req.user._id }
      ]
    }
  )


  if (exists) throw new ApiError(400 , "group with this tag already exists")


  const newGroup = await Group.create({
    name:tag,
    description:`group of all papers with tag ${tag}`,
    owner:req.user._id
  })

  if (!newGroup) throw new ApiError(400 , "group not created")
  const papersWithTag = await User.aggregate([{
    $match:{
      _id:new mongoose.Types.ObjectId(req.user._id)
    }


  },{
    $lookup: {
      from: "paper",
      localField: "_id",
      foreignField: "owner",
      pipeline:[{
        $match:{
          tag: { $elemMatch: { $regex: `^${tag}$`, $options: "i" } }
        }
      },{
        $project:{
          title:1,
          authors:1,
          link:1,
          manualUpload:1,
          tag:1,
          citedBy:1,
          isPublished:1,
          isStarred:1
        }
      }],
      as: "papers"

    }


  },{
    $project:{
      papers:1
    }
  }])
  if(papersWithTag.length ===0 || papersWithTag[0].papers.length === 0) throw new ApiError(400 , "no papers with this tag")
  newGroup.papers = papersWithTag[0].papers
  await newGroup.save({validateBeforeSave:false})
  return res.status(200)
    .json(new ApiResponse(200 , newGroup , "group created of papers with tag" + tag))


})

const addPaperToGroup = asynchandler(async (req ,res)=>{
  const {paperId , groupId} = req.query
  if (!paperId || !isValidObjectId(paperId) || !groupId || !isValidObjectId(groupId)) throw new ApiError(400 , "naah")


  const addPaper = await Group.findByIdAndUpdate(groupId,
    {
      $addToSet:{
        papers:paperId
      }

    } , {new:true})

  if (!addPaper) throw new ApiError(400 , "paper not added")
  return res.status(200)
    .json(new ApiResponse(200 , addPaper , "paper added"))









})
const updateGroup = asynchandler(async (req,res) =>{
  const {groupId} = req.params
  const {name="" , description=""} = req.body

  if (!groupId || ((!name &&!description) || (!name.trim() && !description.trim()) ) || !isValidObjectId(groupId)) throw new ApiError(400 , "naah")

  const obj ={};
  if(name.trim()) obj.name = name
  if(description.trim()) obj.description = description
  const updated = await Group.findByIdAndUpdate(groupId,{
    $set:obj
  },{new:true}).select("-owner")
  if (!updated) throw new ApiError(400 ,"group not updated")

  res.status(200)
    .json(new ApiResponse(200 ,{
      updatedName:updated.name,
      updatedDescription:updated.description
    } , "group updated" ))


})
const getGroupById = asynchandler(async (req,res)=>{
  const {groupId} = req.params
  if (!groupId || !isValidObjectId(groupId)) throw new ApiError(400 , "naah")
  const get = await Group.aggregate([{
    $match:{
      _id: new mongoose.Types.ObjectId(groupId)
    }
  },{
    $lookup:{
      from:"paper",
      localField:"papers",
      foreignField:"_id",
      pipeline:[{
        $project:{
          refreshToken:0,
          owner:0,
          createdAt:0,
          updatedAt:0,

        }
      }],
      as:"papers"
    }

  },{
    $project:{
      papers:1,

    }
  }])
  if(get.length ===0) throw new ApiError(400 , "no group found")
  if(get[0].papers.length ===0) throw new ApiError(400 , "no papers in this group")

  return res.status(200)
    .json(new ApiResponse(200 , get[0] , "heres your group"))


})

const removePaper = asynchandler(async (req , res) =>{
  console.log(req.query)
  const {paperId , groupId} = req?.query
  if (!paperId||!groupId|| !isValidObjectId(paperId) ||!isValidObjectId(groupId)) throw new ApiError(400 , "naah")

  const remove = await Group.findByIdAndUpdate(groupId,{
    $pull:{
      papers: paperId
    }
  },{new:true})
  if (!remove) throw new ApiError(400 , "paper not removed")
  return res.status(200)
    .json(new ApiResponse(200 , remove , "paper removed"))



})
const  deleteGroup = asynchandler(async (req,res)=>{

  const {groupId} = req.params
  if (!groupId||!isValidObjectId(groupId))throw new ApiError(400 , "naah")
  const del = await Group.findByIdAndDelete(groupId)
  if (!del) throw new ApiError(400 , "froup not deleted")
    return res.status(200)
      .json(new ApiResponse(200 , del , "deleted group"))

})





const getAllGroups = asynchandler(async (req,res)=>{
  const all = await User.aggregate([{
    $match:{
      _id:new mongoose.Types.ObjectId(req.user._id)
    }
  },{
    $lookup:{
      from:"groups",
      localField:"_id",
      foreignField:"owner",
      as:"groups"
    }
  },{
    $project:{
      groups:1
    }
  }])
  if (all.length===0 || all[0].groups.length === 0) throw new ApiError(400 , "cant fetch groups")
  return res.status(200)
    .json(new ApiResponse(200 , all[0] , "here is your group collection"))
})
export {createGroup , getAllGroups , getGroupById , deleteGroup , addPaperToGroup , removePaper , updateGroup , createGroupByTag}