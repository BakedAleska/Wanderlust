const scenariosData = require('./data/scenarios.json');

var prompt;

function displayData(){
    console.log(JSON.stringify(scenariosData, null, 2));
}

function initializeScenario(){
    const scenarioTypeList = JSON.stringify(scenariosData.scenarios[0].categories, null, 2)
    const n = Math.floor(Math.random() * 3);
    let typeSelection;
    
    switch (n) {
        case 0:
            typeSelection = "heroic"
            break;
        case 1:
            typeSelection = "cautious"
            break;
        case 2:
            typeSelection = "community"
    }

    switch(typeSelection){
        case "heroic":
            

    }
    console.log(typeSelection)
    
}


module.exports = {
    displayData,
    initializeScenario
}
