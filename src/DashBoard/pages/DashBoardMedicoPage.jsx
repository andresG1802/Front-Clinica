import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { DashBoardLayout } from '../layout/DashBoardLayout';
import { useNavigate } from 'react-router-dom';

export const DashBoardMedicoPage = () => {

  const navigate = useNavigate();
  const handleEmergencias = () => {
    navigate('/emergencias');
  };
  return (
    <DashBoardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h3">
          Bienvenido a la Aplicación Clínica
        </Typography>
      </Box>
      <Button variant='contained' onClick={handleEmergencias}>Iniciar Aplicacion</Button>
      
    </DashBoardLayout>
  );
};

