import { Command } from "./command.class";
import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";

export class AddCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("add", (ctx) => {
      ctx.reply("Отправьте мне свой вариант сказки ответным сообщением");
    });

    this.bot.on("text", (ctx) => {
      const story = ctx.message.text;
      console.log(story);
    });
  }
}
