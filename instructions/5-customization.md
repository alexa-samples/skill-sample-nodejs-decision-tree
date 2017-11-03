# Build An Alexa Decision Tree Skill
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-on._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/6-publication.md)

<!--<a href="https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-on._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png" /></a>-->

## Customize the Skill to be Yours

At this point, you should have a working copy of our Decision Tree skill.  In order to make it your own, you will need to customize it with questions and conclusions that you create.  Open the index_templates.js file, copy and paste it directly into Lambda, or into a text editor/IDE to make the customizations. Here are the things you will need to change:

1.  **New data.** You will need to create a new set of messages, questions, answers, and descriptions for your skill.

    1.  **Open a copy of index_template.js.** If you haven't already downloaded the code for this project, [you can find a copy of index_template.js here on GitHub](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/lambda/custom/index_template.js).  You can use a simple, lightweight code editor like [Atom](http://atom.io), [Sublime Text](http://sublimetext.com), or [VSCode](http://code.visualstudio.com), but you also have the option to edit the code directly in your Lambda function.

    2.  **Search for the comment "TODO: Replace this data with your own."**  These are the placeholders for our skill.  You can see that there are **questions**, **answers & descriptions**, and **messages or prompts**. Here's some things to consider:

        1. You can provide questions, answers, messages and prompts to customize your decision tree.

        2. **A Quick Explanation of How it Works** Take a look at the code in [index_template.js at line 20](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/lambda/custom/index_template.js#L20). Each "yes" or "no" answer maps to a different node in the `nodes` array. The resulting node may be a another question, in which case Alexa will expect another "yes" or "no" answer from the user before progressing to the next node. This will continue procedurally until an "answer" node is reached (nodes with `0` values for `yes` and `no` object properties). Once at an exit node, the programmatic end of the decision tree has been reached. Alexa will read the description to the user.

        3. There are three states in this implementation. Each state has its own set of handlers. Take a look at the comments in the code to understand what they do in greater detail.

            *  STARTMODE: [Line 96 in index_template.js](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/lambda/custom/index_template.js#L96) 
            Prompt the user to start or restart the game.
            *  ASKMODE: [Line 113 in index_template.js](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/lambda/custom/index_template.js#L113) 
            Alexa is asking user the questions
            *  DESCRIPTIONMODE: [Line 164 in index_template.js](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/lambda/custom/index_template.js#L164) 
            Alexa is describing the final choice and prompting to start again or quit.


    3.  **When you have replaced the placeholders in index_template.js, copy the contents of your file to your Lambda function.**  This should be as simple as copying the text, and pasting it into the code box for your Lambda.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/5-1-5-lambda-code-box._TTH_.png" />


4.  **Once you have made the updates listed on this page, you can click "Next" to move on to Publishing and Certification of your skill.**

    <a href="6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-7-next-button._TTH_.png" /></a>

<br/><br/>
<a href="https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/instructions/6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>


