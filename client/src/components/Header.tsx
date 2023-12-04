import React from 'react';
import { Typography, Container } from '@mui/material';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Container>
      <Typography variant="h3">
        FIPE AdHOC
      </Typography>
    </Container>
  );
};

export default Header;
