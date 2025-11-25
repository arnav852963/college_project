


export default function classifyPaper(paper) {

  const pubString = (paper.publication || "").toLowerCase();
  const titleString = (paper.title || "").toLowerCase();


  if (pubString.includes("in:") || pubString.includes("edited by") || pubString.includes("eds.")) {
    return "book chapter";
  }

  const bookKeywords = [
    "handbook", "encyclopedia", "companion", "lncs",
    "lecture notes", "advances in", "reading in", "studies in"
  ];
  if (bookKeywords.some(k => pubString.includes(k))) {
    return "book chapter";
  }


  const confKeywords = [
    "conference", "proceedings", "symposium", "workshop",
    "congress", "convention", "colloquium", "proc.", "meeting"
  ];
  if (confKeywords.some(k => pubString.includes(k))) {
    return "conference";
  }


  const journalKeywords = [
    "journal", "transactions", "letters", "annals", "bulletin",
    "review", "communications", "quarterly", "magazine", "archives"
  ];
  if (journalKeywords.some(k => pubString.includes(k))) {
    return "journal";
  }


  const journalPattern = /\d+\s*\(\d+\)/;
  if (journalPattern.test(pubString)) {
    return "journal";
  }


  const bookPublishers = ["springer", "wiley", "elsevier", "taylor & francis"];
  if (bookPublishers.some(k => pubString.includes(k)) && !pubString.includes("vol")) {

    return "book chapter";
  }

  return "Other / Unknown";
}