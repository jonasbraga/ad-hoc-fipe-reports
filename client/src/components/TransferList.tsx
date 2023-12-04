import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Paper,
  Button,
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

const TransferList: React.FC<TransferListProps> = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>(options);

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
    props.setFunction(checked);
  }, [checked, props]);

  const customList = () => (
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
      {customList()}
    </StyledDiv>
  );
};

export default TransferList;
