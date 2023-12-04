import { Request, Response } from "express";
import db from "../database/connections";

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

      let query = await db
        .select("*")
        .from("ano")
        .fullOuterJoin("detalhes_veiculo", "ano.id", "detalhes_veiculo.id_ano")
        .fullOuterJoin("modelo", "detalhes_veiculo.id_modelo", "modelo.id")
        .fullOuterJoin("marca", "modelo.id_marca", "marca.id")
        .fullOuterJoin(
          "avaliacao_seguranca",
          "avaliacao_seguranca.id_veiculo",
          "detalhes_veiculo.id"
        )
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

      return response.status(201).json({ return: query });
    } catch (error) {
      console.error(error);
    }
  }
}
