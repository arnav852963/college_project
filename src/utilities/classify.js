import instance from "./geminiConfig.js";

const classifyByGemini = async (content)=>{
  try {
    const response = await instance.models.generateContent({
      model:"gemini-2.5-flash",
      contents: content ,

    })
    if(!response){
      throw new Error("No response from gemini api")
    }
    return response.text

  } catch (e){
    console.log("nai chala gemini" )
    throw new Error(e.message);

  }

}

export default classifyByGemini

