import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Paper,
} from '@mui/material';
import { styled, makeStyles } from '@mui/styles';
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';
import ArrowLeftSharpIcon from '@mui/icons-material/ArrowLeftSharp';
import React, { useEffect, useState } from 'react';
import { options } from '../consts/consts';

interface TransferListProps {
  setFunction: (items: string[]) => void;
}

const StyledDiv = styled('div')({
  margin: 'auto',
  display: 'flex',
});

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    display: 'flex',
  },
  paper: {
    width: 250,
    height: 350,
    overflow: 'auto',
    border: '1px solid #4254B5',
    margin: '1rem',
  },
  button: {
    border: '1px solid #4254B5',
    backgroundColor: 'white',
    margin: '0.5rem 0',
  },
});

function not<T>(a: T[], b: T[]): T[] {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const TransferList: React.FC<TransferListProps> = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = useState<string[]>([]);
  const [left, setLeft] = useState<string[]>(options);
  const [right, setRight] = useState<string[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    props.setFunction(right);
  }, [right, props]);

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (items: string[]) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  color="primary"
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <StyledDiv>
      <Grid container spacing={2} justifyContent="center" alignItems="center" className={classes.root}>
        {customList(left)}
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              <ArrowRightSharpIcon color="primary" />
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              <ArrowLeftSharpIcon color="primary" />
            </Button>
          </Grid>
        </Grid>
        {customList(right)}
      </Grid>
    </StyledDiv>
  );
};

export default TransferList;
