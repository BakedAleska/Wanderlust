const scenariosData = require('./data/scenarios.json');

var prompt;

function displayData(){
    console.log(JSON.stringify(scenariosData, null, 2));
}

function initializeScenario(){
    const scenarioTypeList = JSON.stringify(scenariosData.scenarios[0].categories, null, 2)
    const n = Math.floor(Math.random() * 3);

    let typeSelection;
    let prompt = JSON.stringify(scenariosData.scenarios[0].prompts, null, 2);
    
    switch (n) {
        case 0:
            typeSelection = "heroic"
            promptChosen = prompt[0].text;
            break;
        case 1:
            typeSelection = "cautious"
            promptChosen = prompt[1].text;
            break;
        case 2:
            typeSelection = "community"
            promptChosen = prompt[2].text;
            break;
    }

    console.log(typeSelection)    
    return promptChosen
}
function renderScenario(selector = '.scenario-paragraph'){
    const paragraph = document.querySelector('.scenario-paragraph');

    paragraph.textContent = promptChosen;
}
module.exports = {
    displayData,
    initializeScenario,
    renderScenario
}
