const https = require('https');

const urls = [
  'https://ibb.co/BV4M0kCq',
  'https://ibb.co/ksPKZ5yw',
  'https://ibb.co/4wwqCqNm',
  'https://ibb.co/9m9VMN1S',
  'https://ibb.co/qvQFf6w',
  'https://ibb.co/jkFCSsCb',
  'https://ibb.co/vC08tzrS'
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
