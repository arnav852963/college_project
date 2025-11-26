import {Router} from "express";
import {jwt_auth} from "../middlewares/auth.middleware.js";
import {upload_mul} from "../middlewares/multer.middleware.js";
import {
  uploadProject,
  updateProject,
  deleteProject,
  getProjectById,
  getUserProjects, addMemberToProject, addAttachmentToProject, addNotesToProject, getAllNotesForProject,
  getAllAttachmentsForProject,
} from "../controllers/project.controller.js";

const projectRoute = Router();
projectRoute.use(jwt_auth);


projectRoute.route("/uploadProject").post(uploadProject);
projectRoute.route("/updateProject/:projectId").put(updateProject);
projectRoute.route("/deleteProject/:projectId").delete(deleteProject);
projectRoute.route("/getProjectById/:projectId").get(getProjectById)
projectRoute.route("/addMember/:projectId").patch(addMemberToProject)
projectRoute.route("/addAttachment/:projectId").post(upload_mul.single("attachment"), addAttachmentToProject)
projectRoute.route("/getUserProjects").get(getUserProjects)
projectRoute.route("/addNoteToProject/:projectId").post(addNotesToProject)
projectRoute.route("/getAllNotes/:projectId").get(getAllNotesForProject)
projectRoute.route("/getAllAttachments/:projectId").get(getAllAttachmentsForProject)






export default projectRoute