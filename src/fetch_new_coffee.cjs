const https = require('https');

const url = 'https://ibb.co/NntcG8Pv';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) {
      console.log(url, '->', match[1]);
    } else {
      console.log('No image found');
    }
  });
});
