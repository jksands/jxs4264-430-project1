const fs = require('fs');

// 5 - here's our 404 page
const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const cssPage = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' }); // send response headers
  response.write(errorPage); // send content
  response.end(); // close connection
};
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssPage);
  response.end();
};

module.exports.get404Response = get404Response;
module.exports.getCSS = getCSS;
