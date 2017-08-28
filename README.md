# Build An Alexa Decision Tree Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-off._TTH_.png)](https://github.com/alexastaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png)](https://github.com/AlexaStaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](https://github.com/AlexaStaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](https://github.com/AlexaStaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](https://github.com/AlexaStaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](https://github.com/AlexaStaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/6-publication.md)

<!--<a href="https://github.com/AlexaStaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-off._TTH_.png" /></a><a href="https://github.com/alexastaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png" /></a><a href="https://github.com/alexastaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png" /></a><a href="https://github.com/alexastaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png" /></a><a href="https://github.com/alexastaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png" /></a><a href="https://github.com/alexastaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png" /></a>-->

## What You Will Learn
*  [AWS Lambda](http://aws.amazon.com/lambda)
*  [Alexa Skills Kit (ASK)](https://developer.amazon.com/alexa-skills-kit)
*  Voice User Interface (VUI) Design
*  Skill Certification
*  Reprompts
*  State Management
*  A Simple Binary ("Yes" or "No") Decision Tree Algorithm Implementation

## What You Will Need
*  [Amazon Developer Portal Account](http://developer.amazon.com)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code provided in this repository.
*  A series of yes or no questions to ask your users and results based on their answers. Good types of question and answers for this could be:
   *  Magazine style quizzes like "What kind of job is good for me?", or "Which superhero personality type am I?"
   *  Suggestion and Reccommendation based skills like "Where cuisine should I eat today?", or "What genre of movie should I watch?"

## What Your Skill Will Do

We make choices every day. We choose what to wear, where to go for dinner, which route to take to work or school. Decision making is a vital and regular part of our livelihood. 

Sometimes we're faced with so many choices, that arriving at a conclusive decision can be difficult. Decision trees can help simplify this for us.

Decision trees are a model that provide a structured process to chart out a course of action or arrive at a generalized conclusion, based on specific facts. Inherent in their name, decision trees are visualized as a tree like structure illuminating possible outcomes down a series of branches. 

To learn more about decision trees, a good place to start would be <a href="https://en.wikipedia.org/wiki/Decision_tree" target="_blank">the wikipedia page for Decision Trees</a>.

Decision trees can form the basis of many different kinds of Alexa skills. In a turn based adventure game, presenting a user with a choice can progress a narrative. Additionally, decision trees can be utilized to recommend, or suggest a course of action (i.e. "What movie should I watch?").

In this sample skill, we'll explore how a decision tree can be implemented. Alexa will provide an ideal career by asking a series of questions and giving you an answer. Alexa will ask questions such as:
*   "Do you like working with people?"
*   "Do you like caring for others?"
*   "Would you like to work during the day?"

The response to each question will procedurally progress the user through the nodes (branches) in the decision tree. Alexa will continue asking more questions until a final decision node is reached, at which point she will suggest an ideal career for you!

<a href="https://github.com/AlexaStaging/skill-sample-nodejs-decision-tree/blob/master/step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_get_started._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>



