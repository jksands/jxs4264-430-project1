console.log('First web service starting up ...');

// 1 - pull in the HTTP server module
const http = require('http');
const query = require('querystring');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./responses.js');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/random-position': jsonHandler.getRandomPosition,
  '/all-positions': jsonHandler.getAllPositions,
  '/default-styles.css': htmlHandler.getCSS,
  '/index.html': htmlHandler.getIndex,
  '/load.html': htmlHandler.getLoadPage,
  '/save.html': htmlHandler.getSavePage,
  '/admin.html': htmlHandler.getAdminPage,
  '/pieces.png': htmlHandler.getImg,
  '/delete.png': htmlHandler.getDelImg,
  '/clear.png': htmlHandler.getClearImg,
  notFound: htmlHandler.get404Response,
};

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/save-position') {
    const body = [];

    // https://nodejs.org/api/http.html
    request.on('error', (err) => {
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString(); // name and board
      const bodyParams = query.parse(bodyString); // turn into an object with .name and .board
      jsonHandler.savePosition(request, response, bodyParams);
    });
  }
};

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;

  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];
  const httpMethod = request.method;

  if (httpMethod === 'POST') {
    // Handle POST
    handlePost(request, response, parsedUrl);
    return; // ABORT
  }

  const params = query.parse(parsedUrl.query);
  const { name } = params;
  console.log('params=', params);
  console.log('name=', name);

  // Assumse GETS
  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params, acceptedTypes, httpMethod);
  } else {
    urlStruct.notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
