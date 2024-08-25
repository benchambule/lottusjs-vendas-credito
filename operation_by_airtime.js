import { blueprint, form_processor } from "lottus.js";
import { airtimes, operators, back_to_main_option, create_back_option } from "./defaults.js";

export {
    operation_by_airtime
}

const operation_by_airtime = blueprint();
operation_by_airtime.at("operation_by_airtime", select_operator, form_processor);
operation_by_airtime.at("operation_by_airtime_airtime", select_airtime, form_processor);
operation_by_airtime.at("operation_by_airtime_quantity", how_much_received, form_processor);
operation_by_airtime.at("operation_by_airtime_confirm", operation_by_airtime_confirm, form_processor);
operation_by_airtime.at("operation_by_airtime_post", operation_by_airtime_post, form_processor);


async function select_operator(req, res){
    const operation = req.parameters.operation;

    if(operation === "sold"){
        res.title = "Sold airtimes";
    }

    if(operation === "received"){
        res.title = "Received airtimes";
    }

    res.body = "Select the operator";
    
    for(const operator of operators){
        let op = {
            label: operator, next: "operation_by_airtime_airtime", parameters: {"operator": operator}
        }
        res.addAutoOption(op);
    }
    res.addOption(back_to_main_option);

    return res;
}


async function select_airtime(req, res){
    const operation = req.parameters.operation;

    if(operation === "sold"){
        res.title = "Sold airtimes";
    }

    if(operation === "received"){
        res.title = "Received airtimes";
    }

    res.body = "Select the airtime";

    for(const airtime of airtimes){
        res.addAutoOption({
            label: airtime.toString(), 
            next: "operation_by_airtime_quantity", 
            parameters: {"airtime": airtime.toString()}
        })
    }

    res.addOption(create_back_option("operation_by_airtime"));
    res.addOption(back_to_main_option);

    return res;
}


async function how_much_received(req, res){
    const operation = req.parameters.operation;

    if(operation === "sold"){
        res.title = "Sold airtimes";
        res.body = "How many units of the airtime {{airtime}} of {{operator}} you sold?";
    }

    if(operation === "received"){
        res.title = "Received airtimes";
        res.body = "How many units of the airtime {{airtime}} of {{operator}} you received?";
    }

    res.addOption(create_back_option("operation_by_airtime"));

    res.addInput({name: "quantity", type: "number", next: "operation_by_airtime_confirm"});

    return res;
}


async function operation_by_airtime_confirm(req, res){
    const operation = req.parameters.operation;

    if(operation === "sold"){
        res.title = "Sold airtimes | Confirmation";
        res.body = "You sold {{quantity}} of {{airtime}} of {{operator}}";
    }

    if(operation === "received"){
        res.title = "Received airtimes | Confirmation";
        res.body = "You received {{quantity}} of {{airtime}} of {{operator}}";
    }

    const confirm = {
        label: "Confirm", next: "operation_by_airtime_post"
    }

    res.addAutoOption(confirm);
    res.addOption(create_back_option("operation_by_airtime"));
    res.addOption(back_to_main_option);

    return res;
}


async function operation_by_airtime_post(req, res){
    const operation = req.parameters.operation;

    if(operation === "sold"){
        res.title = "Sold airtimes | Success";
    }

    if(operation === "received"){
        res.title = "Received airtimes | Success";
    }

    res.body = "{{quantity}} of {{airtime}} of {{operator}} posted successfully";

    res.addOption(back_to_main_option);

    return res;
}