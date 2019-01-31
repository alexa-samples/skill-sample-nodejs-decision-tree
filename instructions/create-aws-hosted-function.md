# Build An Alexa Decision Tree Skill


## Setting Up A Lambda Function Using Amazon Web Services

In the [first step of this guide](./setup-vui-aws-hosted.md), we built the Voice User Interface (VUI) for our Alexa skill.  On this page, we will be creating an AWS Lambda function using [Amazon Web Services](http://aws.amazon.com).  You can [read more about what a Lambda function is](http://aws.amazon.com/lambda), but for the purposes of this guide, what you need to know is that AWS Lambda is where our code lives.  When a user asks Alexa to use our skill, it is our AWS Lambda function that interprets the appropriate interaction, and provides the conversation back to the user.

1.  **Go to http://aws.amazon.com and sign in to the console.** If you don't already have an account, you will need to create one.  [If you don't have an AWS account, check out this quick walkthrough for setting it up](https://github.com/alexa/alexa-cookbook/tree/master/aws/set-up-aws.md).

    <a href="https://console.aws.amazon.com/console/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-1-sign-in-to-the-console._TTH_.png" /></a>

2.  **Click "Services" at the top of the screen, and type "Lambda" in the search box.**  You can also find Lambda in the list of services.  It is in the "Compute" section.

    <a href="https://console.aws.amazon.com/lambda/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-2-services-lambda._TTH_.png" /></a>

3.  **Check your AWS region.** AWS Lambda only works with the Alexa Skills Kit in two regions: US East (N. Virginia) and EU (Ireland).  Make sure you choose the region closest to your customers.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-3-check-region._TTH_.png"/>

4.  **Click the "Create a Lambda function" button.** It should be near the top of your screen.  (If you don't see this button, it is because you haven't created a Lambda function before.  Click the blue "Get Started" button near the center of your screen.)

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-4-create-a-lambda-function._TTH_.png" />

5.  **There are two boxes labeled "Author from scratch" and "Blueprints". Click the radio button in the box titled "Blueprints" then choose the blueprint named "alexa-skill-kit-sdk-factskill".** We have created a blueprint as a shortcut to getting everything set up for your skill. You can search for a blueprint using the provided search box.  This blueprint adds the alexa-sdk to your Lambda function so that you don't have to upload it yourself.

    <!-- <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/2-5-blueprint._TTH_.png" />  <!--TODO: THIS IMAGE NEEDS TO BE CUSTOMIZED FOR YOUR SKILL TEMPLATE, THIS ONE IS OUT OF DATE. -->

6.  **Configure your function.** This screen is where we will enter the important parts of our Lambda function.  These values will only ever be visible to you, but make sure that you name your function something meaningful.

  <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-7-configure-your-function._TTH_.png" />

7.  **Set up your Lambda function role.**  If you haven't done this before, we have a [detailed walkthrough for setting up your first role for Lambda](https://github.com/alexa/alexa-cookbook/blob/master/guides/aws-security-and-setup/lambda-role.md).  If you have done this before, set your **Existing role** value to "lambda_basic_execution."

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-9-lambda-function-role._TTH_.png" />

8. **Click Create Function in the bottom right corner.**  You will need to scroll down to find **Create Function.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-11-create-function-button._TTH_.png" />


9. **Configure your trigger.** Look at the column on the left called "Add triggers", and select Alexa Skills Kit from the list.  If you don't see Alexa Skills Kit in the list, jump back to step #3 on this page.

    <!-- <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-6-configure-your-trigger._TTH_.png" /> TODO: THIS SCREENSHOT IS OUT OF DATE-->

10. (Optional, but recommended) To **secure this Lambda function** follow the instructions found here: [alexa.design/secure-lambda-function](https://alexa.design/secure-lambda-function)

11. Scroll back up and click Save.

12. Click the box that has the Lambda icon followed by the name of your function and scroll down to the field called "Function code".

13.  **Copy and paste the [provided code](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/lambda/custom/index.js) into the Lambda function code box.**  We have provided the code for this skill on [GitHub](https://github.com/alexa/skill-sample-nodejs-decision-tree/blob/master/lambda/custom/index.js).  Delete the contents of the code box, and paste the contents of the new code.
Click "Save".

14. You should see the Amazon Resource Name (ARN) for this function in the top right corner of the page.  (You may need to scroll back up.) **Copy the ARN value for this Lambda function** by clicking the small copy button; we will use this ARN in the next section of the guide.


## Connecting Your Voice User Interface To Your Lambda Function

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/alexa/console/ask?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=fact-nodejs-V2_GUI-3&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_fact-nodejs-V2_GUI-3_Convert_WW_beginnersdevs&sc_segment=beginnersdevs) and select your skill from the list.** You may still have a browser tab open if you started at the beginning of this tutorial.

2. While on the **Build** tab, select the **Endpoint** tab on the left side navigation panel.

3.  **Select the "AWS Lambda ARN" option for your endpoint.** You have the ability to host your code anywhere that you would like, but for the purposes of simplicity and frugality, we are using AWS Lambda. ([Read more about Hosting Your Own Custom Skill Web Service](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-web-service?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=fact-nodejs-V2_GUI-3&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_fact-nodejs-V2_GUI-3_Convert_WW_beginnersdevs&sc_segment=beginnersdevs).)  With the AWS Free Tier, you get 1,000,000 free requests per month, up to 3.2 million seconds of compute time per month. Learn more at [aws.amazon.com/free](https://aws.amazon.com/free/).  In addition, Amazon now offers [AWS Promotional Credits for developers who have live Alexa skills that incur costs on AWS related to those skills](https://developer.amazon.com/alexa-skills-kit/alexa-aws-credits?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=fact-nodejs-V2_GUI-3&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_fact-nodejs-V2_GUI-3_Convert_WW_beginnersdevs&sc_segment=beginnersdevs).

4.  Paste your Lambda's ARN (Amazon Resource Name) into the textbox provided for **Default Region**.

5. Click the **Save Endpoints** button at the top of the main panel.

6. **Click the "Next" button to continue.**

[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_testing._TTH_.png)](./test-using-simulator.md)

