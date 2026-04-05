import https from 'https';

const imageUrls = [
  'https://i.ibb.co/fVtS9vCq/menu4.jpg',
  'https://i.ibb.co/DNH4p7S/men2.jpg',
  'https://i.ibb.co/jjtVpwR/menue-3.jpg',
  'https://i.ibb.co/NzvDtSF/men.jpg'
];

async function extractText() {
  for (const url of imageUrls) {
    try {
      const apiUrl = `https://api.ocr.space/parse/imageurl?apikey=helloworld&url=${encodeURIComponent(url)}&language=fre`;
      
      await new Promise((resolve, reject) => {
        https.get(apiUrl, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              console.log(`\n--- Menu from ${url} ---\n`);
              if (json.ParsedResults && json.ParsedResults.length > 0) {
                console.log(json.ParsedResults[0].ParsedText);
              } else {
                console.log("No text found or error:", json);
              }
              resolve();
            } catch (e) {
              console.error("Parse error:", e);
              resolve();
            }
          });
        }).on('error', reject);
      });
    } catch (e) {
      console.error(`Error processing ${url}:`, e);
    }
  }
}

extractText();
