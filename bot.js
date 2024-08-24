import { lottus, options_processor } from "lottus.js";
import { received_by_operator } from "./received_by_operator.js";

export {
    create_vendas_bot
}

const exit_option = {
    label: "Sair", next: "exit", key: "00"
}

const back_to_main_option = {
    label: "Menu principal", next: "main", key: "0"
}

function main_message(_, res){
    const stock_option = {label: "Ver stock", next:"stocks"};
    const report_sold = {
        label: "Reportar recarga(s) vendida(s)", next: "report_sold_airtimes"
    };
    const report_received = {
        label: "Reportar recarga(s) recebida(s)", next: "report_received_airtimes"
    };
    const report_deposits = {
        label: "Reportar depósito(s)", next: "report_deposits"
    }
    
    res.title = "Venda de créditos";

    res.addAutoOption(stock_option);
    res.addAutoOption(report_sold);
    res.addAutoOption(report_received);
    res.addAutoOption(report_deposits);
    res.addOption(exit_option);

    return res;
}


function stocks_message(_, res){
    res.addOption(exit_option);
    res.addOption(back_to_main_option);

    return res;
}


function exit(_, res){
    res.body = "Adeus";
    res.close = true;

    return res;
}


function report_sold_airtimes_message(_, res){
    res.title = "Reporte de recargas vendidas";
    res.body = "Selecione uma das opções";

    const report_by_recharge = {
        label: "Reportar por tipo de recarga", next: "sold_airtimes_by_type"
    }
    const report_by_operator = {
        label: "Reportar por operadora", next: "sold_airtimes_by_operator"
    }
    
    res.addAutoOption(report_by_recharge);
    res.addAutoOption(report_by_operator);
    res.addOption(back_to_main_option);
    res.addOption(exit_option);

    return res;
}


function report_received_airtimes_message(req, res){
    res.title = "Reporte de recargas recebidas";
    res.body = "Selecione uma das opções";

    const report_by_recharge = {
        label: "Reportar por tipo de recarga", next: "received_by_recharge"
    }
    const report_by_operator = {
        label: "Reportar por operadora", next: "received_by_operator"
    }

    res.addAutoOption(report_by_recharge);
    res.addAutoOption(report_by_operator);
    res.addOption(back_to_main_option);
    res.addOption(exit_option);

    return res;
}


function create_vendas_bot(){
    const bot = lottus();

    bot.at("main", main_message, options_processor);
    bot.at("stocks", stocks_message, options_processor);
    bot.at("report_sold_airtimes", report_sold_airtimes_message, options_processor);
    bot.at("report_received_airtimes", report_received_airtimes_message, options_processor);
    bot.get("exit", exit);
    
    bot.add_blueprint(received_by_operator);

    return bot;
}
