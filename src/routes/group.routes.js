import { Router } from "express";
import { jwt_auth } from "../middlewares/auth.middleware.js";
import {
  getAllGroups, getGroupById, createGroup, deleteGroup, addPaperToGroup, removePaper, updateGroup,
   createGroupByTag,
} from "../controllers/group.controller.js";

const groupRoutes = Router();
groupRoutes.use(jwt_auth);
//get
groupRoutes.get("/groups", getAllGroups);
groupRoutes.get("/groups/:groupId", getGroupById);


//post
groupRoutes.post("/createGroup", createGroup);
groupRoutes.route("/groupByTag").post(createGroupByTag)
//update
groupRoutes.patch("/updateGroup/:groupId", updateGroup);
groupRoutes.patch("/addPaper", addPaperToGroup);
groupRoutes.patch("/removePaper", removePaper);
//del
groupRoutes.delete("/deleteGroup/:groupId", deleteGroup);




export default groupRoutes;
