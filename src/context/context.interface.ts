import { Context } from "telegraf";

export interface ISessionData {
  storyType: string;
}

export interface IBotContext extends Context {
  session: ISessionData;
}
