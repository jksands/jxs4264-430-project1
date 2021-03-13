const _ = require('underscore');

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

const savePosition = (request, response, body) => {
  let responseCode = 400;
  if (!body.name || !body.data) {
    response.writeHead(responseCode); // Send response headers
    response.end();
    return;
  }
  const obj = JSON.parse(body.data);
  const foundItem = positions.find((e) => e.name === body.name);
  if (foundItem) { // Position exists
    responseCode = 204;
    // update position here
    positions[positions.indexOf(foundItem)].board = obj;
    response.writeHead(responseCode); // Send response headers
    response.end();
    return;
  }

  // position does NOT exist
  positions[positions.length] = {
    name: body.name,
    board: obj,
  };

  responseCode = 201;

  response.writeHead(responseCode); // Send response headers
  response.end();
};

// ALWAYS GIVE CREDIT - in your code comments and documentation
// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getRandomPosition = (request, response, params, acceptedTypes, method) => {
  let obj;
  if (params.name) {
    // CLIENT can only choose names that exist from drop down box
    // so no need to error check here
    obj = positions.find((e) => e.name === params.name);
  }
  // Failed to find an obj of that name or param not given
  if (!obj) {
    // just return random obj
    const r = _.shuffle(positions);
    obj = r[0];
  }

  // check for head request
  let contentLength;
  if (method === 'HEAD') {
    contentLength = getBinarySize(JSON.stringify(obj));
  }

  // XML response
  if (acceptedTypes.includes('text/xml')) {
    let responseString = `<name>${obj.name}</name>\n<pieces>`;
    for (let i = 0; i < obj.board.length; i += 1) {
      responseString += `
        <piece>
          <type>${obj.board[i].type}</type>
          <color>${obj.board[i].a}</color>
          <row>${obj.board[i].row}</row>
          <column>${obj.board[i].col}</column>
        </piece>
      `;
    }
    responseString += '</pieces>';
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
    response.write(JSON.stringify(obj));
    response.end();
  }
};

const getAllPositions = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' }); // Send response headers
  response.write(JSON.stringify(positions));
  response.end();
};
module.exports.getRandomPosition = getRandomPosition;
module.exports.getAllPositions = getAllPositions;
module.exports.savePosition = savePosition;
