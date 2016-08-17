/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask my car to drive"
 *  Alexa: "Okey, car is driving, keep an eye on it"
 */

/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.echo-sdk-ams.app.d2b1ecdc-2691-4b99-9d05-b9a0117a347c';

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Presentation is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Presentation = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Presentation.prototype = Object.create(AlexaSkill.prototype);
Presentation.prototype.constructor = Presentation;

Presentation.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log("Presentation onSessionStarted requestId: " + sessionStartedRequest.requestId
    + ", sessionId: " + session.sessionId);
  // any initialization logic goes here
};

Presentation.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  console.log("Presentation onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  var speechOutput = "Welcome to this presentation. Tell me what you would like to learn.";
  var repromptText = "What do you want to learn?";
  response.ask(speechOutput, repromptText);
};

Presentation.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log("Presentation onSessionEnded requestId: " + sessionEndedRequest.requestId
    + ", sessionId: " + session.sessionId);
  // any cleanup logic goes here
};

Presentation.prototype.intentHandlers = {
  "IntroductionIntent": function (intent, session, response) {
    response.tellWithCard("Hello Hyper! My name is Jarvis, I'm what you call a home assistant.", "Presentation", "WAT!");
  },

  "WhatAreIntent": function (intent, session, response) {
    response.tellWithCard("Home assistants are devices like me. We come in many shapes and sizes. I'm sort of related to personal assistants, like the one you would find on your phone or maybe even your watch. The biggest difference is that we are intented to be in your home.", "Presentation", "WAT!");
  },

  "HowDoYouWorkIntent": function (intent, session, response) {
    response.tellWithCard("I work by having a microphone array and a speaker. The microphone array enables me to hear what people are saying even if they are far away. You can use me to dim the lights, put on some Barry White...", "Presentation", "WAT!");
  },

  "UsecasesIntent": function (intent, session, response) {
    response.tellWithCard("Sure, I can be programmed to do whatever basically. You can create what we call skills, they can do anything you want. That being addding stuff to a shopping list, greeting you when you arrive home. Summoning your car etc.", "Presentation", "WAT!");
  },
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the Presentation skill.
  var skill = new Presentation();
  skill.execute(event, context);
};

