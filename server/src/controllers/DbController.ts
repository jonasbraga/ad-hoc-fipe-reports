import { Request, Response } from "express";
import db from "../database/connections";
import { fieldToTable, tableToForeignKey, TablesType } from "./tableFields";

export default class DbController {
  async dbSearch(request: Request, response: Response) {
    try {
      console.log("asddasd");
      const body = request.body;
      body.filtros = body.filtros.filter(function (obj: any) {
        for (var key in obj) {
          if (obj[key] === null || obj[key] === "") return false;
        }
        return true;
      });

      // Get the selections from the body object
      const selections = body.selections;

      // Initialize an empty set to store the tables to join

      let tablesToJoin = new Set<TablesType>();

      // Iterate over the selections
      for (let field of selections) {
        // Get the table for this field
        // @ts-ignore
        let table = fieldToTable[field];

        // Add the table to the set of tables to join
        if (table) {
          tablesToJoin.add(table);
        }
      }

      let query = db.select("*");
      if (tablesToJoin.size === 1) {
        // If there's only one table, select from that table
        query = query.from(Array.from(tablesToJoin)[0]);
      } else if (tablesToJoin.size > 1) {
        // If there's more than one table, start with the first table and join the rest
        query = query.from(Array.from(tablesToJoin)[0]);
        let tablesToJoinArray = Array.from(tablesToJoin);
        for (let i = 1; i < tablesToJoinArray.length; i++) {
          let table = tablesToJoinArray[i];
          // Add a join for this table to the query, using the correct foreign keys
          query = query.join(
            table,
            `${tablesToJoinArray[i - 1]}.${
              tableToForeignKey[tablesToJoinArray[i - 1]]
            }`,
            `${table}.${tableToForeignKey[table]}`
          );
        }
      }
      // Execute the query
      let result = await query
        .where(function () {
          body.filtros.forEach((item: any) => {
            if (Object.keys(item).length !== 0) {
              if (item.comparator !== "like") {
                //@ts-ignore
                this.where(item.selection, item.comparator, item.constraint);
              } else {
                //@ts-ignore
                this.where(item.selection, "like", `%${item.constraint}%`);
              }
            }
          });
        })
        .distinct();
      return response.status(200).json({ return: result });
    } catch (error) {
      console.error(error);
    }
  }
}
