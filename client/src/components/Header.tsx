import React from 'react';
import { Typography, Container } from '@mui/material';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Container>
      <img src="./images/rick.svg" alt="Rick" />
      <Typography variant="h3">
        Relatório AdHOC - Rick and Morty API
      </Typography>
      <img src="./images/morty.svg" alt="Morty" />
    </Container>
  );
};

export default Header;
