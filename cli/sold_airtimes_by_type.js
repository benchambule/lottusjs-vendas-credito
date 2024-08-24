import {create_vendas_bot} from "../bot.js";
import { format_message } from "lottus.js";

const bot = create_vendas_bot();

let message = await bot.process({}, null);
console.log(format_message(message));