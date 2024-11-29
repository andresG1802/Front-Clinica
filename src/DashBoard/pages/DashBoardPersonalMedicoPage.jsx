import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { DashBoardLayout } from '../layout/DashBoardLayout';
import { useNavigate } from 'react-router-dom';
import { DpersonalMedicoLayout } from '../layout/DPersonalMedicoLayout';

export const DashBoardPersonalMedicoPage = () => {

  const navigate = useNavigate();
  const handleEmergencias = () => {
    navigate('/historial-emergencias');
  };
  return (
    <DpersonalMedicoLayout>
        <Box sx={{ p: 3 }}>
            <Typography variant="h3">
            Bienvenido a la Aplicación Clínica
            </Typography>
        </Box>
        <Button variant='contained' onClick={handleEmergencias}>Iniciar Aplicacion</Button>
    </DpersonalMedicoLayout>
  );
};
