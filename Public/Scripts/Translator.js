// -----JS CODE-----
//@input Component.ScriptComponent dictionaryScript

dict = script.dictionaryScript.api.dict;

script.api.translate = function(word) {
    for (var i = 0; i < dict.length; i++) {
        if (word == dict[i]["English (en)"]) {
            return dict[i];
        } else {
            continue;
        }
    }
}

script.api.getRandomEntry = function() {
    var i = Math.floor( Math.random() * (dict.length) );
    return dict[i]; 
}