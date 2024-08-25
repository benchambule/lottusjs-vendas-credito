import { blueprint, form_processor } from "lottus.js";
import { airtimes, operators, back_to_main_option, create_back_option } from "./defaults.js";

export {
    operation_by_operator
}

const operation_by_operator = blueprint();


async function select_operator(req, res){
    const operation = req.parameters.operation;

    if(operation === "sold"){
        res.title = "Sold airtimes";
    }

    if(operation === "received"){
        res.title = "Received airtimes";
    }

    res.body = "Selecione a operadora";

    for(const operator of operators){
        let op = {
            label: operator, next: "operation_" + airtimes[0], parameters: {"operator": operator}
        }
        res.addAutoOption(op);
    }

    res.addOption(back_to_main_option);

    return res;
}

operation_by_operator.at("operation_by_operator", select_operator, form_processor);
operation_by_operator.at("operation_by_operator_confirm", operation_by_operator_confirm, form_processor);
operation_by_operator.at("operation_by_operator_post", operation_by_operator_post, form_processor);

for(let i = 0; i < airtimes.length; i++){
    const actual = "operation_"+airtimes[i];
    const next = i === airtimes.length - 1? "operation_by_operator_confirm": "operation_" + airtimes[i + 1];

    operation_by_operator.at(actual, generate_query(actual, airtimes[i], next), form_processor)
}


async function operation_by_operator_confirm(req, res){
    const confirm = {
        label: "Confirm", next: "operation_by_operator_post"
    }

    const operation = req.parameters.operation;

    if(operation === "sold"){
        res.title = "Sold airtimes | Confirmation";
    }

    if(operation === "received"){
        res.title = "Received airtimes | Confirmation";
    }

    res.body = "";

    res.body += "Operator - {{operator}}\nAirtime - Quantity" + "\n";

    for(const airtime of airtimes){
        const s_airtime = airtime.padStart("Airtime".length);
        const s_quantity = "{{operation_"+airtime+"}}".toString().padEnd("Quantity".length);

        res.body += s_airtime + " - " + s_quantity + "\n";
    }

    res.addAutoOption(confirm);
    res.addOption(create_back_option("reveived_by_operator"));
    res.addOption(back_to_main_option);

    return res;
}


async function operation_by_operator_post(req, res){
    const operation = req.parameters.operation;

    if(operation === "sold"){
        res.title = "Sold airtimes | Success";
    }

    if(operation === "received"){
        res.title = "Received airtimes | Success";
    }

    res.body = "Following details posted successfuly\n";

    res.body += "Operator - {{operator}}\nAirtime - Quantity" + "\n";

    for(const airtime of airtimes){
        const s_airtime = airtime.padStart("Airtime".length);
        const s_quantity = "{{operation_"+airtime+"}}".toString().padEnd("Quantity".length);

        res.body += s_airtime + " - " + s_quantity + "\n";
    }

    res.addOption(back_to_main_option);

    return res;
}


function generate_query(name, airtime, next){
    async function how_many_x_received(req, res){
        const operation = req.parameters.operation;

        if(operation === "sold"){
            res.title = "Sold airtimes";
        }

        if(operation === "received"){
            res.title = "Received airtimes";
        }

        const input = {
            name: name, 
            type: "number",
            next: next,
        };

        res.body = "How many airtimes of " + airtime + (operation === "sold"?" you sold":" you received");
        res.addInput(input);
        res.addOption(create_back_option("reveived_by_operator"));
        res.addOption(back_to_main_option);
    
        return res;
    }

    return how_many_x_received;
}

