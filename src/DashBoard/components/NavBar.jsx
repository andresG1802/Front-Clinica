import React from 'react';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const NavBar = ({ drawerWidth = 240 }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí podrías realizar alguna acción de logout si es necesario
    // Por ejemplo, limpiar el token de sesión o eliminar cookies/local storage
    
    // Redirigir al usuario a la página de login
    navigate('/auth/login');
  };

  return (
    <AppBar 
      position='fixed'
      sx={{ 
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6' noWrap component='div'> DashBoard Medico </Typography>
          <IconButton color='error' onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
