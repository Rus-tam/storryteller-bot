import { Command } from "./command.class";
import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { RequestClass } from "../requests/request.class";

export class ModerateCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("moderate", async (ctx) => {
      const story = await RequestClass.unmoderatedStories();

      if (!story) {
        ctx.reply("Все сказки прошли модерацию");
        return;
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

      this.bot.action("admit_story", async (ctx): Promise<void> => {
        const result: string = await RequestClass.admitStory(story.id);
        ctx.reply(result);
      });

      this.bot.action("reject_story", async (ctx) => {
        await RequestClass.rejectStory(story.id);
        ctx.reply("История удалена");
      });
    });
  }
}
