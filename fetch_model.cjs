const https = require('https');
https.get('https://studio.tripo3d.ai/3d-model/1b506a2a-4d62-4dd3-8ea5-f363d76d5763?invite_code=XVNWJe', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const matches = data.match(/https?:\/\/[a-zA-Z0-9.\/\-_%]*\.glb/g) || [];
    console.log("Found GLB links:", matches);
    if(matches.length === 0) {
      console.log("Data sample:", data.substring(0, 500));
    }
  });
}).on('error', (e) => console.error(e));
