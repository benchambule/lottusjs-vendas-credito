export {
    exit_option,
    back_to_main_option,
    create_back_option,
    airtimes,
    operators
}

const exit_option = {
    label: "Exit", next: "exit", key: "00"
}

const back_to_main_option = {
    label: "Back to main", next: "main", key: "00"
}

/**
 * 
 * @param {string} message 
 * @returns {object}
 */
function create_back_option(message){
    return {
        label: "Back", next: message, key: "0"
    }
}

const airtimes = ["10", "20"];//["10", "20", "50", "100", "200", "300", "500", "600"];

const operators = ["TMcel", "Vodacom", "Movitel"];
