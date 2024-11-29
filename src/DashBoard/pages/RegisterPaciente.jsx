import { useState } from 'react';
import { Button, Grid, TextField, Typography, Alert } from '@mui/material';
import { DpersonalMedicoLayout } from '../layout/DPersonalMedicoLayout';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const RegisterPacientePage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    genero: '',
    direccion: '',
    telefono: '',
    historial_medico: '',
    nombreUsuario: '',
    password: '',
    dni: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const dataToSubmit = {
      ...formData,
      edad: parseInt(formData.edad, 10),
    };

    try {
      const response = await fetch(`${api}api/pacientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSubmit)
      });

      if (!response.ok) {
        throw new Error('Error al registrar la emergencia');
      }

      setSuccess('Paciente registrada exitosamente');
      navigate('/ver-paciente');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <DpersonalMedicoLayout>
      <Typography variant="h4" gutterBottom>
        Registrar Paciente
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Edad"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Género"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Historial Médico"
              name="historial_medico"
              value={formData.historial_medico}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nombre de Usuario"
              name="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          {success && (
            <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar Emergencia
            </Button>
          </Grid>
        </Grid>
      </form>
    </DpersonalMedicoLayout>
  );
};

export default RegisterPacientePage;
