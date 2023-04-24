/**

    Copyright 2017-2019 Amazon.com, Inc. and its affiliates. All Rights Reserved.
    Licensed under the Amazon Software License (the "License").
    You may not use this file except in compliance with the License.
    A copy of the License is located at
      http://aws.amazon.com/asl/
    or in the "license" file accompanying this file. This file is distributed
    on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express
    or implied. See the License for the specific language governing
    permissions and limitations under the License.

    This skill demonstrates how to use Dialog Management to delegate slot
    elicitation to Alexa. For more information on Dialog Directives see the
    documentation: https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html

    This skill also uses entity resolution to define synonyms. Combined with
    dialog management, the skill can ask the user for clarification of a synonym
    is mapped to two slot values.
 **/

/* eslint-disable  func-names */
/* eslint-disable  no-restricted-syntax */
/* eslint-disable  no-loop-func */
/* eslint-disable  consistent-return */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

/* INTENT HANDLERS */

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Welcome to Choice Ladder. I will recommend ice cream flavors, and toppings that describe you. Do you want to start your journey or do you rather be a fruit cake?')
      .reprompt('Do you want to start your journey or do you rather be a fruit cake?')
      .getResponse();
  },
};

const FallbackHandler = {
  // 2018-Nov-21: AMAZON.FallackIntent is currently available in en-* and de-DE locales.
  //              This handler will not be triggered except in those locales, so it can be
  //              safely deployed here in the code for any locale.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const FruitCakeIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'FruitCakeIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('You don\'t want to start your journey? Have fun wasting away with fruit cake.')
      .getResponse();
  },
};

const InProgressRecommendationIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'DecisionIntent'
      && request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    let prompt = '';

    for (const slotName of Object.keys(handlerInput.requestEnvelope.request.intent.slots)) {
      const currentSlot = currentIntent.slots[slotName];
      if (currentSlot.confirmationStatus !== 'CONFIRMED'
                && currentSlot.resolutions
                && currentSlot.resolutions.resolutionsPerAuthority[0]) {
        if (currentSlot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_MATCH') {
          if (currentSlot.resolutions.resolutionsPerAuthority[0].values.length > 1) {
            prompt = 'Which would you like';
            const size = currentSlot.resolutions.resolutionsPerAuthority[0].values.length;

            currentSlot.resolutions.resolutionsPerAuthority[0].values
              .forEach((element, index) => {
                prompt += ` ${(index === size - 1) ? ' or' : ' '} ${element.value.name}`;
              });

            prompt += '?';

            return handlerInput.responseBuilder
              .speak(prompt)
              .reprompt(prompt)
              .addElicitSlotDirective(currentSlot.name)
              .getResponse();
          }
        } else if (currentSlot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_NO_MATCH') {
          if (requiredSlots.indexOf(currentSlot.name) > -1) {
            prompt = `What ${currentSlot.name} are you looking for`;

            return handlerInput.responseBuilder
              .speak(prompt)
              .reprompt(prompt)
              .addElicitSlotDirective(currentSlot.name)
              .getResponse();
          }
        }
      }
    }

    return handlerInput.responseBuilder
      .addDelegateDirective(currentIntent)
      .getResponse();
  },
};

const CompletedRecommendationIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'DecisionIntent'
      && request.dialogState === 'COMPLETED';
  },
  handle(handlerInput) {
    const filledSlots = handlerInput.requestEnvelope.request.intent.slots;

    const slotValues = getSlotValues(filledSlots);

    const key = `${slotValues.colormatter.resolved}-${slotValues.emotion.resolved}-${slotValues.moneymatter.resolved}-${slotValues.quality.resolved}`;
    const occupation = options[slotsToOptionsMap[key]];

    const speechOutput = `So you like ${slotValues.colormatter.resolved
    }. You are a ${slotValues.emotion.resolved
    }, money matters: ${slotValues.moneymatter.resolved
    }  and you are ${slotValues.quality.resolved
    } ` + `. You prefer ${occupation.name}`;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('This is Choice Ladder. I can help you find the ice cream flavor that matches your personality. You can say, recommend a flavor.')
      .reprompt('Do you want to start your journey or do you want to be a fruit cake?')
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Bye')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};


const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

/* CONSTANTS */

const skillBuilder = Alexa.SkillBuilders.custom();
const SKILL_NAME = 'Choice Ladder';
const FALLBACK_MESSAGE = `The ${SKILL_NAME} skill can\'t help you with that.  It can recommend the flavor that matches your personality. Do you want to start your journey or be a fruit cake?`;
const FALLBACK_REPROMPT = 'What can I help you with?';

const requiredSlots = [
  'colormatter',
  'emotion',
  'moneymatter',
  'quality',
];


const slotsToOptionsMap = {
	'caramel-balanced-sometimes-loving': 0,
	'caramel-balanced-sometimes-crafty': 1,
	'caramel-balanced-sometimes-minamilistic': 2,
	'caramel-balanced-yes-loving': 0,
	'caramel-balanced-yes-crafty': 1,
	'caramel-balanced-yes-minamilistic': 2,	
	'caramel-balanced-no-loving': 0,
	'caramel-balanced-no-crafty': 1,
	'caramel-balanced-no-minamilistic': 2,
	'caramel-joyful-sometimes-loving': 0,
	'caramel-joyful-sometimes-crafty': 1,
	'caramel-joyful-sometimes-minamilistic': 2,
	'caramel-joyful-yes-loving': 0,
	'caramel-joyful-yes-crafty': 1,
	'caramel-joyful-yes-minamilistic': 2,	
	'caramel-joyful-no-loving': 0,
	'caramel-joyful-no-crafty': 1,
	'caramel-joyful-no-minamilistic': 2,
	'caramel-peaceful-sometimes-loving': 0,
	'caramel-peaceful-sometimes-crafty': 1,
	'caramel-peaceful-sometimes-minamilistic': 2,
	'caramel-peaceful-yes-loving': 0,
	'caramel-peaceful-yes-crafty': 1,
	'caramel-peaceful-yes-minamilistic': 2,	
	'caramel-peaceful-no-loving':0 ,
	'caramel-peaceful-no-crafty': 1,
	'caramel-peaceful-no-minamilistic': 2,
	'mocha-balanced-sometimes-loving': 0,
	'mocha-balanced-sometimes-crafty':1 ,
	'mocha-balanced-sometimes-minamilistic': 2,
	'mocha-balanced-yes-loving': 0,
	'mocha-balanced-yes-crafty': 1,
	'mocha-balanced-yes-minamilistic':2 ,	
	'mocha-balanced-no-loving': 0,
	'mocha-balanced-no-crafty': 1,
	'mocha-balanced-no-minamilistic':2 ,
	'mocha-joyful-sometimes-loving': 0,
	'mocha-joyful-sometimes-crafty':1 ,
	'mocha-joyful-sometimes-minamilistic':2 ,
	'mocha-joyful-yes-loving': 0,
	'mocha-joyful-yes-crafty': 1,
	'mocha-joyful-yes-minamilistic':2 ,	
	'mocha-joyful-no-loving':0 ,
	'mocha-joyful-no-crafty': 1,
	'mocha-joyful-no-minamilistic': 2,
	'mocha-peaceful-sometimes-loving': 0,
	'mocha-peaceful-sometimes-crafty': 1,
	'mocha-peaceful-sometimes-minamilistic':2 ,
	'mocha-peaceful-yes-loving':0 ,
	'mocha-peaceful-yes-crafty':1 ,
	'mocha-peaceful-yes-minamilistic':2 ,	
	'mocha-peaceful-no-loving': 0,
	'mocha-peaceful-no-crafty': 1,
	'mocha-peaceful-no-minamilistic':2 ,	
	'dazzling white-balanced-sometimes-loving': 0,
	'dazzling white-balanced-sometimes-crafty': 2,
	'dazzling white-balanced-sometimes-minamilistic': 0,
	'dazzling white-balanced-yes-loving': 1,
	'dazzling white-balanced-yes-crafty': 2,
	'dazzling white-balanced-yes-minamilistic': 0,	
	'dazzling white-balanced-no-loving': 1,
	'dazzling white-balanced-no-crafty': 2,
	'dazzling white-balanced-no-minamilistic': 0,
	'dazzling white-joyful-sometimes-loving': 1,
	'dazzling white-joyful-sometimes-crafty': 2,
	'dazzling white-joyful-sometimes-minamilistic': 0,
	'dazzling white-joyful-yes-loving': 1,
	'dazzling white-joyful-yes-crafty': 2,
	'dazzling white-joyful-yes-minamilistic': 0,	
	'dazzling white-joyful-no-loving': 1,
	'dazzling white-joyful-no-crafty': 2,
	'dazzling white-joyful-no-minamilistic': 0,
	'dazzling white-peaceful-sometimes-crafty': 1,
	'dazzling white-peaceful-sometimes-minamilistic': 2,
	'dazzling white-peaceful-yes-loving': 0,
	'dazzling white-peaceful-yes-crafty': 1,
	'dazzling white-peaceful-yes-minamilistic': 2,	
	'dazzling white-peaceful-no-loving': 0,
	'dazzling white-peaceful-no-crafty': 1,
	'dazzling white-peaceful-no-minamilistic': 2,
	
}


const options = [
  { name: 'vanilla ice cream', description: '' },
  { name: 'chocolate ice cream', description: '' },
  { name: 'coffee ice cream', description: '' },
 
];

/* HELPER FUNCTIONS */

function getSlotValues(filledSlots) {
  const slotValues = {};

  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;

    if (filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case 'ER_SUCCESS_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            isValidated: true,
          };
          break;
        case 'ER_SUCCESS_NO_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].value,
            isValidated: false,
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        synonym: filledSlots[item].value,
        resolved: filledSlots[item].value,
        isValidated: false,
      };
    }
  }, this);

  return slotValues;
}

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    FruitCakeIntent,
    InProgressRecommendationIntent,
    CompletedRecommendationIntent,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
