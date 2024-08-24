import {create_vendas_bot} from "../bot.js";
import { format_message } from "lottus.js";

const bot = create_vendas_bot();

let message = await bot.process({}, null);
console.log(message);

message = await bot.process({prompt: 1}, message);
console.log(message);

message = await bot.process({prompt: "0"}, message);
console.log(message.form);

message = await bot.process({prompt: "00"}, message);
console.log(message);