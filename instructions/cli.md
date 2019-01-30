## Setup w/ ASK CLI


### Repository Contents
* `/.ask`	- [ASK CLI (Command Line Interface) Configuration](https://developer.amazon.com/docs/smapi/ask-cli-intro.html)
* `/lambda/custom` - Back-End Logic for the Alexa Skill hosted on [AWS Lambda](https://aws.amazon.com/lambda/)
* `/models` - Voice User Interface and Language Specific Interaction Models
* `/instructions` - Step-by-Step Instructions for Getting Started
* `skill.json`	- [Skill Manifest](https://developer.amazon.com/docs/smapi/skill-manifest.html)


### Pre-requisites

* Node.js (version 8+)
* Register for an [AWS Account](https://aws.amazon.com/)
* Register for an [Amazon Developer Account](https://developer.amazon.com/)
* Install and Setup [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)

> Note: If you would like to setup the ASK CLI using AWS Cloud9 (a cloud-based IDE with pay-as-you-go pricing and is eligible for AWS Free Tier pricing), step-by-step instructions can be found [here](https://alexa.design/cli-on-cloud9).


### Installation
1. Clone the repository.

	```bash
	git clone https://github.com/alexa/skill-sample-nodejs-decision-tree/
	```

2. Install npm dependencies by navigating into the `/lambda/custom` directory and running the npm command: `npm install`

	```bash
	cd lambda/custom
	npm install
	```

### Deployment

ASK CLI will create the skill and the lambda function for you. The Lambda function will be created in ```us-east-1 (Northern Virginia)``` by default.

1. Deploy the skill and the lambda function in one step by running the following command:

	```bash
	ask deploy
	```

### Testing with the CLI Dialog command
1. Simulate a dialog in an interactive text chat with your skill using the following example.
Replace the skill-id value with the appId from your skill.  This is shown when the CLI deploy is complete; and you can find it in the developer console, on the build tab, Endpoints section.

	```bash
    ask dialog  --locale en-US --skill-id amzn1.ask.skill.1c85444...etc..
    start decision tree
	```

### Testing with the CLI Simulate command
1. Simulate a request or intent with your skill through the command line using the following example:

	```bash
	 ask simulate -l en-US -t "start decision tree"

	 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
	◡ Waiting for simulation response{
	  "status": "SUCCESSFUL",
	  ...
	 ```


#### NEXT: Testing in the Console
[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/next._TTH_.png)](./test-using-simulator.md)

