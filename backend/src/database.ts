import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgresql://doemain_db_user:rNuv1VQ5umb7yfVmnadpLOspMZ4xAI1B@dpg-csv5hnqj1k6c73c1l6g0-a.oregon-postgres.render.com/doemain_db",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true, // Use true if SSL certificates are fully validated
      },
    },
  }
);

sequelize
  .authenticate()
  .then((): void => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err: Error): void => {
    console.error("Unable to connect to the database:", err);
  });
