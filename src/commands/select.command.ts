import { Command } from "./command.class";
import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";

export class SelectCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("select", (ctx) => {
      ctx.reply(
        "Выберите для кого рассказать сказку",
        Markup.inlineKeyboard([
          Markup.button.callback("Мальчику", "story_for_boy"),
          Markup.button.callback("Девочке", "story_for_girl"),
          Markup.button.callback("Мальчику и девочке", "story_for_both"),
          Markup.button.callback("Случайно", "random_story"),
        ]),
      );
    });

    this.bot.action("story_for_boy", (ctx) => {});
  }
}
