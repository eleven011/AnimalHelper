// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
  
  function getAdvice(agent) {
    const PetType = agent.parameters.PetType;
    const PetCondition = agent.parameters.PetCondition;
    
    // create and set up map of symptoms to recommendations
    // this should be in an external file, but I'm limited here
    // to the index.js for now
	let symptomMap = new Map();
    symptomMap.set('whining', "Dogs whine for lots of reasons. Monitor what your dog is whining about. They're trying to communicate something to you.");
    symptomMap.set('peeing', "Unwanted urination could be behavioral. Your pet could be stressed, but your pet could also have a urinary tract infection.");
    symptomMap.set('depressed', "Similar to humans, animals can become depressed. If this depression is accompanied by other symptoms such as not eating or not wanting to move, this could be a medical problem.");
    symptomMap.set('drooling', "Some drool is normal and needs no attention, however a lot of drool could be a sign of dental or stomach trouble.");
    symptomMap.set('pooping blood', "There are many potential causes for blood in poop and some may be life-threatening.");
    symptomMap.set('shaking', "Unless your pet is shaking with excitement to see you, consider monitoring other symptoms and making a vet appointment.");
    symptomMap.set('coughing', "Like humans, sometimes animals cough to get rid of dust, germs, and whatever else they've breathed in. If coughing isn't accompanied by any other symptoms it may go away on it's own.");
    symptomMap.set('limping', "If the limp seems mild, it may heal on it's own. If the limp seems severe or there are any other symptoms, medical attention is a good idea.");
    symptomMap.set('constipated', "Constipation has many potential causes and usually passes in a few days. Giving canned pumpkin to your pet to increase the fiber in their diet may help.");
    symptomMap.set('throwing up', "Vomiting happens for many reasons. Your pet could have eaten too quickly, eaten some grass, or eaten their own hair. If your pet vomits more than once in a short period of time or has any other symptoms, medical attention is a good idea.");
    symptomMap.set('sneezing', "Sneezing usually goes away on its own and is nothing to worry about. If you notice other symptoms, however, it is a good idea to check in with a veterinarian.");
    symptomMap.set('diarrhea', "Diarrhea is often caused by diet, but could also be a symptom of parasites, a virus, or something else. If the diarrhea doesn't go away in a few days, consult a veterinarian. In the meantime, canned pumpkin can boost the fiber in your pet's diet.");
    symptomMap.set('won\'t eat', "While a pet may not eat for a behavioral reason such as pickiness or a recent change in surroundings, not eating could be a sign of something more serious. Consult a veterinarian to determine the cause.");
    symptomMap.set('bleeding', "Apply direct pressure to the wound with a clean cloth, guaze, or even a sanitary napkin to stop the bleeding. Continue to hold even if blood soaks through. If possible, elevate the wound as well to slow bleeding.");
    symptomMap.set('hurt', "Remove your pet from the dangerous situation. Watch your pet for signs of bleeding or limping. All bite wounds should be assessed by a veterinarian.");
    symptomMap.set('needs shots', "Your local veterinarian can update your pet's vaccinations.");
    
    // using user's PetCondition, retrieve recommendation from symptomMap
    const recommendation = symptomMap.get(PetCondition);
    console.log(recommendation);
    
    // then read recommendation to user
    // just have a prompt at the end
    // Let me know if you'd like to make an appointment or ask about a pet's condition
    // then the make an appointment intent or the get advice intent should trigger
    
    //return agent.add(`I am going to search for advice on your ${PetType} that is ${PetCondition}...`);
    return agent.add(`${recommendation}`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Get Animal Advice Intent', getAdvice);

  agent.handleRequest(intentMap);
});
