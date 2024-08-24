import { blueprint, form_processor, Message } from "lottus.js";

export {
    sold_by_operator
}

const sold_by_operator = blueprint();
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
        label: "TMcel", next: "sold_" + airtimes[0], parameters: {"operator": "TMcel"}
    }
    const vodacom = {
        label: "Vodacom", next: "sold_" + airtimes[0], parameters: {"operator": "Vodacom"}
    }
    const movitel = {
        label: "Movitel", next: "sold_" + airtimes[0], parameters: {"operator": "Movitel"}
    }

    res.title = "Recargas vendidas";
    res.addAutoOption(tmcel);
    res.addAutoOption(vodacom);
    res.addAutoOption(movitel);
    res.addOption(back_to_main_option);
    res.addOption(exit_option);

    return res;
}

sold_by_operator.at("sold_by_operator", select_operator, form_processor);
sold_by_operator.at("sold_by_operator_confirm", sold_by_operator_confirm, form_processor);

const airtimes = ["10", "20"];//["10", "20", "50", "100", "200", "300", "500", "600"];

for(let i = 0; i < airtimes.length; i++){
    const actual = "sold_"+airtimes[i];
    const next = i === airtimes.length - 1? "sold_by_operator_confirm": "sold_" + airtimes[i + 1];
    
    sold_by_operator.at(actual, generate_query(actual, airtimes[i], next), form_processor)
}

async function sold_by_operator_confirm(req, res){
    const confirm = {
        label: "Confirmar", next: "sold_by_operator_post"
    }

    res.body = "";
    res.title = "Recargas vendidas";
    res.addAutoOption(confirm);
    res.addOption(back_to_main_option);
    res.addOption(exit_option);

    return res;
}


function generate_query(name, airtime, next){
    async function how_many_x_sold(req, res){
        const input = {
            name: name, 
            description: "Quantas unidades da recarga de " + airtime + " vendeu",
            type: "number",
            next: next,
        };

        res.title = "Recargas vendidas";
        res.body = "Quantas unidades da recarga de " + airtime + " vendeu";
        res.addInput(input);
        res.addOption(back_to_main_option);
        res.addOption(exit_option);
    
        return res;
    }

    return how_many_x_sold;
}

