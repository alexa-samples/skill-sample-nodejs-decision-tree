/**

    Copyright 2017-2018 Amazon.com, Inc. and its affiliates. All Rights Reserved.
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
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
  'en': require('./languages/en.js'),
};

/* INTENT HANDLERS */

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    return responseBuilder
      .speak(requestAttributes.t('WELCOME_MESSAGE'))
      .reprompt(requestAttributes.t('WELCOME_REPROMPT'))
      .getResponse();
  },
};

const CouchPotatoIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'CouchPotatoIntent';
  },
  handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    return responseBuilder
      .speak(requestAttributes.t('COUCH_POTATO_RESPONSE'))
      .getResponse();
  },
};

const InProgressRecommendationIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'RecommendationIntent'
      && request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    let prompt = '';

    for (const slotName of Object.keys(handlerInput.requestEnvelope.request.intent.slots)) {
      const currentSlot = currentIntent.slots[slotName];
      const attributesManager = handlerInput.attributesManager;
      const responseBuilder = handlerInput.responseBuilder;
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

      if (currentSlot.confirmationStatus !== 'CONFIRMED'
                && currentSlot.resolutions
                && currentSlot.resolutions.resolutionsPerAuthority[0]) {
        if (currentSlot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_MATCH') {
          if (currentSlot.resolutions.resolutionsPerAuthority[0].values.length > 1) {
            prompt = requestAttributes.t('DECISION_PROMPT');
            const size = currentSlot.resolutions.resolutionsPerAuthority[0].values.length;

            currentSlot.resolutions.resolutionsPerAuthority[0].values
              .forEach((element, index) => {
                prompt += ` ${(index === size - 1) ? ' or' : ' '} ${element.value.name}`;
              });

            prompt += '?';

            return responseBuilder
              .speak(prompt)
              .reprompt(prompt)
              .addElicitSlotDirective(currentSlot.name)
              .getResponse();
          }
        } else if (currentSlot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_NO_MATCH') {
          if (requiredSlots.indexOf(currentSlot.name) > -1) {
            prompt = requestAttributes.t(UNMATCHED_SLOT_PROMPT, currentSlot.name);

            return responseBuilder
              .speak(prompt)
              .reprompt(prompt)
              .addElicitSlotDirective(currentSlot.name)
              .getResponse();
          }
        }
      }
    }

    return responseBuilder
      .addDelegateDirective(currentIntent)
      .getResponse();
  },
};

const CompletedRecommendationIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'RecommendationIntent'
      && request.dialogState === 'COMPLETED';
  },
  handle(handlerInput) {
    const filledSlots = handlerInput.requestEnvelope.request.intent.slots;

    const slotValues = getSlotValues(filledSlots);
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    const key = `${slotValues.salaryImportance.resolved}-${slotValues.personality.resolved}-${slotValues.bloodTolerance.resolved}-${slotValues.preferredSpecies.resolved}`;
    const occupation = requestAttributes.options[slotsToOptionsMap[key]];



    return responseBuilder
      .speak(requestAttributes.t('COMPLETED_RECOMMENDATION_MESSAGE', slotValues.salaryImportance.resolved, slotValues.personality.resolved, slotValues.preferredSpecies.resolved, (slotValues.bloodTolerance.resolved === 'high' ? 'can' : "can't"), occupation.name);
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
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    return responseBuilder
      .speak(requestAttributes.t('HELP_MESSAGE')
      .reprompt(requestAttributes.t('HELP_REPROMPT'))
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
    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    return responseBuilder
      .speak(requestAttributes.t('EXIT_MESSAGE')
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

    const attributesManager = handlerInput.attributesManager;
    const responseBuilder = handlerInput.responseBuilder;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    return responseBuilder
      .speak(requestAttributes.t('ERROR_MESSAGE')
      .reprompt(requestAttributes.t('ERROR_MESSAGE'))
      .getResponse();
  },
};

/* CONSTANTS */

const skillBuilder = Alexa.SkillBuilders.custom();

const requiredSlots = [
  'preferredSpecies',
  'bloodTolerance',
  'personality',
  'salaryImportance',
];

const slotsToOptionsMap = {
  'unimportant-introvert-low-animals': 20,
  'unimportant-introvert-low-people': 8,
  'unimportant-introvert-high-animals': 1,
  'unimportant-introvert-high-people': 4,
  'unimportant-extrovert-low-animals': 10,
  'unimportant-extrovert-low-people': 3,
  'unimportant-extrovert-high-animals': 11,
  'unimportant-extrovert-high-people': 13,
  'somewhat-introvert-low-animals': 20,
  'somewhat-introvert-low-people': 6,
  'somewhat-introvert-high-animals': 19,
  'somewhat-introvert-high-people': 14,
  'somewhat-extrovert-low-animals': 2,
  'somewhat-extrovert-low-people': 12,
  'somewhat-extrovert-high-animals': 17,
  'somewhat-extrovert-high-people': 16,
  'very-introvert-low-animals': 9,
  'very-introvert-low-people': 15,
  'very-introvert-high-animals': 17,
  'very-introvert-high-people': 7,
  'very-extrovert-low-animals': 17,
  'very-extrovert-low-people': 0,
  'very-extrovert-high-animals': 1,
  'very-extrovert-high-people': 5,
};

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
};

const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      resources: languageStrings,
    });
    localizationClient.localize = function localize() {
      const args = arguments;
      const values = [];
      for (let i = 1; i < args.length; i += 1) {
        values.push(args[i]);
      }
      const value = i18n.t(args[0], {
        returnObjects: true,
        postProcess: 'sprintf',
        sprintf: values,
      });
      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)];
      }
      return value;
    };
    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function translate(...args) {
      return localizationClient.localize(...args);
    };
  },
};


exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    CouchPotatoIntent,
    InProgressRecommendationIntent,
    CompletedRecommendationIntent,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler,
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();
