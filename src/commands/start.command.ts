import { Command } from "./command.class";
import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { RequestClass } from "../requests/request.class";

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
          Markup.button.callback("Добавить админа", "add_admin"),
        ]),
      );
    });

    this.bot.action("moderate_story", async (ctx): Promise<void> => {
      const story = await RequestClass.unmoderatedStories();

      if (!story) {
        ctx.reply("Все сказки прошли модерацию");
      }

      if (story?.story) {
        ctx.reply(
          `${story?.story}`,
          Markup.inlineKeyboard([
            Markup.button.callback("Допустить", "admit_story"),
            Markup.button.callback("Отклонить", "reject_story"),
          ]),
        );
      }
    });

    this.bot.action("add_admin", (ctx) => {});
  }
}
