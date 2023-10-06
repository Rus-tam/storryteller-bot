import { storyType } from "./storyType.enum";
import { StoryModel } from "../DB/story.model";
import { sequelize } from "../DB/sequelize";

export class RequestClass {
  static async storyRequest(key: storyType): Promise<StoryModel | null> {
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

  static async unmoderatedStories(): Promise<StoryModel | null> {
    return StoryModel.findOne({
      where: { isModerated: false },
      order: [sequelize.fn("RANDOM")],
    });
  }
}
