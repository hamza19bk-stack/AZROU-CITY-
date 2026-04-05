const https = require('https');

const urls = [
  'https://ibb.co/V81nJmL',
  'https://ibb.co/TZxcLHF',
  'https://ibb.co/bGtHfvJ',
  'https://ibb.co/Myphf6RZ'
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
