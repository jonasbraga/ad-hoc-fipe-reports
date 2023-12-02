import React, { useState, useEffect } from 'react';
import { FormGroup, Paper, Button } from '@mui/material';
import TransferList from './components/TransferList';
import Filter from './components/Filter';
import Table from './components/Table';
import './App.css';

interface FiltroValues {
  selection: string;
  comparator: string;
  constraint: string;
}

interface AuxState {
  id: number;
  selection: string;
  comparator: string;
  constraint: string;
}

const App: React.FC = () => {
  const [selections, setSelections] = useState<string[]>([]);
  const [table, setTable] = useState<any[]>([]);
  const [filtros, setFiltros] = useState<JSX.Element[]>([]);
  const [filtrosValues, setFiltrosValues] = useState<FiltroValues[]>([{}]);
  const [loading, setLoading] = useState(false);
  const [aux, setAux] = useState<AuxState>({
    id: -1,
    selection: 'a',
    comparator: 'a',
    constraint: 'a',
  });
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (aux.id !== -1) {
      let auxFiltros = [...filtrosValues];
      auxFiltros[aux.id] = {
        selection: aux.selection,
        comparator: aux.comparator,
        constraint: aux.constraint,
      };
      setFiltrosValues(auxFiltros);
    }
  }, [aux, filtrosValues]);

  function sendRequest() {
    setLoading(true);
    const jsonBody = {
      selections: selections,
      filtros: filtrosValues,
    };
    let data = JSON.stringify(jsonBody);
    fetch('http://localhost:3333/', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((queryJSON) => {
        let data = fixData(queryJSON.return);
        setTable(data);
        setLoading(false);
      });
  }

  return (
    <div className="home-page">
      <div className="main">
        <div className="report">
          {level === 0 && (
            <>
              <h3>FIPE REPORTS AD-HOC</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setLevel(1)}
              >
                COMEÇAR
              </Button>
            </>
          )}
          {level === 1 && (
            <>
              <div className="options">
                <div className="containerTransfer">
                  <div className="transfer">
                    <h2> Escolha as colunas</h2>
                    <FormGroup>
                      <Paper elevation={5}>
                        <TransferList setFunction={setSelections} />
                      </Paper>
                    </FormGroup>
                  </div>
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setFiltros([
                    ...filtros,
                    <Filter key={filtros.length} id={filtros.length} sendValues={setAux} />,
                  ]);
                  setLevel(2);
                }}
              >
                Adicionar filtros
              </Button>
            </>
          )}
  
          {level === 2 && (
            <>
              <div className="filters">
                <h2>Escolha os filtros da tabela</h2>
                {filtros.map((filtro, index) => (
                  <Filter key={index} id={index} sendValues={setAux} />
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setFiltros([
                      ...filtros,
                      <Filter key={filtros.length} id={filtros.length} sendValues={setAux} />,
                    ]);
                  }}
                >
                  Adicionar Filtro
                </Button>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  sendRequest();
                  setLevel(3);
                }}
              >
                Gerar Relatório
              </Button>
            </>
          )}
  
          {level === 3 && (
            <div className="table">
              {!loading && <Table tableData={table} keys={selections} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function fixData(e: any[]) {
    let data = e.filter(function (obj) {
      for (var key in obj) {
        if (obj[key] === null) return false;
      }
      return true;
    });

    return data;
  }
};

export default App;
