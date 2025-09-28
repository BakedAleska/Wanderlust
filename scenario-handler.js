const data = require('./data/scenarios.json');
const user_data_handler = require('./user-data-handler.js');


function generate_choice() {
  console.log("Ran generate choice.");
  let page = user_data_handler.get_data('page');
  const choices = data.scenarios[0].answers;
  const n = Math.floor(Math.random() * choices.length);

  let first_choice;
  let second_choice;

  switch (n) {
        case 0:
            typeSelection = "heroic";
            first_choice = choices[0].text;
            second_choice = choices[1].text;
        break;
        case 1:
            typeSelection = "cautious";
            first_choice = choices[2].text;
            second_choice = choices[3].text;
        break;
        case 2:
            typeSelection = "community";
            first_choice = choices[4].text;
            second_choice = choices[5].text;
        break;
        default:
           first_choice = choices[0].text;
           second_choice = choices[1].text;
    }

  return [first_choice, second_choice];
}

function generate_scenario() {
    let page = user_data_handler.get_data('page');
    const prompts = data.scenarios[0].prompts;
    const n = Math.floor(Math.random() * prompts.length);

    let typeSelection;
    let promptChosen;

    console.log(page)

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
