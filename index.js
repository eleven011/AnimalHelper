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
  
  // use PetType from user to call corresponding function
  // that searches map for PetCondition
  // TODO: switch from local maps to using GCP for storage
  function getAdvice(agent) {
    const PetType = agent.parameters.PetType;
    const PetCondition = agent.parameters.PetCondition;
    var recommendation = "";
    
    switch(PetType) {
      case "cat":
        recommendation = catDog(PetCondition);
        break;
      case "dog":
        recommendation = catDog(PetCondition);
        break;
      case "snake":
        recommendation = snake(PetCondition);
        break;
      case "lizard":
        recommendation = lizard(PetCondition);
        break;
      case "bird":
        recommendation = bird(PetCondition);
        break;
      case "mouse":
        recommendation = mouse(PetCondition);
        break;
      case "rabbit":
        recommendation = rabbit(PetCondition);
        break;
      default:
        break;
    }
	
    if (typeof recommendation == 'undefined') {
      recommendation = "Oops, looks like we had trouble finding advice. Sorry about that.";}
    
    console.log(recommendation);
    return agent.add(`${recommendation}`);
  }
 
  function catDog(PetCondition) {
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
    symptomMap.set('being noisy', "Pets make noises when they're trying to communicate with us. It might be time to investigate!");
  
    var recommendation = symptomMap.get(PetCondition);
    return recommendation;
  }
  
  function snake(PetCondition) {
    let symptomMap = new Map();
    symptomMap.set('won\'t eat', "The most common reason for a snake not to eat is stress. Have you moved recently, changed the enclosure? Have you checked that the temperature, humidity, and privacy inside the enclosure is adequate for your species of snake?");
    symptomMap.set('very active', "Has your snake been fed recently? They might be hungry. This could also be a sign of stress. Check the humidity and temperature in your enclosure.");
    symptomMap.set('shedding badly', "The most common reason for a bad shed is low humidity. Rule this out first by researching what humidity your snake needs and purchasing a hygrometer to measure humidity. To help with an icomplete shed, you can place your snake in a container with warm water around 85 degrees Fahrenheit and some paper towels for friction. Take care to not burn your snake; water that's warm to you could be scalding for a snake.");
    symptomMap.set('wheezing', "Wheezing may be a sign of an upper respiratory infection. This is usually caused by stress and/or improper temperature and humidity. A visit to the vet is strongly recommended. ");
    symptomMap.set('acting defensive', "Believe it or not, snakes get scared of humans. Your snake may be stressed from poor enclosure conditions or may have been handled too much. Make sure you've provided a good enclosure and let your snake rest. Try again a different day.");
    symptomMap.set('a lump', "Unless the swelling is from a recent meal, it's a good idea to have a veterinarian look over your snake.");
    symptomMap.set('burnt', "Immediately run cold water to the injury for 15 minutes. Do not use ice. Clean the wound with antibacterial soap to help prevent infection. Consult your veterinarian for further instructions.");
    symptomMap.set('constipated', "Constipation in snakes is different than in humans. With snakes, you must make sure that the temperature and humidity is in a good range for your pet. Additionally, fresh water for your snake should always be available.   \nYou can try giving your snake a warm bath for a few minutes in warm water (85 degrees F) and see if that helps. If not, talking to a veterinarian is always a good idea.");
    symptomMap.set('dehydrated', "Snakes that don't have access to clean water and proper humidity can become dehydrated. You can help your snake by creating a warm electrolyte bath. Sports drinks like Gatorade have useful electrolytes in addition to the water your snake needs. Try a few short baths with a 75% sports drink to 25% water ratio at 85 degrees F. \nIf you don't feel comfortable doing this, contact your vet immediately.");
    
    var recommendation = symptomMap.get(PetCondition);
    return recommendation;
  }
  
  function lizard(PetCondition) {
    let symptomMap = new Map();
    symptomMap.set('won\'t eat', "The most common reason for a lizard not to eat is stress. Have you moved recently, changed the enclosure? Have you checked that the temperature, humidity, and privacy inside the enclosure is adequate for your species of lizard? A dehydrated lizard, for example, won't eat.");
    symptomMap.set('hiding', "Your lizard could be hiding from the heat, to feel safe, or they may feel stressed. Hiding may be normal for your species of lizard. If you think something is wrong with your pet, such as an illness, take them to the vet.");
    symptomMap.set('changing colors', "Usually if your lizard is turning a different color, it's a sign of stress. Is your lizard fighting for territory? Are you handling too often? What are your enclosure conditions? Try to investigate on your own, but if your lizard's color doesn't go back to normal after a few days, it's time to talk to a vet.");
    symptomMap.set('acting defensive', "It is natural for small screatures like lizards to be afraid of humans. Your lizard may be stressed from poor enclosure conditions or may have been handled too much. Make sure you've provided a good enclosure and let your lizard rest. Try again a different day, or, consider that some lizards simply don't like being handled.");
    symptomMap.set('constipated', "If your lizard seems constipated, first make sure that their basking area is warm enough for digestion and that they are receiving a balanced diet. You can try offering natural laxatives such as pureed pumpkin or prunes, but you should check with your vet first.");
    symptomMap.set('burnt', "Immediately run cold water to the injury for 15 minutes. Do not use ice. Clean the wound with antibacterial soap to help prevent infection. Consult your veterinarian for further instructions.");
    symptomMap.set('weak', "If your lizard seems weak, it's best to get them to a veterinarian for further diagnosis.");
    symptomMap.set('shedding badly', "The most common reason for a bad shed is low humidity. Rule this out first by researching what humidity your lizard needs and purchasing a hygrometer to measure humidity. To help with an icomplete shed, you can place your lizard in a container with warm water around 85 degrees Fahrenheit and some paper towels for friction. Take care to not burn your lizard; water that's warm to you could be scalding for a lizard.");
    //symptomMap.set('', "");
    
    var recommendation = symptomMap.get(PetCondition);
    return recommendation;
  }
  
  function bird(PetCondition) {
    let symptomMap = new Map();
    symptomMap.set('won\'t eat', "Not eating can be a sign of stress or illness. If you've moved recently, your pet may need time to adjust. It's always a good idea to talk to your vet about the correct diet for your bird.");
    symptomMap.set('being noisy', "Birds make noise. If you're trying to redirect your bird's noises or discourage excessive noise, you need to figure out what behavior to praise and what behavior to ignore. Yelling at your bird or giving it treats to be quiet only reinforces the noisiness. ");
    symptomMap.set('swollen feet', "Birds can get swollen feet from sitting on perfectly smooth, round perches. These perches aren't natural and a more suitable perch should be acquired immediately. To treat bumblefoot, talk to your veterinarian. ");
    //symptomMap.set('', "");
    
    var recommendation = symptomMap.get(PetCondition);
    return recommendation;
  }
  
  function mouse(PetCondition) {
    let symptomMap = new Map();
    symptomMap.set('', "");
    
    var recommendation = symptomMap.get(PetCondition);
    return recommendation;
  }
  
  function rabbit(PetCondition) {
    let symptomMap = new Map();
    symptomMap.set('', "");
    
    var recommendation = symptomMap.get(PetCondition);
    return recommendation;
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
