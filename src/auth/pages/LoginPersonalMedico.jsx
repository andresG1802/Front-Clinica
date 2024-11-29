import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { api } from '../../services/api';

export const LoginPersonalMedico = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch(`${api}api/auth/personalMedico`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombreUsuario , password })
      });

      if (!response.ok) {
        throw new Error('Usuario no reconocido');
      }

      const data = await response.json();
      console.log(data);

      // Suponiendo que la respuesta contiene un token o información del usuario
      navigate('/personalMedico');
    } catch (error) {
      setError('Usuario no reconocido');
    }
  };
  const handleNavigateToLogin = () => {
    navigate('/auth/login');
  };
  return (
    <AuthLayout title="Iniciar Sesion">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <form onSubmit={handleLogin}>
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField 
                  label="Nombre Usuario" 
                  type="text" 
                  placeholder='Usuario' 
                  fullWidth
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField 
                  label="Contraseña" 
                  type="password" 
                  placeholder='Contraseña' 
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              {error && (
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
              
              <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Button type="submit" variant='contained' fullWidth>
                    Ingresar
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Button onClick={handleNavigateToLogin} variant='contained' fullWidth>
                    Medico
                  </Button>
                </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
