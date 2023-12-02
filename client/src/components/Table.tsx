import React from 'react';
import { MUIDataTable, MUIDataTableColumn } from 'mui-datatables';

interface TableProps {
  keys: string[];
  tableData: Record<string, any>[];
}

const Table: React.FC<TableProps> = (props) => {
  let columns: MUIDataTableColumn[] = [];

  props.keys.forEach((key) => {
    if (key in props.tableData[0]) {
      columns.push({ name: key, label: key });
    }
  });

  const options = {
    download: false,
    customToolbar: () => (
      <React.Fragment>
        <button onClick={() => handleExport()}>Exportar</button>
      </React.Fragment>
    ),
  };

  const handleExport = () => {
    console.log('Exportando dados...');
    // Lógica para exportar dados, se necessário
  };

  return (
    <MUIDataTable
      title="Relatório Gerado"
      data={props.tableData}
      columns={columns}
      options={options}
    />
  );
};

export default Table;
