import { Paper, Stack, Button, Box } from '@mui/material';
import React from 'react';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from "../../configs/menu";
import { Link } from "react-router-dom";


const Footer = () => {
  
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row " }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            &copy; {new Date().getFullYear()} All rights reserved
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;