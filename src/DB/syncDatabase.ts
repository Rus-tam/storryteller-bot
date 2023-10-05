import { sequelize } from "./sequelize";

export const syncDatabase = async () => {
  await sequelize.sync({ force: false });
};
