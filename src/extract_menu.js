import { GoogleGenAI } from "@google/genai";
import https from 'https';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const imageUrls = [
  'https://i.ibb.co/fVtS9vCq/menu4.jpg',
  'https://i.ibb.co/DNH4p7S/men2.jpg',
  'https://i.ibb.co/jjtVpwR/menue-3.jpg',
  'https://i.ibb.co/NzvDtSF/men.jpg'
];

async function fetchImageAsBase64(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer.toString('base64'));
      });
    }).on('error', reject);
  });
}

async function extractText() {
  for (const url of imageUrls) {
    try {
      const base64 = await fetchImageAsBase64(url);
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            inlineData: {
              data: base64,
              mimeType: "image/jpeg"
            }
          },
          "Extract all the text from this menu image. Format it clearly as Category -> Item -> Price. Please maintain the original language (French/Arabic) and prices."
        ]
      });
      console.log(`\n--- Menu from ${url} ---\n`);
      console.log(response.text);
    } catch (e) {
      console.error(`Error processing ${url}:`, e);
    }
  }
}

extractText();
