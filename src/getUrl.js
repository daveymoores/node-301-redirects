const fs = require('fs');
const path = require('path');

function getUrl(url, redirectFile) {
  let data = '';

  return new Promise((resolve, reject) => {
    const readableStream = fs.createReadStream(
      path.join(__dirname, '../redirects', redirectFile),
      {
        encoding: 'utf8'
      }
    );

    readableStream.on('readable', function() {
      while ((chunk = readableStream.read()) != null) {
        data += chunk;
      }
    });

    readableStream.on('end', () => {
      const lineArray = data.split('\n');

      const redirectUrl = lineArray.reduce((acc, item) => {
        if (!item) return false;
        const redirectParams = item.split(' ');

        if (redirectParams.length !== 4) return false;
        if (url === redirectParams[2]) {
          acc = redirectParams[3];
        }
        return acc;
      }, null);

      if (redirectUrl) return resolve(redirectUrl);
      return reject(null);
    });
  });
}

module.exports = getUrl;
