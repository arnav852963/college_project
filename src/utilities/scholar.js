import axios from "axios";
import { ApiError } from "./ApiError.js";
import dotenv from "dotenv"
import { throws } from "node:assert";
dotenv.config({
  path:"./.env"
})
//  search
export const searchScholarAPI = async (query,fromYear=-1,tillYear=-1) => {


  try {
    const obj ={
      engine: "google_scholar",
      api_key: process.env.SERP_API_KEY,
      scisbd:0
    }
    if(query) obj.q = query
    if(fromYear !== -1) obj.as_ylo = fromYear
    if(tillYear !== -1) obj.as_yhi = tillYear
    console.log(obj)
    const response = await axios.get("https://serpapi.com/search", {
      params: obj

    });

    return response.data.organic_results || [];
  } catch (error) {
    console.error("SerpAPI error:", error.message);
    throw new ApiError(500, "Failed to fetch from SerpAPI");
  }
}

// yeh hai author

export const authorScholarApi = async (authorId) => {
  try {
    const authorInfo = { author:{} ,stats: {}, papers: [] };

    const res_0_100 = await fetch(
      `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${authorId}&api_key=${process.env.SERP_API_KEY}&start=0&num=100`
    );
    if (!res_0_100.ok) throw new ApiError(500, "Failed to fetch author (page 1)");
    const data_100 = await res_0_100.json();

    authorInfo.stats = data_100?.cited_by;
    authorInfo.papers.push(...(data_100?.articles || []));
    authorInfo.author= data_100?.author
    if (!data_100?.articles || data_100?.articles?.length < 100) return authorInfo;

    const res_100_200 = await fetch(
      `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${authorId}&api_key=${process.env.SERP_API_KEY}&start=100&num=100`
    );
    if (!res_100_200.ok) throw new ApiError(500, "Failed to fetch author (page 2)");
    const data_200 = await res_100_200.json();

    authorInfo.papers.push(...(data_200?.articles || []));
    if (!data_200?.articles || data_200?.articles?.length < 100) return authorInfo;

    const res_200_300 = await fetch(
      `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${authorId}&api_key=${process.env.SERP_API_KEY}&start=200&num=100`
    );
    if (!res_200_300.ok) throw new ApiError(500, "Failed to fetch author (page 3)");
    const data_300 = await res_200_300.json();

    authorInfo.papers.push(...(data_300?.articles || []));

    return authorInfo;
  } catch (e) {
    throw new ApiError(500, "Author can't be fetched ---> " + e.message);
  }
};




