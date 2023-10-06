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
    story: {
      type: DataTypes.STRING,
    },
    storyType: {
      type: DataTypes.STRING,
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
