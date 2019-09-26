const getUrl = require('./getUrl');

function readRedirectFile(baseUrl, redirectFile) {
  return async function(req, res, next) {
    const url = req.url.replace('index.html', '');
    const currentUrl = `${req.protocol}://${req.get('host')}`;

    try {
      const redirectUrl = await getUrl(url, redirectFile);
      const fullUrl = redirectUrl.replace(baseUrl, currentUrl);
      if (fullUrl) {
        res.redirect(fullUrl);
        res.end();
      }
    } catch (err) {
      next();
    }
  };
}

module.exports = readRedirectFile;
