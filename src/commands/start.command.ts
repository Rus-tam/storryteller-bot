import { Command } from "./command.class";
import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply(
        "Добро пожаловать в бот рассказчик сказок",
        Markup.keyboard([
          Markup.button.callback("Модерировать сказку", "moderate_story"),
        ]),
      );
    });

    this.bot.action("moderate_story", (ctx) => {});
  }
}
