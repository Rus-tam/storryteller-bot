import { StoryModel } from "../DB/story.model";
import { sequelize } from "../DB/sequelize";
import { storyType } from "./storyType.enum";

export class StoryRequest {
  static async request(key: storyType): Promise<StoryModel | null> {
    return StoryModel.findOne({
      where: { isModerated: true, storyType: key },
      order: [sequelize.fn("RANDOM")],
    });
  }

  static async randomStoryRequest(): Promise<StoryModel | null> {
    return StoryModel.findOne({
      where: { isModerated: true },
      order: [sequelize.fn("RANDOM")],
    });
  }
}
