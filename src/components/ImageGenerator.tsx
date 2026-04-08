import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

export function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A professional vertical food collage for a mobile app screen, featuring 4 distinct sections: 1. Top view of luxury mini-pastries and sweets on golden trays. 2. Close-up of a grilled chicken taco with fries. 3. A slice of marble cake and traditional honey sweets. 4. A professional graduation cake with a mortarboard cap that says 'Congrats'. High-end catering style, vibrant colors, studio lighting, 8k resolution, shot on iPhone style, aspect ratio 9:16.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: prompt,
        config: {
          imageConfig: {
            aspectRatio: "9:16"
          }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64EncodeString}`);
        }
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="py-24 bg-stone-100 px-6 text-center">
      <h2 className="text-3xl font-serif mb-6">AI Image Generator</h2>
      <button 
        onClick={generate} 
        disabled={loading}
        className="bg-red-900 text-white px-8 py-4 rounded-full font-bold hover:bg-red-950 transition-colors disabled:opacity-50"
      >
        {loading ? 'Generating Image (takes ~10s)...' : 'Generate Collage Image'}
      </button>
      
      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      {imageUrl && (
        <div className="mt-12">
          <img src={imageUrl} alt="Generated Collage" className="mx-auto max-w-sm rounded-[2rem] shadow-2xl" />
          <p className="mt-4 text-stone-500 text-sm">Right-click or long-press to save the image.</p>
        </div>
      )}
    </div>
  );
}
