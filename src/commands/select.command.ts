import { Command } from "./command.class";
import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { StoryRequest } from "../requests/story.request";
import { storyType } from "../requests/storyType.enum";
import { isStringObject } from "util/types";

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

    this.bot.action("story_for_boy", async (ctx) => {
      const story = await StoryRequest.request(storyType.BOY);
      if (!story) {
        ctx.reply("К сожалению, нужная сказка не найдена");
      }
      if (story && story?.story) {
        ctx.reply(story?.story);
      }
    });

    this.bot.action("story_for_girl", async (ctx) => {
      const story = await StoryRequest.request(storyType.GIRL);
      if (!story) {
        ctx.reply("К сожалению, нужная сказка не найдена");
      }
      if (story && story?.story) {
        ctx.reply(story?.story);
      }
    });

    this.bot.action("story_for_both", async (ctx) => {
      const story = await StoryRequest.request(storyType.BOY_GIRL);
      if (!story) {
        ctx.reply("К сожалению, нужная сказка не найдена");
      }
      if (story && story?.story) {
        ctx.reply(story?.story);
      }
    });

    this.bot.action("random_story", async (ctx) => {
      const story = await StoryRequest.randomStoryRequest();
      if (!story) {
        ctx.reply("К сожалению, нужная сказка не найдена");
      }
      if (story && story?.story) {
        ctx.reply(story?.story);
      }
    });
  }
}
