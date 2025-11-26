import {GoogleGenAI} from "@google/genai"
import dotenv from "dotenv"
dotenv.config({
  path:"./.env"
})

const instance = new GoogleGenAI({
  apiKey: process.env.GEMINI_API,
  apiVersion:"v1alpha"
})

export default instance