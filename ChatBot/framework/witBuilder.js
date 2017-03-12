'use strict';

let Wit = require('../').Wit;
let constants = require("./constant");  

const accessToken = (() => {
    console.log(constants.Wit.serverAccessToken);
    return constants.Wit.serverAccessToken;
})();

// Quickstart example
// See https://wit.ai/ar7hur/quickstart

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    console.log('sending...', JSON.stringify(response));
  },
  getForecast({context, entities}) {
    var location = firstEntityValue(entities, 'location');
    if (location) {
      context.forecast = 'sunny in ' + location; // we should call a weather API here
      delete context.missingLocation;
    } else {
      context.missingLocation = true;
      delete context.forecast;
    }
    return context;
  },
};

const client = new Wit({accessToken, actions});
const uuid = require('uuid');
const sessionId = uuid.v1();
wit.runActions(sessionId)
    .then((ctx) => {
      
    })
    .catch(err => console.error(err))