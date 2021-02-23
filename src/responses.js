const _ = require('underscore');

let jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny?' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff?' },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny?' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect?" },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing?' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst?' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie?' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers?' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends?' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me?' },
  { q: 'Can February March?', a: 'No, but April May?' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck?' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down?' },
  { q: 'Dad, can you put the cat out?', a: 'I didnt know it was on fire?' },
  { q: 'What did the ocean say to the sailboat?', a: 'Nothing, it just waved?' },
  { q: 'What do you get when you cross a snowman with a vampire?', a: 'Frostbite?' },
];

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
