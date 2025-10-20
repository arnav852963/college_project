import {Router} from "express";
import { jwt_auth } from "../middlewares/auth.middleware.js";
import { admin_auth } from "../middlewares/admin_auth.middleware.js";
import {
  adminDashboard,
  from_To,


  userDetails

} from "../controllers/admin.controller.js";

const adminRoute = Router();


adminRoute.use(jwt_auth,admin_auth );
adminRoute.route("/dashboard").get(adminDashboard);
adminRoute.route("/user/:userId").get(userDetails);
adminRoute.route("/fromTo").get(from_To)

export default adminRoute;
