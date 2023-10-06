import { Command } from "./command.class";
import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { StoryModel } from "../DB/story.model";
import { storyType } from "../requests/storyType.enum";

export class AddCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("add", (ctx) => {
      ctx.reply(
        "Выберите тип сказки:",
        Markup.inlineKeyboard([
          Markup.button.callback("Мальчик", "for_boy"),
          Markup.button.callback("Девочка", "for_girl"),
          Markup.button.callback("Мальчик и девочка", "for_boy_girl"),
        ]),
      );
    });

    this.bot.action("for_boy", (ctx) => {
      ctx.session.storyType = storyType.BOY;
      ctx.reply("Отправьте мне свою сказку ответным сообщением");
    });
    this.bot.action("for_girl", (ctx) => {
      ctx.session.storyType = storyType.GIRL;
      ctx.reply("Отправьте мне свою сказку ответным сообщением");
    });
    this.bot.action("for_boy_girl", (ctx) => {
      ctx.session.storyType = storyType.BOY_GIRL;
      ctx.reply("Отправьте мне свою сказку ответным сообщением");
    });

    this.bot.on("text", async (ctx) => {
      if (ctx.message.text.length < 1000) {
        ctx.reply("Ваша сказка очень короткая, поработайте над ней еще");
        return;
      }
      if (ctx.message.text) {
        const story = await StoryModel.create({
          author: ctx.message.from.username,
          chatId: ctx.message.from.id,
          story: ctx.message.text,
          storyType: ctx.session.storyType,
        });
        ctx.reply("Ваша сказка добавлена в базу данных и ожидает модерации");
      }
    });
  }
}
