import { storyType } from "./storyType.enum";
import { StoryModel } from "../DB/story.model";
import { sequelize } from "../DB/sequelize";
import { AdminModel } from "../DB/admin.model";

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

  static async admitStory(id: number): Promise<string> {
    console.log("ADMITTED ID", id);
    const condition = {
      where: {
        id,
        isModerated: false,
      },
    };
    const [updatedRowCount] = await StoryModel.update(
      { isModerated: true },
      condition,
    );

    if (updatedRowCount > 0) {
      return "История прошла модерацию";
    } else {
      return "Запись не найдена или не обновлена";
    }
  }

  static async rejectStory(id: number) {
    return StoryModel.destroy({ where: { id } });
  }

  static async isAdmin(name: string) {
    const admin = await AdminModel.findOne({ where: { admin: name } });
    if (admin) {
      return true;
    }
    return false;
  }
}
