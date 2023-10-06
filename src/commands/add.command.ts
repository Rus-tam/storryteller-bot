import { Command } from "./command.class";
import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { StoryModel } from "../DB/story.model";

export class AddCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("add", (ctx) => {
      ctx.reply("Отправьте мне свой вариант сказки ответным сообщением");
    });

    this.bot.on("text", async (ctx) => {
      if (ctx.message.text) {
        const story = await StoryModel.create({
          story: ctx.message.text,
        });
      }
    });
  }
}
