const fs = require('fs');

// 5 - here's our 404 page
const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const indexPage = fs.readFileSync(`${__dirname}/../client/index.html`);
const cssPage = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const loadPage = fs.readFileSync(`${__dirname}/../client/load.html`);
const savePage = fs.readFileSync(`${__dirname}/../client/save.html`);
const adminPage = fs.readFileSync(`${__dirname}/../client/admin.html`);
const pieces = fs.readFileSync(`${__dirname}/../client/pieces.png`);

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' }); // send response headers
  response.write(errorPage); // send content
  response.end(); // close connection
};
const getIndex = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' }); // send response headers
  response.write(indexPage); // send content
  response.end(); // close connection
};
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssPage);
  response.end();
};
const getLoadPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(loadPage);
  response.end();
};
const getSavePage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(savePage);
  response.end();
};
const getAdminPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(adminPage);
  response.end();
};
const getImg = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(pieces);
  response.end();
};

module.exports.get404Response = get404Response;
module.exports.getIndex = getIndex;
module.exports.getCSS = getCSS;
module.exports.getLoadPage = getLoadPage;
module.exports.getSavePage = getSavePage;
module.exports.getAdminPage = getAdminPage;
module.exports.getImg = getImg;
