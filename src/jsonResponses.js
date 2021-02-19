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
  return JSON.stringify(responseObj);
};

const getRandomJokeResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' }); // Send response headers
  response.write(getRandomJokes());
  response.end();
};

const getRandomJokesResponse = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'application/json' }); // Send response headers
  response.write(getRandomJokes(params.limit));
  response.end();
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
module.exports.getRandomJokesResponse = getRandomJokesResponse;
