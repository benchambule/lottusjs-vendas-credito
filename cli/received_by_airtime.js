import { create_bot } from "../bot.js";
import { format_message } from "lottus.js";

const bot = create_bot();

const input = ["hello", "3", "1", "2", "2", "465", "1"];

let message;
let params;

for(const i of input){
    message = await bot.process({prompt: i, parameters: params}, message);
    params = {...params, ...message.parameters};
    console.log(format_message(message, params));
}
