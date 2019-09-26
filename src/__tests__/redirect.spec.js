const readRedirectFile = require('../index');
const getUrl = require('../getUrl');

describe('Redirects', () => {
  test('getUrl takes url and returns null', async () => {
    expect.assertions(1);

    await expect(
      getUrl('www.google.com', 'redirects-apache-301.txt')
    ).rejects.toEqual(null);
  });

  test('getUrl takes url in nginx file and returns redirect url', async () => {
    expect.assertions(1);

    await getUrl('/get-in-touch/london/', 'redirects-apache-301.txt').then(
      value => {
        expect(value).toEqual('https://www.redirecturl.com/contact');
      }
    );
  });

  test('readApacheRedirectFile takes params and calls redirect', async () => {
    expect.assertions(1);

    const req = {
      url: '/get-in-touch/london/index.html'
    };

    const res = {
      redirect(url) {
        expect(url).toEqual('https://www.redirecturl.com/contact');
        return this;
      }
    };

    const next = jest.fn();

    await readRedirectFile(
      'https://www.redirecturl.com',
      'redirects-apache-301.txt'
    )(req, res, next);
  });
});
