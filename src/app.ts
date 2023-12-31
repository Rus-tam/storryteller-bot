import { ConfigService } from "./config/config.service";
import { IConfigService } from "./config/config.interface";
import { Telegraf } from "telegraf";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import LocalSession from "telegraf-session-local";
import { SelectCommand } from "./commands/select.command";
import { sequelize } from "./DB/sequelize";
import { syncDatabase } from "./DB/syncDatabase";
import { AddCommand } from "./commands/add.command";
import { ModerateCommand } from "./commands/moderate.command";
import { AddAdminCommand } from "./commands/addadmin.command";

class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
    this.bot.use(new LocalSession({ database: "sessions.json" }).middleware());
  }

  init() {
    syncDatabase().then((res) => console.log("База данных синхронизирована"));

    this.commands = [
      new StartCommand(this.bot),
      new SelectCommand(this.bot),
      new AddCommand(this.bot),
      new ModerateCommand(this.bot),
      new AddAdminCommand(this.bot),
    ];
    for (const command of this.commands) {
      command.handle();
    }
    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
