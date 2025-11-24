import { Router } from "express";
import { jwt_auth } from "../middlewares/auth.middleware.js";
import { upload_mul } from "../middlewares/multer.middleware.js";
import {

  uploadPaperManual,
  getUserConferencePapers,
  getUserJournals,
  getUserBookChapter,
  paperById,
  deletePaper,
  searchPaper,
  filter_search,
  getManualUploads,
  getScholarUploads,
  getPublishedPapers,
  getAboutToBePublishedPapers,
  addTag, downloadPaper, SearchPaperScholar, saveThesePapers, deleteAll, getPapers,
} from "../controllers/paper.controller.js";

const paperRoute = Router();
paperRoute.use(jwt_auth);

// Research paper routes
paperRoute.route("/getResearchPaper").get(SearchPaperScholar);//tested
// add a controller which willl take objects of schollar SEarch and save them to database
paperRoute.route("/savePapers").post(saveThesePapers)//tested
paperRoute.route("/addResearchPaperManual").post(upload_mul.single("paper"), uploadPaperManual); //tested


// Fetching routes
paperRoute.route("/getUserConferencePapers").get(getUserConferencePapers)//tested
paperRoute.route("/getUserJournals").get(getUserJournals)//tested
paperRoute.route("/getUserBookChapter").get(getUserBookChapter)//tested
paperRoute.route("/paperById/:paperId").get(paperById); //tested
paperRoute.route("/deletePaper/:paperId").delete(deletePaper);//tested
paperRoute.route("/searchPaper").get(searchPaper);
paperRoute.route("/getJournals").get(getUserJournals)
paperRoute.route("/getBookChapter").get(getUserBookChapter)
paperRoute.route("/getAllPapers").get(getPapers)


// functionality routes
paperRoute.route("/filterSearch").post(filter_search);
paperRoute.route("/manualUploads").get(getManualUploads);
paperRoute.route("/scholarUploads").get(getScholarUploads);
paperRoute.route("/publishedPapers").get(getPublishedPapers);
paperRoute.route("/aboutToBePublishedPapers").get(getAboutToBePublishedPapers);
paperRoute.route("/addTag/:paperId").post(addTag);
paperRoute.route("/download/:paperId").get(downloadPaper)//tested

paperRoute.route("/deleteAll").delete(deleteAll)

export default paperRoute;
