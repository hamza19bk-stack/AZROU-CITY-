const https = require('https');

const urls = [
  'https://ibb.co/q3ftMd3J',
  'https://ibb.co/ccp3F701',
  'https://ibb.co/Z1S1TCLY',
  'https://ibb.co/67T9v00t'
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
