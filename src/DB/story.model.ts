import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";

export class StoryModel extends Model {
  public id!: number;
  public story!: string;
  public isModerated!: boolean;
}

StoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    chatId: {
      type: DataTypes.STRING,
    },
    story: {
      type: DataTypes.STRING,
    },
    storyType: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    isModerated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "stories",
  },
);
