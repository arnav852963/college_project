import { Router } from "express";
import { jwt_auth } from "../middlewares/auth.middleware.js";
import { portfolio } from "../controllers/portfolio.controller.js";

const portfolioRoutes = Router()

portfolioRoutes.use(jwt_auth)
portfolioRoutes.route("/createPortfolio").post(portfolio)

export  default portfolioRoutes