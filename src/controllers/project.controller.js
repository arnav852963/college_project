import { asynchandler } from "../utilities/asynchandler.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/ApiError.js";
import { Project } from "../models/project.model.js";
import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
import { upload } from "../utilities/Cloudinary.js";
import {Note} from "../models/note.model.js";
import { Attachment } from "../models/attachment.model.js";

const uploadProject = asynchandler(async (req, res) => {
  const { name, description, startDate, endDate, status, teamMembers } = req.body;

  if (!name || !startDate) throw new ApiError(400, "enter details properly");



  const membersArray = [];
  if (teamMembers) {
    teamMembers.split(",").forEach(m => {
      if (m.trim() !== "") membersArray.push(m.trim());
    });
  }

  const project = await Project.create({
    name: name,
    description: description || "",
    startDate: new Date(startDate),
    endDate: endDate ? new Date(endDate) : null,
    status: status || "Not Started",
    teamMembers: membersArray,
    owner: req.user._id
  });

  if (!project) throw new ApiError(400, "can't create project");

  return res.status(200)
    .json(new ApiResponse(200, project, "project created successfully"));
});

const updateProject = asynchandler(async (req, res) => {
  const { projectId } = req.params;
  const { name, description, startDate, endDate, status } = req.body;

  if (!projectId || !isValidObjectId(projectId)) throw new ApiError(400, "invalid project id");

  const project = await Project.findOne({ _id: projectId, owner: req.user._id });
  if (!project) throw new ApiError(404, "project not found");

  if (name) project.name = name;
  if (description) project.description = description;
  if (startDate) project.startDate = new Date(startDate);
  if (endDate) project.endDate = new Date(endDate);
  if (status) project.status = status;


  await project.save();

  return res.status(200)
    .json(new ApiResponse(200, project, "project updated successfully"));
});

const getProjectById = asynchandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId || !isValidObjectId(projectId)) throw new ApiError(400, "invalid project id");

  const project = await Project.findOne({ _id: projectId, owner: req.user._id });
  if (!project) throw new ApiError(404, "project not found");

  return res.status(200)
    .json(new ApiResponse(200, project, "here is your project"));
});

const deleteProject = asynchandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId || !isValidObjectId(projectId)) throw new ApiError(400, "invalid project id");

  const deleted = await Project.findOneAndDelete({ _id: projectId, owner: req.user._id });
  if (!deleted) throw new ApiError(400, "can't delete project");

  return res.status(200)
    .json(new ApiResponse(200, deleted, "project deleted successfully"));
});

const getUserProjects = asynchandler(async (req, res) => {
  const projects = await Project.find({ owner: req.user._id });
  if (!projects || projects.length === 0) throw new ApiError(400, "can't get projects");

  return res.status(200)
    .json(new ApiResponse(200, projects, "here are your projects"));
});

const addMemberToProject = asynchandler(async (req, res) => {
  const { projectId } = req.params;
  const { memberEmail } = req.body;

  if (!projectId || !isValidObjectId(projectId)) throw new ApiError(400, "invalid project id");
  if (!memberEmail || memberEmail.trim() === "") throw new ApiError(400, "invalid member email");

  const updatedProject = await Project.findByIdAndUpdate(projectId , {
    $addToSet:{
      teamMembers: memberEmail.trim()
    }
  } , {new:true})
  if(!updatedProject) throw new ApiError(400 , "could not add member")

  return res.status(200)
    .json(new ApiResponse(200, {}, "member added successfully"));

})

const addAttachmentToProject = asynchandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId || !isValidObjectId(projectId)) throw new ApiError(400, "invalid project id");
  const {name} = req.body
  if(!name || name.trim() === "") throw new ApiError(400 , "attachment name required")

  if (!req.file) throw new ApiError(400, "no file uploaded");



  let resourceType = req.file.mimetype.split("/")[1];
  if(resourceType === "jpeg" || resourceType === "png" || resourceType === "jpg"){
    resourceType = "auto"
  }
  else resourceType = "raw"

  const attachmentUrl = req?.file?.path
  if(!attachmentUrl) throw new ApiError(400 , "file upload on multer failed")


  const uploaded = await upload(attachmentUrl , resourceType)
  if(!uploaded.url) throw new ApiError(500 , "file upload to cloudinary failed")

  const add = await Attachment.create({
    name: name.trim(),
    url: uploaded.url,
    owner: projectId,
    createdBy: req.user._id
  })
  if(!add) throw new ApiError(400 , "could not add attachment")



  return res.status(200)
    .json(new ApiResponse(200, add, "attachment added successfully"));


})

const getAllAttachmentsForProject = asynchandler(async (req,res)=>{
  const {projectId} = req.params;

  if (!projectId || !isValidObjectId(projectId)) throw new ApiError(400, "invalid project id");

  const attachments = await Attachment.find({owner:projectId , createdBy:req?.user?._id }).sort({createdAt:-1});
  if(!attachments) throw new ApiError(400 , "could not fetch attachments")
  return res.status(200)
    .json(new ApiResponse(200, attachments, "here are your attachments"));
})

const addNotesToProject = asynchandler(async (req,res)=>{
  const {projectId} = req.params;
  const {notes} = req.body;

  if (!projectId || !isValidObjectId(projectId)) throw new ApiError(400, "invalid project id");
  if (!notes || notes.trim() === "") throw new ApiError(400, "notes cannot be empty");

  const newNote = await Note.create({
    content: notes.trim(),
    owner: projectId,
    createdBy: req.user._id
  });
  if(!newNote) throw new ApiError(400 , "could not add notes")
  return res.status(200)
    .json(new ApiResponse(200, newNote, "notes added successfully"));

})
const getAllNotesForProject = asynchandler(async (req,res)=>{
  const {projectId} = req.params;

  if (!projectId || !isValidObjectId(projectId)) throw new ApiError(400, "invalid project id");

  const notes = await Note.find({owner:projectId , createdBy:req?.user?._id }).sort({createdAt:-1});
  if(!notes) throw new ApiError(400 , "could not fetch notes")
  return res.status(200)
    .json(new ApiResponse(200, notes, "here are your notes"));
})

export { uploadProject, updateProject, getProjectById, deleteProject, getUserProjects  , addMemberToProject , addAttachmentToProject , addNotesToProject , getAllNotesForProject , getAllAttachmentsForProject  };