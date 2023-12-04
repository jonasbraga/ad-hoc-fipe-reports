import React, { ChangeEvent, useState } from "react";
import {
  FormControl,
  InputLabel,
  Paper,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { options } from "../consts/consts";

interface FilterProps {
  id: string;
  sendValues: (values: {
    id: string;
    selection: string;
    comparator: string;
    constraint: string;
  }) => void;
}

const filterStyles = makeStyles({
  formControl: {
    minWidth: 200,
    margin: "1rem",
  },
  paper: {
    minWidth: 1050,
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#3f51b5",
    color: "#f50057",
  },
  btn_checked: {
    backgroundColor: "#f50057",
    color: "#3f51b5",
  },
});

export default function Filter(props: FilterProps): JSX.Element {
  const classes = filterStyles();
  const [s1, sets1] = useState<string>("");
  const [s2, sets2] = useState<string>("");
  const [s3, sets3] = useState<string>("");

  const handleClick = () => {
    props.sendValues({
      id: props.id,
      selection: s1,
      comparator: s2,
      constraint: s3,
    });
  };

  return (
    <Paper elevation={5} className={classes.paper}>
      <FormControl className={classes.formControl}>
        <Button
          variant="contained"
          className={s1 && s2 && s3 ? classes.btn : classes.btn_checked}
          style={{ pointerEvents: "none" }}
        >
          {s1 && s2 && s3 ? "Filtro confirmado" : "Preencha todos os campos"}
        </Button>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Colunas</InputLabel>
        <Select
          value={s1}
          onChange={(e: ChangeEvent<{ value: unknown }>) =>
            sets1(e.target.value as string)
          }
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Condições</InputLabel>
        <Select
          value={s2}
          onChange={(e: ChangeEvent<{ value: unknown }>) =>
            sets2(e.target.value as string)
          }
        >
          <MenuItem value={"="}>Igual a</MenuItem>
          <MenuItem value={"!="}>Diferente de</MenuItem>
          <MenuItem value={"like"}>Semelhante a</MenuItem>
          <MenuItem value={"<"}>Menor que</MenuItem>
          <MenuItem value={"<="}>Menor/igual que</MenuItem>
          <MenuItem value={">"}>Maior que</MenuItem>
          <MenuItem value={">="}>Maior/igual que</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          label="Valor"
          onChange={(e: ChangeEvent<HTMLInputElement>) => sets3(e.target.value)}
        />
      </FormControl>
    </Paper>
  );
}
