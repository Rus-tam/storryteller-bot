import { Context } from "telegraf";

export interface ISessionData {
  storyType: string;
  storyIdForAdmit: number;
  isAdmin: boolean;
}

export interface IBotContext extends Context {
  session: ISessionData;
}
