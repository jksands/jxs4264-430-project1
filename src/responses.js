const _ = require('underscore');

let jokes;
// An array
const positions = [
// of objects
  {
  // With a name
    name: 'start',
    // And a board, which is an array of piece info
    board: [{
      type: 'p', color: 'white', row: '2', col: '1',
    },
    {
      type: 'p', color: 'white', row: '2', col: '2',
    },
    {
      type: 'p', color: 'white', row: '2', col: '3',
    },
    {
      type: 'p', color: 'white', row: '2', col: '4',
    },
    {
      type: 'p', color: 'white', row: '2', col: '5',
    },
    {
      type: 'p', color: 'white', row: '2', col: '6',
    },
    {
      type: 'p', color: 'white', row: '2', col: '7',
    },
    {
      type: 'p', color: 'white', row: '2', col: '8',
    },
    {
      type: 'r', color: 'white', row: '1', col: '1',
    },
    {
      type: 'n', color: 'white', row: '1', col: '2',
    },
    {
      type: 'b', color: 'white', row: '1', col: '3',
    },
    {
      type: 'k', color: 'white', row: '1', col: '4',
    },
    {
      type: 'q', color: 'white', row: '1', col: '5',
    },
    {
      type: 'b', color: 'white', row: '1', col: '6',
    },
    {
      type: 'n', color: 'white', row: '1', col: '7',
    },
    {
      type: 'r', color: 'white', row: '1', col: '8',
    },

    {
      type: 'p', color: 'black', row: '7', col: '1',
    },
    {
      type: 'p', color: 'black', row: '7', col: '2',
    },
    {
      type: 'p', color: 'black', row: '7', col: '3',
    },
    {
      type: 'p', color: 'black', row: '7', col: '4',
    },
    {
      type: 'p', color: 'black', row: '7', col: '5',
    },
    {
      type: 'p', color: 'black', row: '7', col: '6',
    },
    {
      type: 'p', color: 'black', row: '7', col: '7',
    },
    {
      type: 'p', color: 'black', row: '7', col: '8',
    },
    {
      type: 'r', color: 'black', row: '8', col: '1',
    },
    {
      type: 'n', color: 'black', row: '8', col: '2',
    },
    {
      type: 'b', color: 'black', row: '8', col: '3',
    },
    {
      type: 'k', color: 'black', row: '8', col: '4',
    },
    {
      type: 'q', color: 'black', row: '8', col: '5',
    },
    {
      type: 'b', color: 'black', row: '8', col: '6',
    },
    {
      type: 'n', color: 'black', row: '8', col: '7',
    },
    {
      type: 'r', color: 'black', row: '8', col: '8',
    }],
  },
  {
    name: 'pos1',
    board: [
      {
        type: 'k', color: 'white', row: '1', col: '7',
      },
      {
        type: 'p', color: 'white', row: '2', col: '6',
      },
      {
        type: 'p', color: 'white', row: '2', col: '7',
      },
      {
        type: 'p', color: 'white', row: '2', col: '8',
      },
      {
        type: 'r', color: 'white', row: '2', col: '3',
      },

      {
        type: 'k', color: 'black', row: '8', col: '7',
      },
      {
        type: 'p', color: 'black', row: '7', col: '6',
      },
      {
        type: 'p', color: 'black', row: '7', col: '7',
      },
      {
        type: 'p', color: 'black', row: '6', col: '8',
      },
      {
        type: 'r', color: 'black', row: '1', col: '1',
      }],
  },
  {
    name: 'pos2',
    board: [
      {
        type: 'k', color: 'white', row: '4', col: '6',
      },
      {
        type: 'q', color: 'white', row: '5', col: '7',
      },

      {
        type: 'k', color: 'black', row: '5', col: '8',
      },
      {
        type: 'p', color: 'black', row: '2', col: '1',
      }],
  },
];

// let positions = [];

// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here
const getRandomJokes = (amount = 1) => {
  let limit = Number(amount);
  limit = Math.floor(limit);
  limit = !limit ? 1 : limit;
  limit = limit < 1 ? 1 : limit;
  limit = limit > jokes.length ? jokes.length : limit;
  jokes = _.shuffle(jokes);
  const responseObj = [];
  for (let i = 0; i < limit; i += 1) {
    responseObj[i] = {
      q: jokes[i].q,
      a: jokes[i].a,
    };
  }
  // I'll just return the object here and then parse it accordingly
  // in getRandomJokesResponse
  return responseObj;
};

// Not functional as of right now - will return a position by saved NAME
const getSavedPosition = (request, response, params, acceptedTypes, method) => {
  // Just return a random position for now
  const r = _.shuffle(positions);
  response.writeHead(200, { 'Content-Type': 'application/json' }); // Send response headers
  response.write(JSON.stringify(r[0]));
  response.end();
};

const savePosition = (request, response, body) => {
  let responseCode = 400;
  const obj = JSON.parse(body.data);
  const foundItem = positions.find((e) => e.name === body.name);
  if (foundItem) { // Position exists
    responseCode = 204;
    // update position here
    positions[positions.indexOf(foundItem)].board = obj;
    // foundItem.board = obj;
    response.writeHead(responseCode); // Send response headers
    response.end();
    return;
  }

  // position does NOT exist
  positions[positions.length] = {
    name: body.name,
    board: obj,
  };
  console.log(`TEST: ${obj.type}`);

  responseCode = 201;

  response.writeHead(responseCode); // Send response headers
  response.end();
};

const getRandomPosition = (request, response, params, acceptedTypes, method) => {
  let obj;
  if (params.name) {
    // CLIENT can only choose names that exist from drop down box
    // so no need to error check here
    obj = positions.find((e) => e.name === params.name);
  } else {
    const r = _.shuffle(positions);
    obj = r[0];
  }
  response.writeHead(200, { 'Content-Type': 'application/json' }); // Send response headers
  response.write(JSON.stringify(obj));
  response.end();
};

const getAllPositions = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' }); // Send response headers
  response.write(JSON.stringify(positions));
  response.end();
};
// ALWAYS GIVE CREDIT - in your code comments and documentation
// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getRandomJokesResponse = (request, response, params, acceptedTypes, method) => {
  const responseObj = getRandomJokes(params.limit);
  let contentLength;
  if (method === 'HEAD') {
    contentLength = getBinarySize(JSON.stringify(responseObj));
  }
  if (acceptedTypes.includes('text/xml')) {
    let responseString = '<jokes>';
    for (let i = 0; i < responseObj.length; i += 1) {
      responseString += `
        <joke>
          <q>${responseObj[i].q}</q>
          <a>${responseObj[i].a}</a>
        </joke>
      `;
    }
    responseString += '</jokes>';

    // IF there's anything here, then we send back just the headers
    // THis seems rather clunky so I'm sure there's a more robust way of doing this
    if (contentLength) {
      response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': `${contentLength}` }); // Send response headers
      response.end();
      return;
    }
    response.writeHead(200, { 'Content-Type': 'text/xml' }); // Send response headers
    response.write(responseString);
    response.end();
  } else {
    if (contentLength) {
      response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': `${contentLength}` }); // Send response headers
      response.end();
      return;
    }
    response.writeHead(200, { 'Content-Type': 'application/json' }); // Send response headers
    response.write(JSON.stringify(responseObj));
    response.end();
  }
};

module.exports.getRandomJokesResponse = getRandomJokesResponse;
module.exports.getRandomPosition = getRandomPosition;
module.exports.getSavedPosition = getSavedPosition;
module.exports.getAllPositions = getAllPositions;
module.exports.savePosition = savePosition;
