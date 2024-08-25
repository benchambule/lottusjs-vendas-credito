import { create_bot } from "../bot.js";
import { format_message } from "lottus.js";

const bot = create_bot();

const input = ["", "2", "2", "1", "59", "98", "1"];

let message;
let params;
for(const i of input){
    message = await bot.process({prompt: i, parameters: params}, message);
    params = {...params, ...message.parameters};
    console.log(format_message(message, params));
}