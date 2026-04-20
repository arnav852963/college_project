import express from "express"
import cors from "cors"
import cookie from "cookie-parser"

const app = express();


app.set("trust proxy", 1);

const allowedOrigins = String(process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));




app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookie())


import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users" , userRoutes)

import paperRoute from "./routes/paper.route.js";
app.use("/api/v1/papers" , paperRoute)

import starRoutes from "./routes/star.routes.js";
app.use("/api/v1/star" , starRoutes)

import groupRoutes from "./routes/group.routes.js";
app.use("/api/v1/group" , groupRoutes)

import dashboardRoutes from "./routes/dashboard.routes.js";
app.use("/api/v1/dashboard" , dashboardRoutes)

import patentRoutes from "./routes/patent.routes.js";
app.use("/api/v1/patents" , patentRoutes)

import projectRoute from "./routes/project.route.js";
app.use("/api/v1/projects" , projectRoute)

import adminRoute from "./routes/admin.routes.js";
app.use("/api/v1/admin" , adminRoute)

import portfolioRoutes from "./routes/portfolio.routes.js";

app.use("/api/v1/portfolio", portfolioRoutes)
export {app}
