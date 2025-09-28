const data = require('./data/scenarios.json');
const user_data_handler = require('./user-data-handler.js');


function generate_choice() {

}

function generate_scenario() {
    let page = user_data_handler.get_data('Page'); // Use correct key
    const prompts = data.scenarios[0].prompts;
    const n = Math.floor(Math.random() * prompts.length);

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
        default:
            promptChosen = prompts[0].text;
    }

    user_data_handler.increment_page();
    return promptChosen;
}

function begin() {
    return generate_scenario(); // Return the scenario text
}

module.exports = {
    begin,
    generate_scenario,
    generate_choice
}
