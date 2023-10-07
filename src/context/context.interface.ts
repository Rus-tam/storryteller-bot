import { Context } from "telegraf";

export interface ISessionData {
  storyType: string;
  storyIdForAdmit: number;
}

export interface IBotContext extends Context {
  session: ISessionData;
}
