// -----JS CODE-----
//@input Asset.ScanModule scanModule
//@input string language {"widget":"combobox", "values":[{"label":"Swedish", "value": "Swedish (sv)"}, {"label":"French", "value": "French (fr)"}, {"label":"Korean", "value": "Korean (ko)"}]}
//@input Component.ScriptComponent translator;
//@input Component.Text scoreLabel
//@input Component.Text scanLine1
//@input Component.Text scanLine2
//@input SceneObject choicePanel
//@input Component.Text choice1
//@input Component.Text choice2
//@input Component.Text choice3
//@input SceneObject feedbackPanel
//@input Component.Text feedbackLabel
//@input SceneObject yesEmote
//@input SceneObject loveEmote
//@input SceneObject noEmote
//@input SceneObject neutralEmote
//@input SceneObject svFlag
//@input SceneObject frFlag
//@input SceneObject koFlag
// @input Component.AudioComponent successAudio
// @input Component.AudioComponent denialAudio
// @input Component.AudioComponent buttonPressAudio
// @input Component.AudioComponent objectFoundAudio
// @input Component.AudioComponent scanAudio

// initialize
var lang = script.language;
var dailyRewards = false;
var tapSFX = true;   
global.qMode = false;
script.choicePanel.enabled = false;
script.feedbackLabel.text = "";
script.yesEmote.enabled = false; 
script.loveEmote.enabled = false;
script.noEmote.enabled = false;
script.neutralEmote.enabled = false;
script.svFlag.enabled = false; 
script.frFlag.enabled = false; 
script.koFlag.enabled = false; 


// load persistent storage
var saveData = global.persistentStorageSystem.store; 
var date = global.localizationSystem.getDayOfWeek(new Date());
score = saveData.getFloat("score") || 0;
script.scoreLabel.text = "Score: " + score.toString(); 

lastLogin = saveData.getString("last_reset_date") || date;
dailyDict = saveData.getStringArray("today_dict") || [];
histTimeDict = saveData.getStringArray("historic_dict") || [];

if (lastLogin !== date) { resetDailies(); }
function resetDailies() {
    dailyRewards = true;
    saveData.putStringArray("today_dict", []);
    saveData.putString("last_reset_date", date);
}
 
if (lang == "Swedish (sv)") { script.svFlag.enabled = true; };
if (lang == "French (fr)") { script.frFlag.enabled = true; };
if (lang == "Korean (ko)") { script.koFlag.enabled = true; };

// main logic
script.createEvent("TapEvent").bind(function() {
    if (global.qMode == false) {
        script.scanModule.scan([ScanModule.Contexts.Objects], onScanComplete, onScanFailure);
    } else {
        if (tapSFX) {
            var audioDelayEvent = script.createEvent("DelayedCallbackEvent");
            audioDelayEvent.bind(function(eventData) { script.scanAudio.play(1); });
            audioDelayEvent.reset(0.62);
        }
    }
})

function onScanComplete(returnedJSON)
{
   var jsonObj = JSON.parse(returnedJSON); 
   var annotations = jsonObj["annotations"][ScanModule.Contexts.Objects]["annotations"]; 
   if (typeof(annotations) === 'undefined') { 
      script.scanLine1.text = "Find an object. Then tap.";
      script.scanLine2.text = "";
      return;
   }
    if(annotations.length > 0)
   {
       for (var i = 0; i < annotations.length; i++){
            //print(annotations[i].name);
            //print(annotations[i].confidence);
       }
   }
    
    var scannedObj = annotations[0].name; 
    
    if (lang == "English (en)") { script.scanLine1.text = "What is... ?" };
    if (lang == "Swedish (sv)") { script.scanLine1.text = "Detta är... ?" };
    if (lang == "French (fr)") { script.scanLine1.text = "C'ests... ?"};
    if (lang == "Korean (ko)") { script.scanLine1.text = "이것은... ?" };
    
    script.scanLine2.text = scannedObj;
    
    var audioDelayEvent = script.createEvent("DelayedCallbackEvent");
    audioDelayEvent.bind(function(eventData) { script.objectFoundAudio.play(1); });
    audioDelayEvent.reset(0.25);
    tapSFX = false;  
    
    var c1 = script.translator.api.translate(scannedObj)[lang];
    var c2 = script.translator.api.getRandomEntry()[lang]; 
    var c3 = script.translator.api.getRandomEntry()[lang]; 
    setMultipleChoice(c1, c2, c3);
    global.ans = c1;
    global.qMode = true;
    script.choicePanel.enabled = true; 
}

function onScanFailure(failedReason){
    print("Scan Failed For: " + failedReason);
    if(failedReason.includes("declined permission")){
        setScanResultScreen(false);
        script.scanLine1.text = "Scan Failed";
        script.scanLine2.text = "You must approve permissions.";
    } else {
        script.scanLine1.text = "Find an object. Then tap.";
        script.scanLine2.text = "";
    }
    script.choicePanel.enabled = false; 
}

function setMultipleChoice(c1, c2, c3) {
    choices = [c1, c2, c3]; 
    shuffleArray(choices);
    
    script.choice1.text = choices[0]; 
    script.choice2.text = choices[1]; 
    script.choice3.text = choices[2]; 
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function processAnswer(wasCorrect) {
    if (lang == "English (en)") { script.scanLine1.text = "It is... " };
    if (lang == "Swedish (sv)") { script.scanLine1.text = "Detta är... " };
    if (lang == "French (fr)") { script.scanLine1.text = "C'est... " };
    if (lang == "Korean (ko)") { script.scanLine1.text = "그것이... " };
   
    // set colors        
    const redColor = new vec4(0.5,0.2,0.2,1);
    const greenColor = new vec4(0.3,0.7,0.3,1);
    const blueColor = new vec4(0.4156, 0.5529, 1, 1);

    var btnScript1 = script.choice1.getSceneObject().getParent().getParent().getComponent("ScriptComponent")
    var btnScript2 = script.choice2.getSceneObject().getParent().getParent().getComponent("ScriptComponent")
    var btnScript3 = script.choice3.getSceneObject().getParent().getParent().getComponent("ScriptComponent")
    
    // change button colors (the janky way since there is no real api lol, haveto disable/enable again to show new set colors)
    btnScript1.api.disableInteractable();
    btnScript2.api.disableInteractable();
    btnScript3.api.disableInteractable();
    
    script.choice1.getSceneObject().getParent().getParent().getComponent("ScriptComponent").api.setColor(redColor);
    script.choice2.getSceneObject().getParent().getParent().getComponent("ScriptComponent").api.setColor(redColor);
    script.choice3.getSceneObject().getParent().getParent().getComponent("ScriptComponent").api.setColor(redColor);
    
    if (script.choice1.text === global.ans) { script.choice1.getSceneObject().getParent().getParent().getComponent("ScriptComponent").api.setColor(greenColor); }
    if (script.choice2.text === global.ans) { script.choice2.getSceneObject().getParent().getParent().getComponent("ScriptComponent").api.setColor(greenColor); }
    if (script.choice3.text === global.ans) { script.choice3.getSceneObject().getParent().getParent().getComponent("ScriptComponent").api.setColor(greenColor); }

    btnScript1.api.enableInteractable();
    btnScript2.api.enableInteractable();
    btnScript3.api.enableInteractable();
    
    // show answer
    var showAnswerEvent = script.createEvent("DelayedCallbackEvent");
    showAnswerEvent.bind(function(eventData) {
        if (wasCorrect) {
            script.scanLine2.outlineSettings.fill.color = greenColor;
        } else {
            script.scanLine2.outlineSettings.fill.color = redColor;
        }
        
        script.scanLine2.text = global.ans + "!"; 
        script.choice1.getSceneObject().getParent().getParent().getComponent("ScriptComponent").api.setColor(blueColor);
        script.choice2.getSceneObject().getParent().getParent().getComponent("ScriptComponent").api.setColor(blueColor);
        script.choice3.getSceneObject().getParent().getParent().getComponent("ScriptComponent").api.setColor(blueColor);
    });
    
    // reset state for next scan
    var resetEvent = script.createEvent("DelayedCallbackEvent");
    resetEvent.bind(function(eventData) {
        global.qMode = false; 
        btnScript1.api.disableInteractable();
        btnScript2.api.disableInteractable();
        btnScript3.api.disableInteractable();
        btnScript1.api.enableInteractable();
        btnScript2.api.enableInteractable();
        btnScript3.api.enableInteractable();
        
        script.scanLine1.text = "Find an object. Then tap.";
        script.scanLine2.outlineSettings.fill.color = blueColor;
        script.scanLine2.text = "";
        script.feedbackLabel.text = "";
        script.choicePanel.enabled = false;
        script.yesEmote.enabled = false; 
        script.loveEmote.enabled = false;
        script.noEmote.enabled = false;
        script.neutralEmote.enabled = false;
        tapSFX = true;
    });
    
    // cue events
    showAnswerEvent.reset(1.2);
    resetEvent.reset(3);
    script.scanLine2.text = "";
    if (wasCorrect) { 
        updateProfile(global.ans); 
        script.successAudio.play(1);
    } else { 
        script.noEmote.enabled = true; 
        script.feedbackLabel.text = "Incorrect, hm...";
        script.denialAudio.play(1);
    }
    return wasCorrect;
}

function updateProfile(word) {
    // check if word already exists in dicts
    dailyDict = saveData.getStringArray("today_dict");
    histTimeDict = saveData.getStringArray("historic_dict");
    
    // checking if word has ever been logged
    if (histTimeDict.indexOf(word) > -1) {
        // has been logged
        if (dailyDict.indexOf(word) > -1) {
            // no points if already logged today
            script.neutralEmote.enabled = true;
            script.feedbackLabel.text = "Already scanned, but good reinforcement!"
        } else {
            // logged, but +2 points for first time today
            score = score + 2;
            saveData.putFloat("score", score);
            script.scoreLabel.text = "Score: " + score.toString(); 
            script.feedbackLabel.text = "Nice memory! \n(+2 Score)"
            script.yesEmote.enabled = true;
        }
    } else {
        // brand new log!
        score = score + 10;
        saveData.putFloat("score", score);   
        script.scoreLabel.text = "Score: " + score.toString(); 
        script.feedbackLabel.text = "New word learned! \n(+10 Score)"
        script.loveEmote.enabled = true;
    }   
   
    
    dailyDict.push(word);   
    histTimeDict.push(word);
    saveData.putStringArray("today_dict", dailyDict);
    saveData.putStringArray("historic_dict", histTimeDict);
    
    dailyDict = saveData.getStringArray("today_dict");
    histTimeDict = saveData.getStringArray("historic_dict");
}

// script api for button press callbacks
script.api.checkAnswer1 = function(){
    var wasCorrect = (global.ans === script.choice1.text);
    processAnswer(wasCorrect);
}

script.api.checkAnswer2 = function(){
    var wasCorrect = (global.ans === script.choice2.text);
    processAnswer(wasCorrect);
}

script.api.checkAnswer3 = function(){
    var wasCorrect = (global.ans === script.choice3.text);
    processAnswer(wasCorrect);
}

script.api.swapLang = function(){ 
    print("change lang");
    
    // change flag
    script.svFlag.enabled = false; 
    script.frFlag.enabled = false; 
    script.koFlag.enabled = false;
    
    if (lang == "Swedish (sv)") { 
        lang = "French (fr)";
        script.frFlag.enabled = true; 
    } else if (lang == "French (fr)") { 
        lang = "Korean (ko)";
        script.koFlag.enabled = true; 
    } else if (lang == "Korean (ko)") { 
        lang = "Swedish (sv)";
        script.svFlag.enabled = true; 
    };    
    
    // if qmode was on, then finish up with feedback
    //var wasCorrect = (global.ans === script.choice3.text);
    //processAnswer(wasCorrect);
}
