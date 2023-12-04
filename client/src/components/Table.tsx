import React from "react";
import MUIDataTable from "mui-datatables";

interface TableProps {
  keys: string[];
  tableData: Record<string, any>[];
}

const Table: React.FC<TableProps> = (props) => {
  let columns: string[] = [];

  props.keys.forEach((key) => {
    if (key in props.tableData[0]) {
      columns.push(key);
    }
  });

  return (
    <MUIDataTable
      title="Relatório Gerado"
      data={props.tableData}
      columns={columns}
    />
  );
};

export default Table;
