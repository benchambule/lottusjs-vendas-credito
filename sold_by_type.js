import { blueprint, form_processor, Message } from "lottus.js";

export {
    sold_by_type
}

const sold_by_type = blueprint();
sold_by_type.at("sold_by_type", select_operator, form_processor);
sold_by_type.at("sold_by_type_airtime", select_airtime, form_processor);
sold_by_type.at("sold_by_type_quantity", how_much_sold, form_processor);
sold_by_type.at("sold_by_type_confirm", sold_by_type_confirm, form_processor);

const exit_option = {
    label: "Sair", next: "exit", key: "00"
}

const back_to_main_option = {
    label: "Menu principal", next: "main", key: "0"
}

async function select_operator(req, res){
    const tmcel = {
        label: "TMcel", next: "sold_by_type_airtime", parameters: {"operator": "TMcel"}
    }
    const vodacom = {
        label: "Vodacom", next: "sold_by_type_airtime", parameters: {"operator": "Vodacom"}
    }
    const movitel = {
        label: "Movitel", next: "sold_by_type_airtime", parameters: {"operator": "Movitel"}
    }

    res.title = "Recargas vendidas";
    res.addAutoOption(tmcel);
    res.addAutoOption(vodacom);
    res.addAutoOption(movitel);
    res.addOption(back_to_main_option);
    res.addOption(exit_option);

    return res;
}

const airtimes = ["10", "20", "50", "100", "200", "300", "500", "600"];

async function select_airtime(_, res){
    for(const airtime of airtimes){
        res.addAutoOption({
            label: airtime.toString(), 
            next: "sold_by_type_quantity", 
            parameters: {"airtime": airtime.toString()}
        })
    }

    res.title = "Recargas vendidas";
    res.addOption(back_to_main_option);
    res.addOption(exit_option);

    return res;
}

async function how_much_sold(req, res){
    res.title = "Recargas vendidas";
    res.body = "Quantas unidades da recarga de {{airtime}} da operadora {{operator}} vendeu?";

    res.addInput(
        {name: "sold_airtime_qty", 
        type: "number", 
        next: "sold_by_type_confirm",
        description: "Quantas unidades da recarga de {{airtime}} da operadora {{operator}} vendeu?"
    });

    return res;
}

async function sold_by_type_confirm(req, res){
    const confirm = {
        label: "Confirmar", next: "sold_by_type_post"
    }

    res.body = "";
    res.title = "Recargas vendidas";
    res.addAutoOption(confirm);
    res.addOption(back_to_main_option);
    res.addOption(exit_option);

    return res;
}