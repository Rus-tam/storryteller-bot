import { Command } from "./command.class";
import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { AdminModel } from "../DB/admin.model";

export class AddAdminCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command("addadmin", async (ctx) => {
      if (!ctx.session.isAdmin) {
        ctx.reply("У вас нет доступа к данному разделу");
        return;
      }

      ctx.reply("Введите имя нового админа без @. Постарайтесь не ошибиться.");

      this.bot.on("text", async (nextCtx) => {
        const newAdminName = nextCtx.message.text.trim();

        if (newAdminName.length > 5) {
          const newAdmin = await AdminModel.create({
            admin: newAdminName,
          });
          nextCtx.reply("Новый админ добавлен.");
        }
      });
    });
  }
}
