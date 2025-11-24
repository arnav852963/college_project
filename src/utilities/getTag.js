const tagDictionary = {
  "Blockchain": ["blockchain", "smart contract", "ethereum", "ledger", "crypto"],
  "AI & ML": ["artificial intelligence", " ai ", "machine learning", " ml ", "deep learning", "neural network", "cnn", "rnn", "lstm"],
  "IoT": ["internet of things", " iot ", "sensor", "wireless sensor network", "wsn", "rfid"],
  "Security": ["security", "privacy", "authentication", "cryptography", "encryption", "attack", "malware", "intrusion"],
  "Cloud/Edge": ["cloud computing", "edge computing", "fog computing", "distributed systems"],
  "Data Science": ["big data", "data mining", "analytics", "clustering"]
};



export default function generateTags(content) {

  const textToScan = `${content}`.toLowerCase();


  const foundTags = new Set();


  for (const [category, keywords] of Object.entries(tagDictionary)) {


    for (const keyword of keywords) {

      if (keyword.trim().length < 4) {

        const regex = new RegExp(`\\b${keyword.trim()}\\b`, "i");
        if (regex.test(textToScan)) {
          foundTags.add(category);
          break;
        }
      }

      else if (textToScan.includes(keyword)) {
        foundTags.add(category);
        break;
      }
    }
  }


  return Array.from(foundTags);
}