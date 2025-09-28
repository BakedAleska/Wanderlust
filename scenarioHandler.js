const scenariosData = require('./data/scenarios.json');

var prompt;

function displayData(){
    console.log(JSON.stringify(scenariosData, null, 2));
}

function initializeScenario(){
    const prompts = scenariosData.scenarios[0].prompts;
    const n = Math.floor(Math.random() * 3);

    let typeSelection;
    let promptChosen;

    switch (n) {
        case 0:
            typeSelection = "heroic";
            promptChosen = prompts[0].text;
            break;
        case 1:
            typeSelection = "cautious";
            promptChosen = prompts[1].text;
            break;
        case 2:
            typeSelection = "community";
            promptChosen = prompts[2].text;
            break;
    }

    console.log(promptChosen);
    return promptChosen;
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
