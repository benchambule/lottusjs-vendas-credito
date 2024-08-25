import { lottus, form_processor } from "lottus.js";
import { operation_by_operator } from "./operation_by_operator.js";
import { operation_by_airtime } from "./operation_by_airtime.js";
import { exit_option, create_back_option, airtimes, operators } from "./defaults.js";


export {
    create_bot
}


function main_message(_, res){
    const stock_option = {label: "Ver stock", next:"stocks"};
    const report_sold = {
        label: "Report sold airtimes", next: "sold_airtimes"
    };
    const report_received = {
        label: "Report received airtimes", next: "received_airtimes"
    };
    
    res.title = "Airtimes reports";

    res.addAutoOption(stock_option);
    res.addAutoOption(report_sold);
    res.addAutoOption(report_received);
    res.addOption(exit_option);

    return res;
}


function stocks_message(_, res){
    res.addOption(create_back_option("main"));

    res.body = "";
    for(const operator of operators){
        res.body += operator + "\n" + "Airtime - Quantity" + "\n";

        for(const airtime of airtimes){
            const s_airtime = airtime.padStart("Airtime".length);
            const s_quantity = Math.floor(Math.random() * (9999 - 0 + 1) + 0).toString().padEnd("Quantity".length);

            res.body += s_airtime + " - " + s_quantity + "\n";
        }
        res.body += "\n";
    }

    return res;
}


function exit(_, res){
    res.body = "Bye";
    res.close = true;

    return res;
}


function report_sold_airtimes_message(_, res){
    res.title = "Sold airtimes";
    res.body = "Select one of the operations";

    const report_by_recharge = {
        label: "Report by airtime", next: "operation_by_airtime", parameters: {operation: "sold"}
    }
    const report_by_operator = {
        label: "Report by operator", next: "operation_by_operator", parameters: {operation: "sold"}
    }
    
    res.addAutoOption(report_by_recharge);
    res.addAutoOption(report_by_operator);
    res.addOption(create_back_option("main"));

    return res;
}


function report_received_airtimes_message(req, res){
    res.title = "Received airtimes";
    res.body = "Select one of the operations";

    const report_by_recharge = {
        label: "Report by airtime", 
        next: "operation_by_airtime", 
        parameters: {operation: "received"}
    }
    const report_by_operator = {
        label: "Report by operator", 
        next: "operation_by_operator", 
        parameters: {operation: "received"}
    }

    res.addAutoOption(report_by_recharge);
    res.addAutoOption(report_by_operator);
    res.addOption(create_back_option("main"));

    return res;
}


function create_bot(){
    const bot = lottus();

    bot.at("main", main_message, form_processor);
    bot.at("stocks", stocks_message, form_processor);
    bot.at("sold_airtimes", report_sold_airtimes_message, form_processor);
    bot.at("received_airtimes", report_received_airtimes_message, form_processor);
    bot.get("exit", exit);

    bot.add_blueprint(operation_by_airtime);
    bot.add_blueprint(operation_by_operator);

    return bot;
}
