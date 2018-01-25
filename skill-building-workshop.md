### Alexa Skill Building Workshop Dialog Management

#### Introduction

For this lab you will design and create your own custom Alexa recommendation skill. The skill will ask the user a series a questions and the answers provided will gradually narrow down the options until a match is made. 

Human conversation is about exchanging meaning in ways that make sense in the current situation. Expressing and extracting meaning is not as simple as it may seem, and you’ll need to design conversations between Alexa and your customers carefully and intentionally. A great voice experience allows for the many ways people might express meaning and intent.

Conversational UI consists of turns starting with a person saying something, followed by Alexa responding. This is a new form of interaction for many people, so make sure that you’re aware of the ways in which users participate in the conversation so that you can design for it.

Throughout this guide, we will be referring to [pet match](http://alexa.design/petmatch) which recommends dogs.

For this lab you'll want to partner with at least one person so you can take turns reading your script. You should practice your interactions aloud. If the conversation feels unnatural  

#### Task 1: Brainstorming

##### 1.1 Identify purpose ####

  Describe one or more scenarios in which people will find your skill useful and desirable. Determine the capabilities of the skill by asking the following questions:
  * What is the purpose of the skill? Why will people want to use it?
  * What will the person be doing before, during, and after interacting with the skill?
  * What will people get from the skill that they cannot get another way?


##### 1.2 Think of Something to Recommend

Think of what you want to recommend to the user. If you're stumped or are having trouble deciding, you could try, books, movies, tv shows, video games, comics, manga, anime, super heroes, music, schools, food, etc.

##### 1.3 Determine Match Criteria

With your partner figure out what criteria you need to collect from the user in order make a recommendation. For example, pet match's search criteria are **size**, **temperament** and **energy**. You will also need to determine the values for each of your criterion. For example, pet match's possible values for **size** are **tiny**, **small**, **medium**, and **large**.

Once you'ved decided what you're going to recommend to your user you're ready to move to the next task. 

#### Task 2: Dialog Sketch

##### 2.1 Write happy path scripts

Show the core value and experiences by writing 1-4 scripts between the user and Alexa. For this lab, assume that everything works perfectly. These are happy path scripts. For this, you can use a word processor, or paper and a template like this: [Alexa Dialogue Design](https://www.amazon.com/clouddrive/share/5WMoGXcKHSWWSoRiC3VNFmBnEveQBdPnLZq711Iu3d?ref_=cd_ph_share_link_copy)

#### Task 3: Add Userflow

A basic script doesn’t fully represent how people will interact with your skill in real life. Users may say too little, too much, or say things that you weren’t expecting. Use the following techniques to expand your script and catch various ways in which a user might accomplish tasks

##### 3.1 Identify Intents

Intents represent the unique things that your skill is able to do. A skill for planning a trip might have five intents, for example PlanATrip, BookTheTrip, Stop, Cancel, and Help.

**Note:** For this workshop you will need to name your intent **RecommendationIntent** because the code generator you'll use in [6.2 Generate your Lambda function code](https://github.com/SleepyDeveloper/skill-sample-nodejs-decision-tree/blob/master/skill-building-workshop.md#62-generate-your-lambda-function-code) 
expects the name of your intent to be **RecommendationIntent**. Upon seeing the
intent name it will add some special pieces to your code that it needs to work.

##### 3.2 Identify Utterances
Utterances include the robust list of words, phrases, and sentences users will say to engage and fulfill the intent. For example, to use the PetMatchIntent intent, the user might say “Recommend a dog,” “I want a large family dog,” or “I like large dogs.”

##### 3.3 Identify Slots

Slots allow people to specify variable parts of an utterance, for example **size** or **temperament**. Slots are common in task- and information-focused skills. Design how the slots show up in utterances, and then choose slot values from the built-in catalog or provide your own slot values. In the following example utterances, {size} and {temperament} are slots:


*  “I like {size} dogs”
*  “I want a {temperament} dog”
*  “I want a {size} {temperament} dog”

Your recommendation **criteria** should be your slots.

For this task, you can use [more detailed dialog sketches](https://www.amazon.com/clouddrive/share/PLKDyDip6Jv1HK450NTTGzJZJB4QjDyYxTMlQgmWDCQ?ref_=cd_ph_share_link_copy)

#### Task 4: Create your VUI in Skill Builder

You'll bring your design to life using the Alexa Skill Builder. This is where you add your intents, utterances, and slots to create an interaction model. You'll use **Dialog Managment** to delegate slot elicitation to Alexa.

##### 4.1 Create a new skill #####
Go to the [Amazon Developer Portal](https://developer.amazon.com) and add a new skill. Then, after filling out the skill information, click the skill builder beta on the interaction model page. For detailed step by step instructions [see steps 1-6 ](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/1-voice-user-interface.md)

##### 4.2 Create intents, utterances, and slots #####
In the skill builder, click the intent ```ADD+``` button and add your intents. 
![Add Intent Button](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-8-intents-button._TTH_.png)

Then, for each intent, add your sample utterances and slots. For example, “I like {size} dogs” and “I want a {size} {temperament} dog” where ```{size}``` and ```{temperament}``` are slots. 

For each slot, assign or create a slot type. For detailed step by step instructions [see steps 7.2-7.10 ](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/1-voice-user-interface.md)

#### Task 5: Activate Dialog Management

Once you've created your slots determine which ones are required and in the **skill builder** mark them required. Doing so will activate dialog management. You will need to provide prompts and sample utterances for the slot. For example the **{size}** slot's prompts and utterances are:

![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/petmatch/p1-dm-prompts._TTH_.png)

![](https://raw.githubusercontent.com/gsandoval/skill-sample-nodejs-petmatch/master/instructions/assets/utterances.png)

You may have noticed that for the **size** slot we are providing sample utterances that include our other slots for example **temperament**. This allows the user the freedom to provide more than one slot value at a time.

For detailed instructions on how to activate dialog mangement take a look at [Task 5.1 through 5.2](https://github.com/alexa/skill-sample-nodejs-petmatch/blob/master/instructions/1-build-and-customize.md#task-5-activate-dialog-management)

##### 5.1 Build Your Model

Once you've provided prompts and utterances for each required slot, click on the **Save Model** button, and then click on the **Build Model** button.

  ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-12-skill-builder-build-save-model._TTH_.png)

#### Task 6: Create your lambda function

Now that you have your VUI design sketched out and implemented in the skill builder, it's time to create the web service backend where all the logic will happen.

##### 6.1 Create your AWS Lambda Function #####
Create an alexa skill [AWS Lambda](https://aws.amazon.com/lambda/) function using the blueprint for "alexa-skill-kit-sdk-factskill". We'll replace all the code for that skill but it's a fast way to get up and running. In case you need, here's a [step by step guide](https://github.com/alexa/skill-sample-nodejs-fact/blob/en-US/instructions/2-lambda-function.md) for building a skill using that blueprint.

##### 6.2 Generate your Lambda function code

We have a provided you with a tool that will generate the code stub for you based on your interaction model. 

From the skill builder, click ```code editor``` and copy your interaction model. Then paste that into the [skill code generator](http://alexa.design/skillcode) and click ```Generate```. This will produce code for your Lambda function. Copy this code (from the Lambda Template box) and paste it over the fact skill code you created in step 5.1. To do this, go to [your lambda function](https://aws.amazon.com/lambda/) and click the lambda function icon. Select all the code and delete it. Then paste in the code for your new skill (from the Lambda Template box) and click save. As a final step, copy the ARN value from the top right corner of the screen. You will need this value in the next section of this guide.

<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/2-12-copy-ARN._TTH_.png" />

##### 6.3 Link VUI to Backend

Go to your skill on developer.amazon.com and click on the configuration tab (you may already be there). Choose AWS, North America, and paste your ARN and you're ready to test. For detailed steps see the [step by step guide](https://github.com/alexa/skill-sample-nodejs-fact/blob/en-US/instructions/3-connect-vui-to-code.md). 

##### 6.4 Test your skill

You have several options to test your skill with. You can testing using the built in Testing Simulator. You want to click on the **Go to test simulator beta** button.

You can also use [echosim.io](http://echosim.io) to test your skill.

#### Task 7: Make it yours.

When you created your interaction model with [skillinator](http://alexa.design/skillcode), it created a code stub for you. While this gives you a head start, there's a few things you'll need to change in the code to make it yours. 

##### 7.1 Update your welcome prompt

Go to `LaunchRequest` and find the `this.response.speak();` and change the string so it greets the user.

##### 7.2 Update the stub data structure

[Skillinator](http://alexa.design/skillcode) automatically added two objects to your code, **slotsToOptionsMap** and **options**. The **slotsToOptionsMap** maps the data given slot values to the recommendation which is contained in the **options** object. The snippet below contains the objects for "Job Finder". Job Finder recommends a job to the user. The slots are **salaryImportance**, **personality**, **affectionTarget** and **bloodTolerance**. The skillinator looped through all of the slots and built out a list that contains all the unique combinations of the slots and their values and maps it to an index.

**somewhat-important-extrovert-animals-low** is mapped to 8.  If you were to pass 8 to **options**, it will return **{"name": "name\_8", "description": "description\_8"}**. If we were to change **"name\_8"** to **Zoo Keeper** the skill would recommend that user be a zoo keeper.

**Note:** You're more than welcome to shrink the number of items in options and have a look up key map to more than one item.

	const slotsToOptionsMap = { 
		"large-watch-low": 0,
		"large-watch-medium": 1,
		"large-watch-high": 2,
		"large-guard-low": 3,
		"large-guard-medium": 4,
		"large-guard-high": 5,
		"large-family-low": 6,
		"large-family-medium": 7,
		"large-family-high": 8,
		"medium-watch-low": 9,
		"medium-watch-medium": 10,
		"medium-watch-high": 11,
		"medium-guard-low": 12,
		"medium-guard-medium": 13,
		"medium-guard-high": 14,
		"medium-family-low": 15,
		"medium-family-medium": 16,
		"medium-family-high": 17,
		"small-watch-low": 18,
		"small-watch-medium": 19,
		"small-watch-high": 20,
		"small-guard-low": 21,
		"small-guard-medium": 22,
		"small-guard-high": 23,
		"small-family-low": 24,
		"small-family-medium": 25,
		"small-family-high": 26,
		"tiny-watch-low": 27,
		"tiny-watch-medium": 28,
		"tiny-watch-high": 29,
		"tiny-guard-low": 30,
		"tiny-guard-medium": 31,
		"tiny-guard-high": 32,
		"tiny-family-low": 33,
		"tiny-family-medium": 34,
		"tiny-family-high": 35
	};

    const options = [ 
        {"name": "name_0", "description": "description_0"},
        {"name": "name_1", "description": "description_1"},
        {"name": "name_2", "description": "description_2"},
        {"name": "name_3", "description": "description_3"},
        {"name": "name_4", "description": "description_4"},
        {"name": "name_5", "description": "description_5"},
        {"name": "name_6", "description": "description_6"},
        {"name": "name_7", "description": "description_7"},
        {"name": "name_8", "description": "description_8"},
        {"name": "name_9", "description": "description_9"},
        {"name": "name_10", "description": "description_10"},
        {"name": "name_11", "description": "description_11"},
        {"name": "name_12", "description": "description_12"},
        {"name": "name_13", "description": "description_13"},
        {"name": "name_14", "description": "description_14"},
        {"name": "name_15", "description": "description_15"},
        {"name": "name_16", "description": "description_16"},
        {"name": "name_17", "description": "description_17"},
        {"name": "name_18", "description": "description_18"},
        {"name": "name_19", "description": "description_19"},
        {"name": "name_20", "description": "description_20"},
        {"name": "name_21", "description": "description_21"},
        {"name": "name_22", "description": "description_22"},
        {"name": "name_23", "description": "description_23"}
    ] 