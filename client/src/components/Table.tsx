import React from "react";
import MUIDataTable from "mui-datatables";

interface TableProps {
  keys: string[];
  tableData: Record<string, any>[];
}

const Table: React.FC<TableProps> = (props) => {
  let columns: any[] = [];

  props.keys.forEach((key) => {
    if (key in props.tableData[0]) {
      if (key === "imagem_veiculo") {
        columns.push({
          name: key,
          options: {
            customBodyRender: (value: string) => {
              if (value) {
                return (
                  <img
                    src={value}
                    alt="Veículo"
                    style={{ width: "100px", height: "auto" }}
                  />
                );
              } else {
                return "Not found";
              }
            },
          },
        });
      } else {
        columns.push(key);
      }
    }
  });

  return (
    <div style={{ maxHeight: "700px", overflowY: "auto" }}>
      <MUIDataTable
        title="Relatório Gerado"
        data={props.tableData}
        columns={columns}
      />
    </div>
  );
};

export default Table;
