import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";

export class AdminModel extends Model {
  public id!: number;
  public admin!: string;
}

AdminModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    admin: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "admins",
  },
);
