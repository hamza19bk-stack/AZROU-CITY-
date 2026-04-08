import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';

async function generateImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = "A professional vertical food collage for a mobile app screen, featuring 4 distinct sections: 1. Top view of luxury mini-pastries and sweets on golden trays. 2. Close-up of a grilled chicken taco with fries. 3. A slice of marble cake and traditional honey sweets. 4. A professional graduation cake with a mortarboard cap that says 'Congrats'. High-end catering style, vibrant colors, studio lighting, 8k resolution, shot on iPhone style, aspect ratio 9:16.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        fs.writeFileSync('public/collage.png', Buffer.from(base64EncodeString, 'base64'));
        console.log('Image saved to public/collage.png');
      } else if (part.text) {
        console.log(part.text);
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

generateImage();
