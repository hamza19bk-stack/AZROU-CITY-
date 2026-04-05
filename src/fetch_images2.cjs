const https = require('https');

const urls = [
  'https://ibb.co/dJgDqbBp'
];

urls.forEach(url => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      const match = data.match(/<meta property="og:image" content="([^"]+)"/);
      if (match) {
        console.log(url, '->', match[1]);
      }
    });
  });
});
