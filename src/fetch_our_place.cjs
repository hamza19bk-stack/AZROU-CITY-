const https = require('https');

const urls = [
  'https://ibb.co/4RCB4hnj',
  'https://ibb.co/zTsP6DVM',
  'https://ibb.co/sJp8cRmN',
  'https://ibb.co/M53G4bzK',
  'https://ibb.co/JWkcvjtV',
  'https://ibb.co/sf4QZh6',
  'https://ibb.co/2YP1dF6x',
  'https://ibb.co/Q3bXFLwK',
  'https://ibb.co/3Ym7s111'
];

urls.forEach(url => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      const match = data.match(/<meta property="og:image" content="([^"]+)"/);
      if (match) {
        console.log(url, '->', match[1]);
      } else {
        console.log(url, '-> Not found');
      }
    });
  }).on('error', (e) => {
    console.error(url, '-> Error:', e.message);
  });
});
