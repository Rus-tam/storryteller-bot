import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";

export class StoriesModel extends Model {
  public id!: number;
  public story!: string;
  public isModerated!: boolean;
}

StoriesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    story: {
      type: DataTypes.STRING,
    },
    isModerated: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    tableName: "stories",
  },
);
