import { blueprint, form_processor, Message } from "lottus.js";

export {
    received_by_type
}

const received_by_type = blueprint();
received_by_type.at("received_by_type", select_operator, form_processor);
received_by_type.at("received_by_type_airtime", select_airtime, form_processor);
received_by_type.at("received_by_type_quantity", how_much_received, form_processor);
received_by_type.at("received_by_type_confirm", received_by_type_confirm, form_processor);

const exit_option = {
    label: "Sair", next: "exit", key: "00"
}

const back_to_main_option = {
    label: "Menu principal", next: "main", key: "0"
}

/**
 * 
 * @param {object} req 
 * @param {Message} res 
 */
async function select_operator(req, res){
    const tmcel = {
        label: "TMcel", next: "received_by_type_airtime", parameters: {"operator": "TMcel"}
    }
    const vodacom = {
        label: "Vodacom", next: "received_by_type_airtime", parameters: {"operator": "Vodacom"}
    }
    const movitel = {
        label: "Movitel", next: "received_by_type_airtime", parameters: {"operator": "Movitel"}
    }

    res.title = "Recargas recebidas";
    res.addAutoOption(tmcel);
    res.addAutoOption(vodacom);
    res.addAutoOption(movitel);
    res.addOption(back_to_main_option);
    res.addOption(exit_option);

    return res;
}

const airtimes = ["10", "20", "50", "100", "200", "300", "500", "600"];

/**
 * 
 * @param {object} req 
 * @param {Message} res 
 */
async function select_airtime(_, res){
    for(const airtime of airtimes){
        res.addAutoOption({
            label: airtime.toString(), 
            next: "received_by_type_quantity", 
            parameters: {"airtime": airtime.toString()}
        })
    }

    res.title = "Recargas recebidas";
    res.addOption(back_to_main_option);
    res.addOption(exit_option);

    return res;
}

async function how_much_received(req, res){
    res.title = "Recargas recebidas";

    res.body = "Quantas unidades da recarga de {{airtime}} da operadora {{operator}} recebeu?";

    res.addInput({name: "received_airtime", type: "number", next: "received_by_type_confirm"});

    return res;
}

async function received_by_type_confirm(req, res){
    const confirm = {
        label: "Confirmar", next: "received_by_type_post"
    }

    res.body = "";
    res.title = "Recargas recebidas";
    res.addAutoOption(confirm);
    res.addOption(back_to_main_option);
    res.addOption(exit_option);

    return res;
}