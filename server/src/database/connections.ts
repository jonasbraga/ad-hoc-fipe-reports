import knex from "knex";

//Config to connect to the database
let db = knex({
  client: "pg",
  debug: true,
  connection: {
    host: process.env.DB_HOST,
    //@ts-ignore
    port: Number.parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

export default db;
