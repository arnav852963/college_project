import  {Router} from "express";

import { jwt_auth } from "../middlewares/auth.middleware.js";
import { upload_mul } from "../middlewares/multer.middleware.js";
import {
  uploadPatent,
  updatePatent,
  deletePatent,
  getPatentById,
  getUserPatents
} from "../controllers/patent.controller.js";

const patentRoutes = Router();
patentRoutes.use(jwt_auth);


patentRoutes.route("/uploadPatent").post(upload_mul.single("pdf"), uploadPatent); // upload patent with PDF
patentRoutes.route("/updatePatent/:patentId").put(updatePatent);
patentRoutes.route("/deletePatent/:patentId").delete(deletePatent);
patentRoutes.route("/getPatentById/:patentId").get(getPatentById);
patentRoutes.route("/getUserPatents").get(getUserPatents);

export default patentRoutes