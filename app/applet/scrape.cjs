const https = require('https');

const urls = [
  'https://ibb.co/KvHV1cL',
  'https://ibb.co/dJgDqbBp',
  'https://ibb.co/pBgYgJGh',
  'https://ibb.co/JWYMgFmX',
  'https://ibb.co/d0G5sL2s',
  'https://ibb.co/svvTzc9N',
  'https://ibb.co/6zmZF8H',
  'https://ibb.co/6Rwrck66',
  'https://ibb.co/Hjjd4pQ'
];

async function fetchDirectUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<meta property="og:image" content="([^"]+)"/);
        resolve({ url, direct: match ? match[1] : null });
      });
    }).on('error', () => resolve({ url, direct: null }));
  });
}

Promise.all(urls.map(fetchDirectUrl)).then(results => console.log(JSON.stringify(results, null, 2)));
